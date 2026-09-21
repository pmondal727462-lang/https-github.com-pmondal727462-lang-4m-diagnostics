import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../lib/prisma";
import { answerQuestion, AI_DISCLAIMER } from "../../../../lib/ai/assistant";
import { getPatientSession } from "../../../../lib/auth/session";

const chatSchema = z.object({
  sessionId: z.string().min(8).max(100),
  message: z.string().min(1).max(1000),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = chatSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { sessionId, message } = parsed.data;

  const patientSession = await getPatientSession();

  const conversation = await prisma.aIConversation.upsert({
    where: { sessionId },
    update: {},
    create: { sessionId, patientId: patientSession?.patientId },
  });

  await prisma.aIMessage.create({
    data: { conversationId: conversation.id, role: "USER", content: message },
  });

  const { reply } = await answerQuestion(message);

  await prisma.aIMessage.create({
    data: { conversationId: conversation.id, role: "ASSISTANT", content: reply },
  });

  return NextResponse.json({ reply, disclaimer: AI_DISCLAIMER });
}
