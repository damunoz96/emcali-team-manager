import { booleanAttribute, Component, computed, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface ButtonHeader {
  buttonText: string;
  path: string;
}

@Component({
  selector: 'app-button-header',
  template: `
    <a
      [routerLink]="path()"
      class="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
      routerLinkActive="text-foreground bg-primary/10"
      [routerLinkActiveOptions]="{ exact: isExact() }"
    >
      {{ text() }}
    </a>
  `,
  imports: [RouterLink, RouterLinkActive],
})
export class ButtonHeaderComponent {
  text = input.required<string>();
  path = input.required<string>();
  isExact = input(true, { transform: booleanAttribute });
}
