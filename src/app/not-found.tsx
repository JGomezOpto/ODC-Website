import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="py-32 lg:py-48">
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <p className="text-8xl font-bold text-primary mb-4">404</p>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Try navigating back to our homepage or browse our products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className={cn(buttonVariants({ size: "lg" }), "bg-primary hover:bg-primary/90 text-white")}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Link>
            <Link href="/products" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Browse Products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
