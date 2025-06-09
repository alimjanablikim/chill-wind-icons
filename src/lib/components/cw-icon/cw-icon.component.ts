import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  Renderer2,
  inject,
  OnInit,
  OnChanges,
  AfterViewInit,
  OnDestroy,
  SimpleChanges,
  HostBinding,
  PLATFORM_ID,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import type { IconData } from '../../icons/icon-data.interface';

/**
 * Dynamic Icon Component: CwIcon
 * Renders an SVG icon based on the provided IconData.
 */
@Component({
  selector: 'cw-icon',
  template: `
    <svg
      *ngIf="icon && icon.innerSvg"
      [attr.viewBox]="icon.viewBox || '0 0 24 24'"
      [attr.aria-hidden]="!alt"
      [attr.focusable]="alt ? 'false' : null"
      [ngClass]="svgClasses"
      #svgElement
    >
    </svg>
    <ng-container *ngIf="!icon || !icon.innerSvg">
      <svg
        *ngIf="showFallback"
        [attr.viewBox]="'0 0 24 24'"
        [attr.aria-hidden]="!alt"
        class="cw-fallback-icon"
      >
        <rect x="2" y="2" width="20" height="20" rx="2" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
        <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" stroke-width="1.5" opacity="0.5" />
      </svg>
    </ng-container>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 0;
      flex-shrink: 0;
      width: var(--icon-size, 1.5rem);
      height: var(--icon-size, 1.5rem);
    }

    /* Tailwind CSS v4 size utilities support */
    :host([class*="size-"]) {
      width: auto;
      height: auto;
    }
    
    :host([class*="w-"]) {
      width: auto;
    }
    
    :host([class*="h-"]) {
      height: auto;
    }

    :host svg { 
      display: block; 
      width: 100%; 
      height: 100%; 
      pointer-events: none;
      color: inherit;
    }
    
    /* Default fill handling - let SVG elements control their own fill */
    :host svg path:not([fill]),
    :host svg circle:not([fill]),
    :host svg rect:not([fill]),
    :host svg ellipse:not([fill]),
    :host svg polygon:not([fill]),
    :host svg polyline:not([fill]) {
      fill: currentColor;
    }
    
    /* Respect explicit fill attributes */
    :host svg [fill="none"] {
      fill: none !important;
    }
    
    :host svg [fill="currentColor"] {
      fill: currentColor !important;
    }
    
    :host svg * {
      vector-effect: non-scaling-stroke;
    }
    
    :host(:focus-visible) { 
      outline: 2px solid currentColor; 
      outline-offset: 2px; 
      border-radius: 0.125rem; 
    }
    
    /* Tailwind Animation Support - Apply animations to the host element */
    :host(.animate-spin) {
      animation: cw-spin 1s linear infinite;
    }
    
    :host(.animate-pulse) {
      animation: cw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    :host(.animate-bounce) {
      animation: cw-bounce 1s infinite;
    }
    
    /* Tailwind-compatible keyframes */
    @keyframes cw-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes cw-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes cw-bounce {
      0%, 100% { 
        transform: translateY(-25%); 
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1); 
      }
      50% { 
        transform: translateY(0); 
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1); 
      }
    }
    
    @media (prefers-contrast: more) { 
      :host svg { filter: contrast(1.2); } 
    }
    
    @media (prefers-reduced-motion: reduce) { 
      :host svg * { 
        animation-duration: 0.01ms !important; 
        animation-iteration-count: 1 !important; 
        transition-duration: 0.01ms !important; 
      } 
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule]
})
export class CwIcon implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private readonly platformId = inject(PLATFORM_ID);
  private classObserver?: MutationObserver;
  
  @ViewChild('svgElement', { static: false }) svgElement?: ElementRef<SVGElement>;
  

  @Input() icon?: IconData;
  @Input() size: number | string = 24;
  @Input() @HostBinding('attr.aria-label') alt: string | null = null;
  @Input() strokeWeight?: string | number;
  @Input() svgClass: string = '';
  @Input() showFallback: boolean = true;

  @HostBinding('class.cw-icon') baseClass = true;
  @HostBinding('class.cw-icon-component') componentClass = true;

  @HostBinding('attr.role') get roleAttr(): string | null { return this.alt ? 'img' : null; }
  @HostBinding('attr.tabindex') get tabindexAttr(): number | null { return this.alt ? 0 : null; }

  @HostBinding('attr.data-icon-name') get dataIconName(): string | undefined { return this.icon?.name; }
  @HostBinding('attr.data-icon-type') get dataIconType(): string | undefined { return this.icon?.type; }
  @HostBinding('attr.data-icon-category') get dataIconCategory(): string | undefined { return this.icon?.category; }

  @HostBinding('class') get dynamicHostClasses(): string {
    if (!this.icon) return '';
    return `cw-${this.icon.name}-${this.icon.type}`;
  }

  @HostBinding('style.--icon-size') get iconSizeVar(): string | null {
    if (this._hostHasSizeClass || !this.size) return null;
    return typeof this.size === 'number' ? `${this.size}px` : String(this.size);
  }


  @HostBinding('style.--icon-stroke-width') get iconStrokeWidthVar(): string | null {
    return String(this.strokeWeight || this.icon?.defaultStrokeWidth || '1');
  }

  private _hostHasSizeClass: boolean = false;

  ngOnInit(): void { 
    this.updateHostClassChecks();
  }
  
  ngAfterViewInit(): void {
    if (this.icon && this.svgElement) {
      this.renderSvgContent();
    }
    
    // Set up MutationObserver to watch for class changes
    if (isPlatformBrowser(this.platformId) && this.elementRef?.nativeElement) {
      this.classObserver = new MutationObserver(() => {
        this.updateHostClassChecks();
      });
      
      this.classObserver.observe(this.elementRef.nativeElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon'] || changes['size'] || changes['svgClass'] || changes['strokeWeight']) {
      this.updateHostClassChecks();
    }
    
    // Re-render SVG when icon or strokeWeight changes
    if ((changes['icon'] || changes['strokeWeight']) && this.svgElement) {
      this.renderSvgContent();
    }
    
    // Always update host class checks to catch external class changes
    this.updateHostClassChecks();
  }

  private updateHostClassChecks(): void {
    if (isPlatformBrowser(this.platformId) && this.elementRef?.nativeElement) {
      const hostElement = this.elementRef.nativeElement;
      const classList: string[] = [...hostElement.classList];
      // Check for Tailwind size classes (w-* and h-* or size-*)
      this._hostHasSizeClass = classList.some((cls: string) => 
        cls.match(/^(w-|h-|size-)/));
      
      // Check for arbitrary color values like text-[#123456]
      const arbitraryColorClass = classList.find((cls: string) => 
        cls.match(/^text-\[#[0-9a-fA-F]{3,8}\]$/));
      
      if (arbitraryColorClass) {
        // Extract the color value from text-[#123456]
        const colorMatch = arbitraryColorClass.match(/^text-\[(#[0-9a-fA-F]{3,8})\]$/);
        if (colorMatch && colorMatch[1]) {
          // Apply the color as an inline style
          this.renderer.setStyle(hostElement, 'color', colorMatch[1]);
        }
      } else {
        // Remove inline color style if no arbitrary color class is present
        this.renderer.removeStyle(hostElement, 'color');
      }
    } else {
      this._hostHasSizeClass = false;
    }
  }

  private renderSvgContent(): void {
    if (!this.icon || !this.icon.innerSvg || !this.svgElement?.nativeElement) {
      return;
    }
    
    const svg = this.svgElement.nativeElement;
    const strokeWidth = String(this.strokeWeight || this.icon?.defaultStrokeWidth || '1');
    
    // Clear existing content
    while (svg.firstChild) {
      this.renderer.removeChild(svg, svg.firstChild);
    }
    
    // Parse SVG content
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<svg xmlns="http://www.w3.org/2000/svg">${this.icon.innerSvg}</svg>`, 'image/svg+xml');
    const elements = doc.querySelector('svg')?.children;
    
    if (elements) {
      Array.from(elements).forEach(element => {
        const clonedElement = this.cloneElementRecursively(element, strokeWidth);
        this.renderer.appendChild(svg, clonedElement);
      });
    }
    
  }

  private cloneElementRecursively(sourceElement: Element, strokeWidth: string): Element {
    const newElement = document.createElementNS('http://www.w3.org/2000/svg', sourceElement.tagName);
    
    // Copy all attributes
    Array.from(sourceElement.attributes).forEach(attr => {
      this.renderer.setAttribute(newElement, attr.name, attr.value);
    });
    
    // Add stroke-width if element has stroke attribute
    if (sourceElement.hasAttribute('stroke')) {
      this.renderer.setAttribute(newElement, 'stroke-width', strokeWidth);
    }
    
    // Recursively clone child elements
    Array.from(sourceElement.children).forEach(child => {
      const clonedChild = this.cloneElementRecursively(child, strokeWidth);
      this.renderer.appendChild(newElement, clonedChild);
    });
    
    // Copy text content if no child elements (leaf nodes)
    if (sourceElement.children.length === 0 && sourceElement.textContent?.trim()) {
      const text = this.renderer.createText(sourceElement.textContent);
      this.renderer.appendChild(newElement, text);
    }
    
    return newElement;
  }

  get svgClasses(): string {
    const classes = ['cw-icon-svg'];
    if (this.icon) {
      classes.push(`cw-${this.icon.type}-svg`);
    }
    if (this.svgClass) {
      classes.push(this.svgClass);
    }
    return classes.join(' ');
  }
  
  ngOnDestroy(): void {
    if (this.classObserver) {
      this.classObserver.disconnect();
    }
  }
}
