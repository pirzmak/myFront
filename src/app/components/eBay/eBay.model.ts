export class CategoryType {
  name: string;
  value: number;
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


  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}
