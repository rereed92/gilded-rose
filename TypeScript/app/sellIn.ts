import { ItemCategory, IItemCategoryUpdateSellIn } from '../test/types';

export const categoryUpdateSellIn = (
  category: ItemCategory
): IItemCategoryUpdateSellIn => {
  switch (category) {
    case ItemCategory.Sulfuras:
      return {
        updateSellIn: (sellIn: number): number => sellIn
      };
    default:
      return {
        updateSellIn: (sellIn: number): number => sellIn - 1
      };
  }
};
