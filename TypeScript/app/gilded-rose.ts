import {
  ItemCategory,
  IItemCategoryUpdateSellIn,
  IItemCategoryUpdateQuality,
  ICategorisedItem
} from '../test/types';

const calculateBackstagePassesQualityModifier = (
  quality: number,
  sellIn: number
): number => {
  if (sellIn <= 0) return quality * -1;
  if (sellIn <= 5) return 3;
  if (sellIn <= 10) return 2;
  return 1;
};

const calculateQualityModifier = (
  sellIn: number,
  multiplier: number = 1
): number => (sellIn < 0 ? 2 : 1) * multiplier;

const updateCategoryQuality = (
  quality: number,
  qualityModifier: number
): number => {
  const newQuality = quality + qualityModifier;
  if (newQuality >= 50) return 50;
  if (newQuality <= 0) return 0;
  return newQuality;
};

const categoryUpdateSellIn = (
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

const categoryUpdateQuality = (
  category: ItemCategory
): IItemCategoryUpdateQuality => {
  switch (category) {
    case ItemCategory.Brie:
      return {
        updateQuality: (quality: number, sellIn: number): number => {
          const qualityModifier = calculateQualityModifier(sellIn);
          return updateCategoryQuality(quality, qualityModifier);
        }
      };
    case ItemCategory.Sulfuras:
      return {
        updateQuality: (quality: number, sellIn: number): number => quality
      };
    case ItemCategory.BackstagePasses:
      return {
        updateQuality: (quality: number, sellIn: number): number => {
          const qualityModifier = calculateBackstagePassesQualityModifier(
            quality,
            sellIn
          );
          return updateCategoryQuality(quality, qualityModifier);
        }
      };
    case ItemCategory.Conjured:
      return {
        updateQuality: (quality: number, sellIn: number): number => {
          const qualityModifier = calculateQualityModifier(sellIn, -2);
          return updateCategoryQuality(quality, qualityModifier);
        }
      };
    default:
      return {
        updateQuality: (quality: number, sellIn: number): number => {
          const qualityModifier = calculateQualityModifier(sellIn, -1);
          return updateCategoryQuality(quality, qualityModifier);
        }
      };
  }
};

export const updateQuality = (
  items: ICategorisedItem[] = []
): ICategorisedItem[] => {
  return items.map((item: ICategorisedItem) => ({
    ...item,
    sellIn: categoryUpdateSellIn(item.category).updateSellIn(item.sellIn),
    quality: categoryUpdateQuality(item.category).updateQuality(
      item.quality,
      item.sellIn
    )
  }));
};
