define(["./KoGraphNode"], function(KoGraphNode) {
    function spyOnSubscribableCreation(ko, callback) {
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
     * @param {Object} ko The instance of knockout to track
     * @constructor
     */
    function KoDependencyGraph(ko) {
        var self = this;

        self.nodes = [];

        spyOnSubscribableCreation(ko, function (subscribable) {
            self.nodes.push(new KoGraphNode(subscribable));
        });
    }

    return KoDependencyGraph;
});