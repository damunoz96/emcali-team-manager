import { Component, OnInit } from "@angular/core";
import { initFlowbite } from "flowbite";

@Component({
  selector: 'app-add-game-modal',
  templateUrl: "./add-game-modal.component.html"
})
export class AddGameModalComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }

}
