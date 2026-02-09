import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      positive: "bg-emerald-100 text-emerald-700",
      negative: "bg-rose-100 text-rose-700",
      neutral: "bg-muted text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "neutral",
  },
});

export function Badge({ className, variant, ...props }: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
