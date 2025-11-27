import { Component, OnInit } from "@angular/core";
import { initFlowbite } from "flowbite";

@Component({
  selector: 'app-add-player-modal',
  templateUrl: "./add-player-modal.component.html"
})
export class AddPlayerModalComponent implements OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
}
