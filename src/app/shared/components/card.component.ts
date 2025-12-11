import { Component, input, Input, numberAttribute } from "@angular/core";

@Component({
  selector: 'app-card',
  template: `
    <div
      class="bg-card rounded-xl p-6 shadow-elevated border border-border hover:shadow-glow transition-all duration-300"
    >
      <div class="flex items-center justify-between mb-2">
        <span class="text-muted-foreground text-sm font-medium"> {{ title() }}</span>
      </div>
      <div class="text-3xl font-bold text-foreground">{{ content() || 0}}</div>
    </div>
  `,
})
export class CardComponent {
  readonly title = input.required<string>();
  readonly content = input(0, { transform: numberAttribute });
}
