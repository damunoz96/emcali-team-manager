import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
})
export class LayoutComponent {}
