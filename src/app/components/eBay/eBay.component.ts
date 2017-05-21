import {Component, OnInit, Optional} from '@angular/core';
import {AuthorizationService} from '../../services/authorization/authorization.service';
import {EBayService} from '../../services/eBayApi/eBayApi.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {CategoryType} from './eBay.model';
import {until} from 'selenium-webdriver';
import elementIsNotSelected = until.elementIsNotSelected;

@Component({
  selector: 'my-eBay',
  templateUrl: './eBay.component.html',
  styleUrls: ['./eBay.component.scss'],
  providers: [EBayService]
})

export class EBayComponent implements OnInit {
  items: Observable<string[]>;
  query: string;
  minCost: number;
  maxCost: number;
  categoryList: CategoryType[];

  constructor(private ebayService: EBayService) {
  }

  private searchTermStream = new Subject<string>();

  search(term: string) {
    this.searchTermStream.next(term);
  }

  ngOnInit() {

    this.ebayService.getMainCategories()
      .subscribe(data => this.categoryList = data.map(elem => CategoryType.copy(elem)),
        error2 => console.log("Zly request"));
  }

  submit() {
    // if(this.selectedCategory.value !== 0){}
    // else if(this.selectedCategory.value !== 0 && this.minCost && this.maxCost){}
    // else {}

    let selectedCategory = this.categoryList;

      console.log("in");
      const find = selectedCategory.find(categoryList => categoryList.childrenCategories.length > 0);
      // selectedCategory = selectedCategory.find(categoryList => categoryList.childrenCategories.length > 0) .childrenCategories;
      console.log(find);

  }

  chooseCategory = (categoryName: string) => {
    let selectedCategory = this.categoryList;

    while(!selectedCategory.find(categoryList => categoryList.categoryName === categoryName)){
      const tmpCategories = selectedCategory.find(categoryList => categoryList.childrenCategories.length > 0);
      if(!tmpCategories)
        break;
      selectedCategory = selectedCategory.find(categoryList => categoryList.childrenCategories.length > 0).childrenCategories;
    }
    const newSelectedCategory = selectedCategory.find(categoryList => categoryList.categoryName === categoryName);

    const tmpCategories = selectedCategory.find(categoryList => categoryList.childrenCategories.length > 0);
    if(tmpCategories)
      tmpCategories.childrenCategories = [];

    this.ebayService.getSbsCategoriesByParentId(newSelectedCategory.categoryID)
      .subscribe(data => newSelectedCategory.childrenCategories = data.map(elem => CategoryType.copy(elem)),
        error2 => console.log("Zly request"),
        () => (this));
  }

}
