import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export function Section({ children, className, id, dark }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 lg:py-32",
        dark && "bg-surface-dark",
        className
      )}
    >
      {children}
    </section>
  );
}
