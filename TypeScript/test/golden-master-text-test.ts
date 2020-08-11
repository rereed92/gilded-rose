import { updateQuality } from '../app/gilded-rose';
import { ItemCategory } from '../app/types';

const items = [
  {
    name: '+5 Dexterity Vest',
    sellIn: 10,
    quality: 20,
    category: ItemCategory.Default
  },
  { name: 'Aged Brie', sellIn: 2, quality: 0, category: ItemCategory.Brie },
  {
    name: 'Elixir of the Mongoose',
    sellIn: 5,
    quality: 7,
    category: ItemCategory.Default
  },
  {
    name: 'Sulfuras, Hand of Ragnaros',
    sellIn: 0,
    quality: 80,
    category: ItemCategory.Legendary
  },
  {
    name: 'Sulfuras, Hand of Ragnaros',
    sellIn: -1,
    quality: 80,
    category: ItemCategory.Legendary
  },
  {
    name: 'Backstage passes to a TAFKAL80ETC concert',
    sellIn: 15,
    quality: 20,
    category: ItemCategory.BackstagePasses
  },
  {
    name: 'Backstage passes to a TAFKAL80ETC concert',
    sellIn: 10,
    quality: 49,
    category: ItemCategory.BackstagePasses
  },
  {
    name: 'Backstage passes to a TAFKAL80ETC concert',
    sellIn: 5,
    quality: 49,
    category: ItemCategory.BackstagePasses
  },
  // this conjured item does not work properly yet
  {
    name: 'Conjured Mana Cake',
    sellIn: 3,
    quality: 6,
    category: ItemCategory.Conjured
  }
];

const days = 2;
for (let i = 0; i < days; i++) {
  console.log('-------- day ' + i + ' --------');
  console.log('name, sellIn, quality');
  items.forEach((element) => {
    console.log(element.name + ' ' + element.sellIn + ' ' + element.quality);
  });
  console.log();
  updateQuality(items);
}
