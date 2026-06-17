import { cn } from "@/lib/utils";

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}) {
  const baseClasses =
    "font-medium rounded-lg transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-violet-600 hover:bg-violet-700 text-white dark:bg-violet-700 dark:hover:bg-violet-600",
    secondary: "bg-zinc-200 hover:bg-zinc-300 text-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-50",
    outline: "border border-zinc-300 hover:bg-zinc-50 text-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:text-zinc-50",
    ghost: "hover:bg-zinc-100 text-zinc-700 dark:hover:bg-zinc-900 dark:text-zinc-300",
    danger: "bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    />
  );
}
