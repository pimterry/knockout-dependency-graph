"use strict";

define(['test/vendor/Squire'], function (Squire) {
    function mockKo() {
        return {
            subscription: function () { },
            subscribable: function () { },
            utils: {
                extend: function () { }
            }
        };
    }

    describe("KoDependencyGraph", function () {
        var KoGraphNode = function () { };
        var KoDependencyGraph;

        beforeEachReload('lib/KoDependencyGraph', {
            'lib/KoGraphNode': KoGraphNode
        }, function (freshKoDependencyGraph) {
            KoDependencyGraph = freshKoDependencyGraph;
        });

        it("should be empty initially", function () {
            var ko = mockKo();
            var graph = new KoDependencyGraph(ko);

            expect(graph.nodes).toEqual([]);
        });

        it("should add nodes when subscribables are created", function () {
            var ko = mockKo();
            var graph = new KoDependencyGraph(ko);

            ko.subscribable();
            ko.subscribable();

            expect(graph.nodes.length).toEqual(2);
        });

        it("should allow node lookup by subscribable", function () {
            var ko = mockKo();
            var graph = new KoDependencyGraph(ko);

            var subscribable1 = new ko.subscribable();
            var subscribable2 = new ko.subscribable();

            expect(graph.nodeFor(subscribable1)).toEqual(graph.nodes[0]);
            expect(graph.nodeFor(subscribable2)).toEqual(graph.nodes[1]);
        });
    });
});