define(function () {
    function KoDependencyGraph(ko) {
        var self = this;

        self.nodes = [];

        var originalSubscribableConstructor = ko.subscribable;
        ko.subscribable = function () {
            originalSubscribableConstructor.apply(this, arguments);
            self.nodes.push(new KoGraphNode(this));
        };
        ko.utils.extend(ko.subscribable, originalSubscribableConstructor);
    }

    function KoGraphNode(subscribable) {
        this.subscribable = subscribable;
    }

    return KoDependencyGraph;
});