import { Component, Input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

export interface ButtonHeader {
  buttonText: string;
  path: string;
}


@Component({
  selector: 'app-button-header',
  template: `
    <a
      routerLink="/{{buttonHeaderInfo.path}}"
      class="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
      routerLinkActive="text-foreground bg-primary/10"
      [routerLinkActiveOptions]="{ exact: true }"
      >{{ buttonHeaderInfo.buttonText }}</a>
  `,
  imports: [RouterLink, RouterLinkActive],
})
export class ButtonHeaderComponent {
  @Input() buttonHeaderInfo!: ButtonHeader;
}
