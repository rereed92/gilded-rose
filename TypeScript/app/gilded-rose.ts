// export class Item {
//   name: string;
//   sellIn: number;
//   quality: number;

//   constructor(name, sellIn, quality) {
//     this.name = name;
//     this.sellIn = sellIn;
//     this.quality = quality;
//   }
// }

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

const itemCategories = {
  [ItemCategory.Default]: {
    updateSellIn: (sellIn: number): number => sellIn - 1,
    updateQuality: (quality: number, sellIn: number): number => {
      const qualityModifier = sellIn < 0 ? 2 : 1;
      const qualityDifference = quality - qualityModifier;
      return qualityDifference <= 0 ? 0 : qualityDifference;
    }
  } as IItemCategoryUpdates,
  [ItemCategory.Brie]: {
    updateSellIn: (sellIn: number): number => sellIn - 1,
    updateQuality: (quality: number, sellIn: number): number => {
      const qualityModifier = sellIn < 0 ? 2 : 1;
      const qualityAddition = quality + qualityModifier;
      return qualityAddition >= 50 ? 50 : qualityAddition;
    }
  } as IItemCategoryUpdates,
  [ItemCategory.Sulfuras]: {
    updateSellIn: (sellIn: number): number => sellIn,
    updateQuality: (quality: number, sellIn: number): number => quality
  } as IItemCategoryUpdates,
  [ItemCategory.BackstagePasses]: {
    updateSellIn: (sellIn: number): number => sellIn - 1,
    updateQuality: (quality: number, sellIn: number): number => {
      const qualityModifier = backstagePassesQualityCalculator(quality, sellIn);
      const qualityAddition = quality + qualityModifier;
      return qualityAddition >= 50 ? 50 : qualityAddition;
    }
  } as IItemCategoryUpdates
};

export const updateQuality = (items: IExtendedItem[] = []): IExtendedItem[] => {
  return items.map((item: IExtendedItem) => ({
    ...item,
    sellIn: itemCategories[item.type].updateSellIn(item.sellIn),
    quality: itemCategories[item.type].updateQuality(item.quality, item.sellIn)
  }));
};

// export class GildedRose {
//   items: Array<Item>;

//   constructor(items = [] as Array<Item>) {
//     this.items = items;
//   }

//   updateQuality() {
//     for (let i = 0; i < this.items.length; i++) {
//       if (
//         this.items[i].name != 'Aged Brie' &&
//         this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert'
//       ) {
//         if (this.items[i].quality > 0) {
//           if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//             this.items[i].quality = this.items[i].quality - 1;
//           }
//         }
//       } else {
//         if (this.items[i].quality < 50) {
//           this.items[i].quality = this.items[i].quality + 1;
//           if (
//             this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert'
//           ) {
//             if (this.items[i].sellIn < 11) {
//               if (this.items[i].quality < 50) {
//                 this.items[i].quality = this.items[i].quality + 1;
//               }
//             }
//             if (this.items[i].sellIn < 6) {
//               if (this.items[i].quality < 50) {
//                 this.items[i].quality = this.items[i].quality + 1;
//               }
//             }
//           }
//         }
//       }
//       if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//         this.items[i].sellIn = this.items[i].sellIn - 1;
//       }
//       if (this.items[i].sellIn < 0) {
//         if (this.items[i].name != 'Aged Brie') {
//           if (
//             this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert'
//           ) {
//             if (this.items[i].quality > 0) {
//               if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
//                 this.items[i].quality = this.items[i].quality - 1;
//               }
//             }
//           } else {
//             this.items[i].quality =
//               this.items[i].quality - this.items[i].quality;
//           }
//         } else {
//           if (this.items[i].quality < 50) {
//             this.items[i].quality = this.items[i].quality + 1;
//           }
//         }
//       }
//     }

//     return this.items;
//   }
// }
