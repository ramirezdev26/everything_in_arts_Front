import { Component, AfterViewInit } from '@angular/core';

import Swiper from 'swiper';


@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements AfterViewInit{

  mySwiper: Swiper = new Swiper('');

  constructor(){}

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container');
  }

}
