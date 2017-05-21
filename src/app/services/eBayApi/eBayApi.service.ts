import {Injectable} from "@angular/core";
import {Jsonp} from "@angular/http";

import 'rxjs/add/operator/map';
import {AuthorizationHttp} from "../authorizationHttp/authorizationHttp";

@Injectable()
export class EBayService {
  constructor(private authorizationHttp: AuthorizationHttp) {
  }

  getMainCategories() {
    // return [
    //   new Category('Antyki i Sztuka', 353),
    //   new Category('Biuro i Szkoła', 1),
    //   new Category('Biżuteria i Zegarki', 1),
    //   new Category('Delikatesy', 1),
    //   new Category('Dla Dzieci', 1),
    //   new Category('Dom i Meble', 1),
    //   new Category('Filmy i DVD', 1),
    //   new Category('Firma i Przemysł', 1),
    //   new Category('Fotografia i Kamery', 1),
    //   new Category('Gry i Konsole', 1),
    //   new Category('Instrumenty Muzyczne', 1),
    //   new Category('Kolekcje', 1),
    //   new Category('Komputery i Tablety', 1),
    //   new Category('Książki', 1),
    //   new Category('Majsterkowanie', 1),
    //   new Category('Modelarstwo', 1),
    //   new Category('Monety i Banknoty', 1),
    //   new Category('Motoryzacja: Części', 1),
    //   new Category('Motoryzacja: Pojazdy', 1),
    //   new Category('Muzyka', 1),
    //   new Category('Nieruchomości', 1),
    //   new Category('Odzież, Buty i Dodatki', 1),
    //   new Category('Ogród i Taras', 1),
    //   new Category('Podróże', 1),
    //   new Category('Sport i Turystyka', 1),
    //   new Category('Sprzęt AGD', 1),
    //   new Category('Telefony i Akcesoria', 1),
    //   new Category('TV, Audio i Video', 1),
    //   new Category('Zabawki', 1),
    //   new Category('Zdrowie i Uroda', 1),
    //   new Category('Znaczki', 1),
    //   new Category('Zwierzęta', 1),
    //   new Category('Wszystko inne', 1)];
    //return this.authorizationHttp.get("/categories/maincategories").map(r => r.categories.map(cat => retur));]
    return null;
  }

  getSbsCategoriesByParentId(parentId: number) {
    return this.authorizationHttp.get("/categories/subcategories/" + parentId);
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
