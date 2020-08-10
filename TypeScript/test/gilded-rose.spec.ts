import { expect } from 'chai';
import { updateQuality, ItemCategory } from '../app/gilded-rose';

describe('Gilded Rose', () => {
  it('should handle an empty list of items', () => {
    const items = updateQuality();
    expect(items.length).to.equal(0);
  });

  describe('Default Items', () => {
    const name = 'Item';
    const category = ItemCategory.Default;

    it('should decrease the quality and sellIn value by one for an item', () => {
      const defaultItems = [{ name, sellIn: 2, quality: 18, category }];
      const items = updateQuality(defaultItems);
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(17);
    });

    it('should decrease the quality by two once the sell by date has passed', () => {
      const defaultItems = [{ name, sellIn: -1, quality: 10, category }];
      const items = updateQuality(defaultItems);
      expect(items[0].quality).to.equal(8);
    });

    it('should ensure the quality does not go below zero once the sell by date has passed', () => {
      const defaultItems = [{ name, sellIn: -1, quality: 0, category }];
      const items = updateQuality(defaultItems);
      expect(items[0].quality).to.equal(0);
    });

    it('should never return a negative quality', () => {
      const defaultItems = [{ name, sellIn: 2, quality: 0, category }];
      const items = updateQuality(defaultItems);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Aged Brie', () => {
    const name = 'Aged Brie';
    const category = ItemCategory.Brie;

    it('should increase the quality by one', () => {
      const brieItems = [{ name, sellIn: 2, quality: 12, category }];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(13);
    });

    it('should increase the quality by two when the sell by date has passed', () => {
      const brieItems = [{ name, sellIn: -1, quality: 12, category }];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(14);
    });

    it('should not increase the quality above 50 if the quality is already 50', () => {
      const brieItems = [{ name, sellIn: 2, quality: 50, category }];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should ensure the new quality does not go above 50', () => {
      const brieItems = [{ name, sellIn: 2, quality: 49, category }];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should ensure the new quality does not go above 50 once the sell by date has passed', () => {
      const brieItems = [{ name, sellIn: -1, quality: 49, category }];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(50);
    });
  });

  describe('Sulfuras', () => {
    const name = 'Sulfuras, Hand of Ragnaros';
    const category = ItemCategory.Sulfuras;

    it('should not decrease the quality and sellIn value', () => {
      const sulfurasItems = [{ name, sellIn: 6, quality: 24, category }];
      const items = updateQuality(sulfurasItems);
      expect(items[0].sellIn).to.equal(6);
      expect(items[0].quality).to.equal(24);
    });

    it('should not decrease the quality even when the sell by date has passed', () => {
      const sulfurasItems = [{ name, sellIn: -1, quality: 24, category }];
      const items = updateQuality(sulfurasItems);
      expect(items[0].quality).to.equal(24);
    });
  });

  describe('Backstage Passes', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';
    const category = ItemCategory.BackstagePasses;

    it('should increase the quality by one', () => {
      const backstagePassesItems = [
        { name, sellIn: 23, quality: 27, category }
      ];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(28);
    });

    it('should increase the quality by two when there are ten days left', () => {
      const backstagePassesItems = [
        { name, sellIn: 10, quality: 27, category }
      ];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(29);
    });

    it('should increase the quality by two when there are less than ten days and more than five days left', () => {
      const backstagePassesItems = [{ name, sellIn: 6, quality: 48, category }];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than ten days and more than five days left', () => {
      const backstagePassesItems = [{ name, sellIn: 6, quality: 49, category }];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than ten days and more than five days left and the quality is already 50', () => {
      const backstagePassesItems = [{ name, sellIn: 6, quality: 50, category }];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should increase the quality by three when there are five days left', () => {
      const backstagePassesItems = [{ name, sellIn: 5, quality: 27, category }];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(30);
    });

    it('should increase the quality by three when there are less than five days and more than zero days left', () => {
      const backstagePassesItems = [{ name, sellIn: 3, quality: 47, category }];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than five days and more than zero days left', () => {
      const backstagePassesItems = [{ name, sellIn: 3, quality: 49, category }];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than five days and more than zero days left and the quality is already 50', () => {
      const backstagePassesItems = [{ name, sellIn: 3, quality: 50, category }];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should set the quality to zero when the concert is the current day', () => {
      const backstagePassesItems = [{ name, sellIn: 0, quality: 27, category }];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(0);
    });

    it('should set the quality to zero when the concert has passed', () => {
      const backstagePassesItems = [
        { name, sellIn: -1, quality: 27, category }
      ];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Conjoured', () => {
    const name = 'Conjoured';
    const category = ItemCategory.Conjured;

    it('should decrease the quality by two and sellIn value by one for an item', () => {
      const counjouredItems = [{ name, sellIn: 2, quality: 18, category }];
      const items = updateQuality(counjouredItems);
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(16);
    });

    it('should decrease the quality by four once the sell by date has passed', () => {
      const counjouredItems = [{ name, sellIn: -1, quality: 10, category }];
      const items = updateQuality(counjouredItems);
      expect(items[0].quality).to.equal(6);
    });

    it('should ensure the quality does not go below zero once the sell by date has passed', () => {
      const counjouredItems = [{ name, sellIn: -1, quality: 1, category }];
      const items = updateQuality(counjouredItems);
      expect(items[0].quality).to.equal(0);
    });

    it('should never return a negative quality', () => {
      const counjouredItems = [{ name, sellIn: 2, quality: 1, category }];
      const items = updateQuality(counjouredItems);
      expect(items[0].quality).to.equal(0);
    });
  });
});
