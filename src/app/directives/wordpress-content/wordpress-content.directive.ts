import {Directive, HostListener} from '@angular/core';
import {BrowserService} from '../../services/browser/browser.service';

@Directive({
    selector: '[appWordpressContent]'
})
export class WordpressContentDirective {
    constructor(private browser: BrowserService) {

    }

    @HostListener('click', ['$event', '$event.target'])
    public onClick(event: Event, targetElement: HTMLElement) {
        if (targetElement.tagName.toLowerCase() === 'a') {
            event.preventDefault();
            this.open((targetElement as HTMLLinkElement).href);
        }
    }

    private open(url: string): void {
        this.browser.open(url);
    }
}
