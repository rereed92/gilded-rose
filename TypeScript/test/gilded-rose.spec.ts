import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', () => {
  it('should handle an empty list of items', () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items.length).to.equal(0);
  });

  describe('Default Items', () => {
    const itemName = 'Item';
    it('should decrease the quality and sellIn value by one for an item', () => {
      const gildedRose = new GildedRose([new Item(itemName, 2, 18)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(17);
    });

    it('should decrease the quality by two once the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item(itemName, -1, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(8);
    });

    it('should ensure the quality does not go below zero once the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item(itemName, -1, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    it('should never return a negative quality', () => {
      const gildedRose = new GildedRose([new Item(itemName, 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Aged Brie', () => {
    const brieName = 'Aged Brie';
    it('should increase the quality by one', () => {
      const gildedRose = new GildedRose([new Item(brieName, 2, 12)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(13);
    });

    it('should increase the quality by two when the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item(brieName, -1, 12)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(14);
    });

    it('should not increase the quality above 50 if the quality is already 50', () => {
      const gildedRose = new GildedRose([new Item(brieName, 2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should ensure the new quality does not go above 50', () => {
      const gildedRose = new GildedRose([new Item(brieName, 2, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should ensure the new quality does not go above 50 once the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item(brieName, -1, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });
  });

  describe('Sulfuras', () => {
    const sulfurasName = 'Sulfuras, Hand of Ragnaros';
    it('should not decrease the quality and sellIn value', () => {
      const gildedRose = new GildedRose([new Item(sulfurasName, 6, 24)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).to.equal(6);
      expect(items[0].quality).to.equal(24);
    });

    it('should not decrease the quality even when the sell by date has passed', () => {
      const gildedRose = new GildedRose([new Item(sulfurasName, -1, 24)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(24);
    });
  });

  describe('Backstage Passes', () => {
    const backstagePassName = 'Backstage passes to a TAFKAL80ETC concert';
    it('should increase the quality by one', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 23, 27)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(28);
    });

    it('should increase the quality by two when there are ten days left', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 10, 27)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(29);
    });

    it('should increase the quality by two when there are less than ten days and more than five days left', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 6, 48)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than ten days and more than five days left', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 6, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than ten days and more than five days left and the quality is already 50', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 6, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should increase the quality by three when there are five days left', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 5, 27)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(30);
    });

    it('should increase the quality by three when there are less than five days and more than zero days left', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 3, 47)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than five days and more than zero days left', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 3, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than five days and more than zero days left and the quality is already 50', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 3, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(50);
    });

    it('should set the quality to zero when the concert is the current day', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, 0, 27)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });

    it('should set the quality to zero when the concert has passed', () => {
      const gildedRose = new GildedRose([new Item(backstagePassName, -1, 27)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).to.equal(0);
    });
  });
});
