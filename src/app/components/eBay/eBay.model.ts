export class CategoryType {
  bestOfferEnabled: boolean;
  autoPayEnabled: boolean;
  b2bVatEnabed: boolean;
  catalogEnabled: boolean;
  categoryId: string;
  categoryLevel: number;
  categoryName: string;
  categoyParentId: string[];
  categoyParentName: string[];
  productSearchPageAvailable: boolean;

  constructor(name: string){
    this.categoryName = name;
  }
}
