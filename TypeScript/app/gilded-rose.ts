import { ICategorisedItem } from '../test/types';
import { categoryUpdateSellIn } from './sellIn';
import { categoryUpdateQuality } from './quality';

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
