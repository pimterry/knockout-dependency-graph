"use strict";

define([
    'knockout3',
    'lib/main'
], function(ko, KoDependencyGraph) {
    describe('(Functional) With KO-dependency-graph', function () {
        it('graph nodes should be lookup-able by their subscribables', function () {
            var graph = new KoDependencyGraph(ko);

            var observable1 = ko.observable();
            var observable2 = ko.observable();
            var observable3 = ko.observable();

            expect(graph.nodeFor(observable1).subscribable).toEqual(observable1);
            expect(graph.nodeFor(observable2).subscribable).toEqual(observable2);
            expect(graph.nodeFor(observable3).subscribable).toEqual(observable3);
        });
    });
});