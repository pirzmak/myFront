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
  selectedCategories: CategoryType[];

  constructor(private ebayService: EBayService) {
    this.selectedCategories = [];
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
    //TODO Refactor shity kod ale w przy takim czasie odopowiedzzi z serwera nie ma sensu przyspieszyc
    let newSelected;
    if (this.selectedCategories.length > 0) {
      newSelected = this.selectedCategories.find(category =>
      category.childrenCategories.find(categoryChild => categoryChild.categoryName === categoryName) !== null)
        .childrenCategories.find(category => category.categoryName === categoryName);
    } else {
      newSelected = this.categoryList.find(category => category.categoryName === categoryName);
    }

    if (newSelected) {

      const lastIndex = this.selectedCategories.length;

      console.log(this.selectedCategories);

      const tmp = this.selectedCategories.find(cat => {
        console.log(cat.categoryID === newSelected.categoryParentID[0]);
        return cat.categoryID === newSelected.categoryParentID[0];
      });

      console.log(this.selectedCategories.indexOf(tmp));

      this.selectedCategories = this.selectedCategories.slice(
        0, this.selectedCategories.indexOf(tmp)+1);

      console.log(this.selectedCategories);
      this.selectedCategories.push(newSelected);

      console.log(categoryName, this.selectedCategories, lastIndex, newSelected);
      this.ebayService.getSbsCategoriesByParentId(newSelected.categoryID)
        .subscribe(data => this.selectedCategories[this.selectedCategories.length-1].childrenCategories = data.map(elem => CategoryType.copy(elem)),
          error2 => console.log("Zly request"),
          () => {
            console.log(this.selectedCategories)
          });
    }
  }

}
