"use strict";

define([
    'intern!bdd',
    'intern/chai!expect'
], function(bdd, expect) {
    bdd.describe('test suite', function () {
        bdd.it('test test', function () {
           expect(1).to.equal(1);
        });
    });
});