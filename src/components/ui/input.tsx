import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700",
        "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50",
        "placeholder:text-zinc-500 dark:placeholder:text-zinc-400",
        "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}
