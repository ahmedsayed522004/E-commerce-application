import { CategoriesService } from './../../../core/services/categories/categories.service';

import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Categories } from '../../../core/models/categories/categories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-popular-category',
  imports: [CarouselModule],
  templateUrl: './popular-category.component.html',
  styleUrl: './popular-category.component.css',
})
export class PopularCategoryComponent implements OnInit {

  private readonly CategoriesService=inject(CategoriesService)

  private readonly translateService=inject(TranslateService);

  categorieslist:WritableSignal<Categories[]>=signal<Categories[]>([])

  ngOnInit(): void {
    this.CategoriesService.getallcategories().subscribe({
      next:(res)=>{
        
        this.categorieslist.set(res.data)
        
      },
      error:(err)=>{
        console.log(err)
        
      }
    })
    this.onLanguageChange();
  }

  onLanguageChange():void{
     this.translateService.onLangChange.subscribe({
      next:(data)=>{
        this.categoriescustomOptions={
          ...this.categoriescustomOptions,
          rtl:data.lang==='ar'?true:false,
        }
      }
    });
  };
  
  categoriescustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay:true,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
     rtl:this.translateService.getCurrentLang()==='ar'? true:false,
  }
  
  

}
