export interface IItem {
  name: string;
  sellIn: number;
  quality: number;
}

export enum ItemCategory {
  Default = 'DEFAULT',
  Brie = 'BRIE',
  Sulfuras = 'SULFURAS',
  BackstagePasses = 'BACKSTAGE_PASSES'
}

export interface IExtendedItem extends IItem {
  type: ItemCategory;
}

export interface IItemCategoryUpdates {
  updateSellIn: (sellIn: number) => number;
  updateQuality: (quality: number, sellIn: number) => number;
}

const backstagePassesQualityCalculator = (
  quality: number,
  sellIn: number
): number => {
  if (sellIn <= 0) return quality * -1;
  if (sellIn <= 5) return 3;
  if (sellIn <= 10) return 2;
  return 1;
};

const updateCategorySellIn = (sellIn: number): number => sellIn - 1;

const updateCategoryQuality = (
  quality: number,
  qualityModifier: number
): number => {
  const newQuality = quality + qualityModifier;
  if (newQuality >= 50) return 50;
  if (newQuality <= 0) return 0;
  return newQuality;
};

const categoryUpdates = (type: ItemCategory): IItemCategoryUpdates => {
  switch (type) {
    case ItemCategory.Brie:
      return {
        updateSellIn: (sellIn: number): number => updateCategorySellIn(sellIn),
        updateQuality: (quality: number, sellIn: number): number => {
          const qualityModifier = sellIn < 0 ? 2 : 1;
          return updateCategoryQuality(quality, qualityModifier);
        }
      };
    case ItemCategory.Sulfuras:
      return {
        updateSellIn: (sellIn: number): number => sellIn,
        updateQuality: (quality: number, sellIn: number): number => quality
      };
    case ItemCategory.BackstagePasses:
      return {
        updateSellIn: (sellIn: number): number => updateCategorySellIn(sellIn),
        updateQuality: (quality: number, sellIn: number): number => {
          const qualityModifier = backstagePassesQualityCalculator(
            quality,
            sellIn
          );
          return updateCategoryQuality(quality, qualityModifier);
        }
      };
    default:
      return {
        updateSellIn: (sellIn: number): number => updateCategorySellIn(sellIn),
        updateQuality: (quality: number, sellIn: number): number => {
          const qualityModifier = sellIn < 0 ? 2 : 1;
          return updateCategoryQuality(quality, qualityModifier * -1);
        }
      };
  }
};

export const updateQuality = (items: IExtendedItem[] = []): IExtendedItem[] => {
  return items.map((item: IExtendedItem) => ({
    ...item,
    sellIn: categoryUpdates(item.type).updateSellIn(item.sellIn),
    quality: categoryUpdates(item.type).updateQuality(item.quality, item.sellIn)
  }));
};
