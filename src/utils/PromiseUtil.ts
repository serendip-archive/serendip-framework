export class PromiseUtil {

    public static runSeries(tasks: Promise<any>[]) {

        return tasks.reduce((promiseChain, currentTask) => {
            return promiseChain.then(chainResults =>
                currentTask.then(currentResult =>
                    [...chainResults, currentResult]
                )
            );
        }, Promise.resolve([]));


    }


}