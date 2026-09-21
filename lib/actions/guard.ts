import { getAdminSession, type AdminSessionPayload } from "../auth/session";

export async function requireAdmin(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) throw new Error("Not authenticated");
  return session;
}
