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