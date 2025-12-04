import { Component, Directive, input } from "@angular/core";

@Directive({
  selector: 'input[appInput]',
  host: {
    class: 'bg-card text-accent-foreground px-3 py-2 border rounded-lg w-full',
  }
})
export class InputComponent {}
