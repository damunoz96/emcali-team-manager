import { Component } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { ButtonHeader, ButtonHeaderComponent } from "./components/button-header.component";



@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  imports: [RouterOutlet, ButtonHeaderComponent, RouterLink],
})
export class LayoutComponent {
  dataButton = 'GamesTest';
  pathButton = 'games';

  dataSourceButtons: ButtonHeader[] = [
    { buttonText: 'Home', path: '' },
    { buttonText: 'Games', path: 'games' },
    { buttonText: 'Players', path: 'players' },
  ]

  dataLoginButton: ButtonHeader = { buttonText: 'Login', path: 'admin' };
}
