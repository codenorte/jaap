import { Injectable } from '@angular/core';
import { doesNotReject } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme =  document.querySelector('#theme');

  constructor() {
    const themeSelected = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', themeSelected);
  }

  cargar(){
    const themeSelected = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';
    this.linkTheme.setAttribute('href', themeSelected);
  }

  changeTheme(theme: string, links: NodeListOf<Element>): void {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme(links);
  }

  checkCurrentTheme(links: NodeListOf<Element>): void {
    links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const themeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme.getAttribute('href');
      if (themeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
