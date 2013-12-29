"use strict";

require(["test/vendor/Squire"], function (Squire) {
    window.beforeEachReload = function (dependencyName, mocks, callback) {
        var dependency;

        beforeEach(function () {
            runs(function () {
                dependency = null;
                new Squire()
                    .mock(mocks)
                    .require([dependencyName], function (freshDependency) {
                        dependency = freshDependency;
                    });
            });

            waitsFor(function () {
                return dependency;
            });

            runs(function () {
                callback(dependency);
            });
        });
    };
});