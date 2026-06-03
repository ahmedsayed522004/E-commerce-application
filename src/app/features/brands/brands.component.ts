import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { Brands } from '../../core/models/brands/brands.interface';
import { sign } from 'crypto';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brandsList: WritableSignal<Brands[]> = signal<Brands[]>([]);
  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
