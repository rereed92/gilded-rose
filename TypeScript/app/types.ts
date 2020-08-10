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

export interface ICategorisedItem extends IItem {
  category: ItemCategory;
}

export class DefaultItem implements ICategorisedItem {
  name: string;
  sellIn: number;
  quality: number;
  category = ItemCategory.Default;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class BrieItem extends DefaultItem {
  category = ItemCategory.Brie;
}

export class SulfurasItem extends DefaultItem {
  category = ItemCategory.Sulfuras;

  constructor(name, sellIn) {
    super(name, sellIn, 80);
  }
}

export class BackstagePassesItem extends DefaultItem {
  category = ItemCategory.BackstagePasses;
}

export class ConjuredItem extends DefaultItem {
  category = ItemCategory.Conjured;
}

export interface IItemCategoryUpdateSellIn {
  updateSellIn: (sellIn: number) => number;
}

export interface IItemCategoryUpdateQuality {
  updateQuality: (quality: number, sellIn: number) => number;
}
