import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "muted" | "accent";
}

export function Section({
  className,
  variant = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 md:py-24",
        variant === "muted" && "bg-muted/30",
        variant === "accent" && "bg-primary/5",
        className
      )}
      {...props}
    />
  );
}
