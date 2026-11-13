import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// shadcn Button mapped onto the Monsoon Ink tokens. Colours come from tokens only; motion is transform and colour, never "all".
const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-[var(--radius-input)] border border-transparent bg-clip-padding font-body text-sm font-medium whitespace-nowrap select-none transition-[transform,box-shadow,background-color,color] duration-[var(--dur-micro)] ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] disabled:pointer-events-none disabled:opacity-55 aria-invalid:border-error [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-signal-fill bg-signal-fill text-signal-fill-ink shadow-[var(--shadow-key-accent)] hover:-translate-y-px hover:border-signal-fill-hover hover:bg-signal-fill-hover active:translate-y-[3px] active:shadow-[var(--shadow-key-press)]",
        outline:
          "border-rule-2 bg-key-face text-ink shadow-key hover:-translate-y-px active:translate-y-[3px] active:shadow-[var(--shadow-key-press)] aria-expanded:bg-paper-3",
        secondary:
          "border-rule-2 bg-key-face text-ink shadow-key hover:-translate-y-px active:translate-y-[3px] active:shadow-[var(--shadow-key-press)] aria-expanded:bg-paper-3",
        ghost:
          "bg-transparent text-ink-2 hover:bg-paper-3 hover:text-ink aria-expanded:bg-paper-3 aria-expanded:text-ink",
        destructive:
          "border-rule-2 bg-key-face text-error shadow-key hover:-translate-y-px active:translate-y-[3px] active:shadow-[var(--shadow-key-press)]",
        link: "text-ink underline decoration-rule-2 underline-offset-[0.2em] hover:decoration-signal",
      },
      size: {
        default:
          "min-h-11 gap-2 px-6 has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        xs: "min-h-7 gap-1 px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "min-h-[34px] gap-1 px-3 text-sm has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "min-h-12 gap-2 px-7 text-base has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        icon: "size-9",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
