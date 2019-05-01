import { Component, OnInit } from '@angular/core';

declare function initi_plugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    initi_plugins();
  }
}
