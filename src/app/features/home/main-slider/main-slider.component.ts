import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent implements OnInit {
  private readonly translateService = inject(TranslateService);

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe({
      next: (data) => {
        this.mainSliderCustomOption = {
          ...this.mainSliderCustomOption,
          rtl: data.lang === 'ar' ? true : false,
        };
      },
    });
  }
  mainSliderCustomOption: OwlOptions = {
    loop: true,

    mouseDrag: true,

    touchDrag: true,

    pullDrag: false,

    dots: true,

    navSpeed: 700,

    nav: false,

    autoplay: true,

    autoplayTimeout: 3000,

    responsive: {
      0: {
        items: 1,
      },

      576: {
        items: 1,
      },

      768: {
        items: 1,
      },

      1024: {
        items: 1,
      },
    },
  };
}
