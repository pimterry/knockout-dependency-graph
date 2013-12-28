"use strict";

define(['knockout3', 'lib/KoGraphNode'], function (ko, KoGraphNode) {
    describe("KoGraphNode", function () {
        it("should be empty initially", function () {
            var observable = ko.observable();
            var node = new KoGraphNode(observable);

            expect(node.subscribable).toEqual(observable);
            expect(node.subscribers).toEqual([]);
            expect(node.subscriptions).toEqual([]);
        });
    });
});