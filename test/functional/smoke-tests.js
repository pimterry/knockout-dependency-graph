"use strict";

define([
    'knockout3',
    'lib/main'
], function(ko, KoDependencyGraph) {
    describe('(Smoke tests) KO dependency graph', function () {
        it('Track observable creation', function () {
            var graph = new KoDependencyGraph(ko);

            var observable1 = ko.observable();
            var observable2 = ko.computed(function () {
                return 1;
            });
            var observable3 = ko.observable();

            expect(graph.nodes.length).toEqual(3);
            expect(graph.nodes[0].subscribable).toEqual(observable1);
            expect(graph.nodes[1].subscribable).toEqual(observable2);
            expect(graph.nodes[2].subscribable).toEqual(observable3);
        });

        xit('track dependencies between observables', function () {
            var graph = new KoDependencyGraph(ko);

            var observable = ko.observable();
            var computed = ko.computed(function () {
                return observable();
            });
            var unreadObservable = ko.observable();

            expect(graph.nodeFor(observable).subscribers).toEqual([computed]);
            expect(graph.nodeFor(observable).subscriptions).toEqual([]);

            expect(graph.nodeFor(computed).subscribers).toEqual([]);
            expect(graph.nodeFor(computed).subscriptions).toEqual([observable]);

            expect(graph.nodeFor(unreadObservable).subscribers).toEqual([]);
            expect(graph.nodeFor(unreadObservable).subscriptions).toEqual([]);
        });
    });
});