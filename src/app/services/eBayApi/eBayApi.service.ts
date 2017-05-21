import {Injectable} from "@angular/core";
import {Jsonp} from "@angular/http";

import 'rxjs/add/operator/map';
import {AuthorizationHttp} from "../authorizationHttp/authorizationHttp";
import {CategoryType} from "../../components/eBay/eBay.model";

@Injectable()
export class EBayService {
  constructor(private authorizationHttp: AuthorizationHttp) {
  }

  getMainCategories() {
    return this.authorizationHttp.get("/categories/maincategories").map(res =>  res.json())
  }

  getSbsCategoriesByParentId(parentId: string) {
    return this.authorizationHttp.get("/categories/subcategories/" + parentId).map(res =>  res.json());
  }

  getSpecificsCategoriesById(categoryId: number) {
    return this.authorizationHttp.get("/categories/categoryspecifics/" + categoryId);
  }

  getBestMatchCategory(keyword: string) {
    return this.authorizationHttp.get("/categories/bestmach/" + keyword);
  }

  getCategoryNameById(categoryId: number) {
    return this.authorizationHttp.get("/categories/categoryname/" + categoryId);
  }

  getItemsByKeyWord(keyword: string) {
    return this.authorizationHttp.get("/items/search/" + keyword);
  }

  getItemsByKeyWordAndCategory(keyword: string, categoryId: number) {
    return this.authorizationHttp.get("/items/search/" + keyword + "/" + categoryId);
  }

  getItemsByKeyWordAndCategoryAndMinMaxPrice(keyword: string, categoryId: number, minPrice: number, maxPrice: number) {
    return this.authorizationHttp.get("/items/search/" + keyword + "/" + categoryId + "/" + minPrice + "/" + maxPrice);
  }

  getBestItemByKeyWord(keyword: string) {
    return this.authorizationHttp.get("/items/bestmach/item/" + keyword);
  }

  getCheapestItemByKeyWordInCategory(keyword: string, categoryId: number) {
    return this.authorizationHttp.get("/items/cheapest/item/" + keyword + "/" + categoryId);
  }
}
