import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "narrow" | "wide";
}

export function Container({
  className,
  variant = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        variant === "default" && "max-w-5xl",
        variant === "narrow" && "max-w-4xl",
        variant === "wide" && "max-w-7xl",
        className
      )}
      {...props}
    />
  );
}
