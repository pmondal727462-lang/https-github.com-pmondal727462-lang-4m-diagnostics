import { Container } from "../../components/ui/Container";
import { CardGridSkeleton } from "../../components/ui/Skeleton";

export default function TestsLoading() {
  return (
    <Container className="py-14">
      <div className="h-8 w-48 animate-pulse rounded bg-border" />
      <div className="mt-8 h-16 animate-pulse rounded-2xl bg-border" />
      <div className="mt-8">
        <CardGridSkeleton count={9} />
      </div>
    </Container>
  );
}
