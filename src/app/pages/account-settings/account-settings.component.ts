import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  constructor(public settings: SettingsService) {}

  ngOnInit() {
    this.setCheck();
  }

  changeColor(color: string, link: any) {
    this.applyCheck(link);
    this.settings.applyTheme(color);
  }

  applyCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (const ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  setCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const theme = this.settings.settings.tema;

    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === theme) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
