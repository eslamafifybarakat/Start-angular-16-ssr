import { Injectable, Inject, Renderer2, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { keys } from './../../../shared/configs/localstorage-key';
import { Theme, light, dark } from "./theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private active: Theme = light;
  private availableThemes: Theme[] = [light, dark];

  constructor(
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  getAvailableThemes(): Theme[] {
    return this.availableThemes;
  }

  getActiveTheme(): Theme {
    return this.active;
  }

  setLightTheme(): void {
    this.setActiveTheme(light);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(keys?.theme, 'light');
    }
  }

  setDarkTheme(): void {
    this.setActiveTheme(dark);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(keys?.theme, 'dark');
    }
  }

  setColorTheme(color: any): void {
    Object.keys(this.active.properties).forEach((property) => {
      if (property == '--text-main-color' || property == '--bg-main-color') {
        this.active.properties[property] = color;
      }
      this.renderer.setStyle(this.document.documentElement, property, this.active.properties[property]);
    });
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(keys?.theme, 'light');
    }
  }

  setActiveTheme(theme: Theme): void {
    this.active = theme;
    Object.keys(this.active.properties).forEach((property) => {
      this.renderer.setStyle(this.document.documentElement, property, this.active.properties[property]);
    });
  }
}
