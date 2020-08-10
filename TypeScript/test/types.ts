export interface IItem {
  name: string;
  sellIn: number;
  quality: number;
}

export enum ItemCategory {
  Default = 'DEFAULT',
  Brie = 'BRIE',
  Sulfuras = 'SULFURAS',
  BackstagePasses = 'BACKSTAGE_PASSES',
  Conjured = 'CONJURED'
}

export interface IExtendedItem extends IItem {
  category: ItemCategory;
}

export interface IItemCategoryUpdateSellIn {
  updateSellIn: (sellIn: number) => number;
}

export interface IItemCategoryUpdateQuality {
  updateQuality: (quality: number, sellIn: number) => number;
}
