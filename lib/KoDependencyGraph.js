define(["./KoGraphNode"], function(KoGraphNode) {
    function spyOnKoSubscribableCreation(ko, callback) {
        var originalSubscribableConstructor = ko.subscribable;

        ko.subscribable = function () {
            var result = originalSubscribableConstructor.apply(this, arguments);
            callback(result || this);
            return result;
        };

        ko.utils.extend(ko.subscribable, originalSubscribableConstructor);
    }

    /**
     * Constructs a dependency graph, tracking everything that happens in given Knockout instance
     * from this point forwards
     *
     * @class KoDependencyGraph
     * @param {Object} ko The instance of knockout to track
     * @constructor
     */
    function KoDependencyGraph(ko) {
        var self = this;

        var nodeMetadataKey = '__koDependencyGraphData' + Math.random();

        self.nodes = [];

        spyOnKoSubscribableCreation(ko, function (subscribable) {
            var node = new KoGraphNode(subscribable);
            self.nodes.push(node);
            subscribable[nodeMetadataKey] = {
                node: node
            };
        });

        /**
         * Returns the corresponding graph node for a given subscribable,
         * or undefined if the subscribable is not in the graph.
         *
         * @param subscribable
         * @returns {Object} Node The corresponding graph node
         */
        self.nodeFor = function (subscribable) {
            return subscribable[nodeMetadataKey].node;
        };
    }

    return KoDependencyGraph;
});