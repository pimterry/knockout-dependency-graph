define(function () {
    function KoGraphNode(subscribable) {
        this.subscribable = subscribable;
        this.subscribers = [];
        this.subscriptions = [];
    }

    return KoGraphNode;
});