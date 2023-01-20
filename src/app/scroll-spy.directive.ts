import { Directive, Injectable, Input, EventEmitter, Output, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[scrollSpy]'
})
export class ScrollSpyDirective {
    @Input() public spiedTags = [];
    @Output() public sectionChange = new EventEmitter<string>();
    private currentSection: any;

    constructor(private _el: ElementRef) {}

    @HostListener('scroll', ['$event'])
    onScroll(event: any) {
        
        let currentSection: string;
        const children = this._el.nativeElement.children;
        const scrollTop = event.target.scrollTop;
        const parentOffset = event.target.offsetTop;
        for (let i = 0; i < children.length; i++) {
            const element = children[i];
            // console.log(element.children);
            if (this.spiedTags.some(spiedTag => spiedTag === element.tagName)) {                                
                for (let j = 0; j < element.children.length; j++) {                    
                    if ((element.children[j].offsetTop - (parentOffset + 1)) <= scrollTop) {
                        currentSection = element.children[j].children[0].innerHTML;                        
                    }
                    
                }
                
            }
        }
        
        
        if (currentSection !== this.currentSection) {
            this.currentSection = currentSection;
            this.sectionChange.emit(this.currentSection);
        }
    }

}
