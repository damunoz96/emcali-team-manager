import { Component, inject } from "@angular/core";
import { RouterOutlet, RouterLink } from "@angular/router";
import { ButtonHeader, ButtonHeaderComponent } from "./components/button-header.component";
import { AuthService } from "../../../core/services/auth.service";
import { AsyncPipe } from "@angular/common";
import { LoginButtonComponent } from "../login-button/login-button.component";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  imports: [RouterOutlet, ButtonHeaderComponent, RouterLink, LoginButtonComponent],
})
export class LayoutComponent {
  dataButton = 'GamesTest';
  pathButton = 'games';

  dataSourceButtons: ButtonHeader[] = [
    { buttonText: 'Home', path: '/' },
    { buttonText: 'Games', path: '/games' },
    { buttonText: 'Players', path: '/players' },
  ];
}
