const MOCK = require('./mock.json');
const { expect } = require('chai');
const { filterItems } = require('./helpers');

describe('filter-tile-list', function() {
    it('get multiple items', function() {
        const items = filterItems(MOCK.items, { value: 'temp' });
        expect(items).to.be.a('array');
        expect(items).to.have.lengthOf(2);
    });

    it('get single item', function() {
        const items = filterItems(MOCK.items, { value: 'asdf' });
        expect(items).to.be.a('array');
        expect(items).to.have.lengthOf(1);
    });

    it('get all items', function() {
        const items = filterItems(MOCK.items);
        expect(items).to.be.a('array');
        expect(items).to.have.lengthOf(4);
    });
    it('get all items', function() {
        const items = filterItems(MOCK.items, {});
        expect(items).to.be.a('array');
        expect(items).to.have.lengthOf(4);
    });

    it('get all items by null', function() {
        const items = filterItems(MOCK.items, null);
        expect(items).to.be.a('array');
        expect(items).to.have.lengthOf(4);
    });

    it('get all items by null', function() {
        const items = filterItems(MOCK.items, { value: null });
        expect(items).to.be.a('array');
        expect(items).to.have.lengthOf(4);
    });
});
