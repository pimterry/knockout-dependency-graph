"use strict";

define([
    'knockout3',
    'lib/knockout-dependency-graph'
], function(ko, KoDependencyGraph) {
    describe('Functional tests', function () {
        describe('Basic usage', function () {
            it('Should track observable creation', function () {
                var graph = new KoDependencyGraph(ko);

                var observable = ko.observable();

                expect(graph.nodes.length).toEqual(1);
                expect(graph.nodes[0].subscribable).toEqual(observable);
            });

            it('Should track computed creation', function () {
                var graph = new KoDependencyGraph(ko);

                var computed = ko.computed(function () {
                    return 1;
                });

                expect(graph.nodes.length).toEqual(1);
                expect(graph.nodes[0].subscribable).toEqual(computed);
            });

            it('Should track nodes in order of creation time', function () {
                var graph = new KoDependencyGraph(ko);

                var observable1 = ko.observable();
                var observable2 = ko.observable();
                var observable3 = ko.observable();

                expect(graph.nodes.length).toEqual(3);
                expect(graph.nodes[0].subscribable).toEqual(observable1);
                expect(graph.nodes[1].subscribable).toEqual(observable2);
                expect(graph.nodes[2].subscribable).toEqual(observable3);
            });

            xit('Should track dependencies between observables', function () {
                var graph = new KoDependencyGraph(ko);

                var observable = ko.observable();
                var computed = ko.computed(function () {
                    return observable();
                });

                expect(graph.nodes[0].subscribers).toEqual([computed]);
                expect(graph.nodes[1].subscriptions).toEqual([observable]);
            });
        });
    });
});