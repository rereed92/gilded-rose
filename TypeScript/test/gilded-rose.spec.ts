import { expect } from 'chai';
import { updateQuality } from '../app/gilded-rose';
import {
  DefaultItem,
  BrieItem,
  LegendaryItem,
  BackstagePassesItem,
  ConjuredItem
} from '../app/types';

describe('Gilded Rose', () => {
  it('should handle an empty list of items', () => {
    const items = updateQuality();
    expect(items.length).to.equal(0);
  });

  describe('Default Items', () => {
    const name = 'Item';

    it('should decrease the quality and sellIn value by one for an item', () => {
      const defaultItems = [new DefaultItem(name, 2, 18)];
      const items = updateQuality(defaultItems);
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(17);
    });

    it('should decrease the quality by two once the sell by date has passed', () => {
      const defaultItems = [new DefaultItem(name, -1, 10)];
      const items = updateQuality(defaultItems);
      expect(items[0].quality).to.equal(8);
    });

    it('should ensure the quality does not go below zero once the sell by date has passed', () => {
      const defaultItems = [new DefaultItem(name, -1, 0)];
      const items = updateQuality(defaultItems);
      expect(items[0].quality).to.equal(0);
    });

    it('should never return a negative quality', () => {
      const defaultItems = [new DefaultItem(name, 2, 0)];
      const items = updateQuality(defaultItems);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Aged Brie', () => {
    const name = 'Aged Brie';

    it('should increase the quality by one', () => {
      const brieItems = [new BrieItem(name, 2, 12)];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(13);
    });

    it('should increase the quality by two when the sell by date has passed', () => {
      const brieItems = [new BrieItem(name, -1, 12)];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(14);
    });

    it('should not increase the quality above 50 if the quality is already 50', () => {
      const brieItems = [new BrieItem(name, 2, 50)];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should ensure the new quality does not go above 50', () => {
      const brieItems = [new BrieItem(name, 2, 49)];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should ensure the new quality does not go above 50 once the sell by date has passed', () => {
      const brieItems = [new BrieItem(name, -1, 49)];
      const items = updateQuality(brieItems);
      expect(items[0].quality).to.equal(50);
    });
  });

  describe('Sulfuras', () => {
    const name = 'Sulfuras, Hand of Ragnaros';

    it('should not decrease the quality and sellIn value', () => {
      const LegendaryItems = [new LegendaryItem(name, 6)];
      const items = updateQuality(LegendaryItems);
      expect(items[0].sellIn).to.equal(6);
      expect(items[0].quality).to.equal(80);
    });

    it('should not decrease the quality even when the sell by date has passed', () => {
      const LegendaryItems = [new LegendaryItem(name, -1)];
      const items = updateQuality(LegendaryItems);
      expect(items[0].quality).to.equal(80);
    });
  });

  describe('Backstage Passes', () => {
    const name = 'Backstage passes to a TAFKAL80ETC concert';

    it('should increase the quality by one', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 23, 27)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(28);
    });

    it('should increase the quality by two when there are ten days left', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 10, 27)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(29);
    });

    it('should increase the quality by two when there are less than ten days and more than five days left', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 6, 48)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than ten days and more than five days left', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 6, 49)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than ten days and more than five days left and the quality is already 50', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 6, 50)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should increase the quality by three when there are five days left', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 5, 27)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(30);
    });

    it('should increase the quality by three when there are less than five days and more than zero days left', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 3, 47)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than five days and more than zero days left', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 3, 49)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should not increase the quality above 50 when there are less than five days and more than zero days left and the quality is already 50', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 3, 50)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(50);
    });

    it('should set the quality to zero when the concert is the current day', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, 0, 27)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(0);
    });

    it('should set the quality to zero when the concert has passed', () => {
      const backstagePassesItems = [new BackstagePassesItem(name, -1, 27)];
      const items = updateQuality(backstagePassesItems);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Conjured', () => {
    const name = 'Conjured';

    it('should decrease the quality by two and sellIn value by one for an item', () => {
      const conjuredItems = [new ConjuredItem(name, 2, 18)];
      const items = updateQuality(conjuredItems);
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(16);
    });

    it('should decrease the quality by four once the sell by date has passed', () => {
      const conjuredItems = [new ConjuredItem(name, -1, 10)];
      const items = updateQuality(conjuredItems);
      expect(items[0].quality).to.equal(6);
    });

    it('should ensure the quality does not go below zero once the sell by date has passed', () => {
      const conjuredItems = [new ConjuredItem(name, -1, 1)];
      const items = updateQuality(conjuredItems);
      expect(items[0].quality).to.equal(0);
    });

    it('should never return a negative quality', () => {
      const conjuredItems = [new ConjuredItem(name, 2, 1)];
      const items = updateQuality(conjuredItems);
      expect(items[0].quality).to.equal(0);
    });
  });
});
