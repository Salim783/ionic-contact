import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.setDarkMode(prefersDark.matches);
    prefersDark.addEventListener('change', (mediaQuery) => this.setDarkMode(mediaQuery.matches));
  }

  setDarkMode(isDark: boolean) {
    this.darkMode.next(isDark);
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
  }
}
