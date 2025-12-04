import { computed, Directive, input } from "@angular/core";
import { tv, VariantProps } from 'tailwind-variants';

const button = tv({
  base: 'px-4 py-2 border text-foreground border-border rounded-lg transition-colors cursor-pointer',
  variants: {
    color: {
      primary: 'hover:bg-primary',
      secondary: '',
      danger: 'hover:bg-destructive',
    },
  },
  defaultVariants: {
    color: 'primary',
  }
});

@Directive({
  selector: 'button[appButton]',
  host: { '[class]': 'clx()' },
})
export class ButtonComponent {
  readonly color = input<VariantProps<typeof button>['color']>('primary');

  readonly clx = computed(() => {
    return button({ color: this.color() });
  });
}
