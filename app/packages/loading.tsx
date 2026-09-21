import { Container } from "../../components/ui/Container";
import { CardGridSkeleton } from "../../components/ui/Skeleton";

export default function PackagesLoading() {
  return (
    <Container className="py-14">
      <div className="h-8 w-48 animate-pulse rounded bg-border" />
      <div className="mt-8">
        <CardGridSkeleton count={6} />
      </div>
    </Container>
  );
}
