import { Component, computed, Directive, inject, input } from '@angular/core';
import { tv, VariantProps } from 'tailwind-variants';

const tvClass = tv({
  base: 'rounded-lg font-semibold transition-all duration-300 border border-border',
  variants: {
    variant: {
      primary: 'bg-primary/80 hover:bg-primary text-primary-foreground',
      destructive: 'bg-destructive/80 hover:bg-destructive text-card-foreground',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-5 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

@Component({
  selector: 'app-button',
  styles: [],
  template: `<button [class]="clx()" [type]="type()" [disabled]="disabled()">
    <ng-content></ng-content>
  </button>`
})
export class ButtonComponent {
  variant = input<VariantProps<typeof tvClass>['variant']>();
  size = input<VariantProps<typeof tvClass>['size']>();
  disabled = input<boolean>(false);
  type = input<'submit' | 'button' | 'reset'>()

  clx = computed(() => tvClass({ variant: this.variant(), size: this.size() }));
}
