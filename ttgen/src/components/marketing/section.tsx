import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "muted" | "accent" | "surface" | "primary" | "transparent";
}

export function Section({
  className,
  variant = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-20 md:py-32 relative",
        variant === "muted" && "bg-muted/30",
        variant === "accent" && "bg-primary/5",
        variant === "surface" && "bg-card border-y border-border/50",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "transparent" && "bg-transparent",
        className
      )}
      {...props}
    />
  );
}

