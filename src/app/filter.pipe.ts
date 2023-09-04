import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, findMax: boolean = false): any[] {
    if (!items) return [];
    
    if (searchText && !findMax) {
      searchText = searchText.toLowerCase();
      items = items.filter(item => {
        return item.bjName.toLowerCase().includes(searchText);
      });
    }

    if (findMax) {
      let maxPriceJob = -Infinity;
      items.forEach(item => {
        if (item.priceJob > maxPriceJob) {
          maxPriceJob = item.priceJob;
        }
      });

      items = items.filter(item => item.priceJob === maxPriceJob);
    }

    return items;
  }
}