import { ItemCategory, IItemCategoryUpdateSellIn } from './types';

export const categoryUpdateSellIn = (
  category: ItemCategory
): IItemCategoryUpdateSellIn => {
  switch (category) {
    case ItemCategory.Legendary:
      return {
        updateSellIn: (sellIn: number): number => sellIn
      };
    default:
      return {
        updateSellIn: (sellIn: number): number => sellIn - 1
      };
  }
};
