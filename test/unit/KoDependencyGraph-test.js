"use strict";

define(['lib/KoDependencyGraph'], function (KoDependencyGraph) {
    function mockKo() {
        return {
            subscription: {},
            subscribable: {},
            utils: {
                extend: function () { }
            }
        };
    }

    describe("KoDependencyGraph", function () {
        it("should be empty initially", function () {
            var ko = mockKo();
            var graph = new KoDependencyGraph(ko);

            expect(graph.nodes).toEqual([]);
        });
    });
});