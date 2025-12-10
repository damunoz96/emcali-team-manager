import { Directive, inject, input } from "@angular/core";
import { Router } from "@angular/router";

@Directive({
    selector: '[appNavigate]',
    host: {
        '(click)': 'handleNavigate()'
    }

})

export class NavigateDirective {
    appNavigate = input.required<string>();
    router = inject(Router);

    handleNavigate() {
        this.router.navigate([this.appNavigate()]);
    }
}