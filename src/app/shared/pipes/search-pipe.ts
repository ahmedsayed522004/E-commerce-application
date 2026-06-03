import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../core/models/products/product.interface';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(productList: Product[], word:string): Product[] {
    return productList.filter((item)=>item.title.toLocaleLowerCase().includes(word.toLocaleLowerCase()));
  }

}
