"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PromiseUtil {
    static runSeries(tasks) {
        return tasks.reduce((promiseChain, currentTask) => {
            return promiseChain.then(chainResults => currentTask.then(currentResult => [...chainResults, currentResult]));
        }, Promise.resolve([]));
    }
}
exports.PromiseUtil = PromiseUtil;
