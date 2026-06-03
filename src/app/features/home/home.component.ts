import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PopularProductComponent } from "./popular-product/popular-product.component";
import { MainSliderComponent } from "./main-slider/main-slider.component";
import { PopularCategoryComponent } from "./popular-category/popular-category.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, PopularProductComponent, MainSliderComponent, PopularCategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  {

  
}
