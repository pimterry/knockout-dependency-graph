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

    function KoDependencyGraph(ko) {
        var self = this;

        self.nodes = [];

        spyOnSubscribableCreation(ko, function (subscribable) {
            self.nodes.push(new KoGraphNode(subscribable));
        });
    }

    return KoDependencyGraph;
});