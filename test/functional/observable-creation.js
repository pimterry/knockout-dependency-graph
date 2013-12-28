"use strict";

define([
    'knockout3',
    'lib/main'
], function(ko, KoDependencyGraph) {
    describe('(Functional) With KO-dependency-graph', function () {
        it('observable creation should be tracked', function () {
            var graph = new KoDependencyGraph(ko);

            var observable = ko.observable();

            expect(graph.nodes.length).toEqual(1);
            expect(graph.nodes[0].subscribable).toEqual(observable);
        });

        it('computed creation should be tracked', function () {
            var graph = new KoDependencyGraph(ko);

            var computed = ko.computed(function () {
                return 1;
            });

            expect(graph.nodes.length).toEqual(1);
            expect(graph.nodes[0].subscribable).toEqual(computed);
        });

        it('subscribable tracking should happen in creation order', function () {
            var graph = new KoDependencyGraph(ko);

            var observable1 = ko.observable();
            var observable2 = ko.observable();
            var observable3 = ko.observable();

            expect(graph.nodes.length).toEqual(3);
            expect(graph.nodes[0].subscribable).toEqual(observable1);
            expect(graph.nodes[1].subscribable).toEqual(observable2);
            expect(graph.nodes[2].subscribable).toEqual(observable3);
        });
    });
});