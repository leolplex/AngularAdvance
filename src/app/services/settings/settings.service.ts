import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor(@Inject(DOCUMENT) private document) {
    this.setSettings();
  }

  saveSettings() {
    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  setSettings() {
    if (localStorage.getItem('settings')) {
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
    this.applyTheme(this.settings.tema);
  }

  applyTheme(theme: string) {
    const url = `assets/css/colors/${theme}.css`;
    this.document.getElementById('tema').setAttribute('href', url);
    this.settings.tema = theme;
    this.settings.temaUrl = url;
    this.saveSettings();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
