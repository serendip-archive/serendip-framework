import { ServerServiceInterface } from "../server";

import * as mustache from 'mustache'

export class ViewEngineService implements ServerServiceInterface {

    static dependencies = [];

    async start() {

    }


    public renderMustache(toRender: string, model: any, partials?: any): string {

        return mustache.render(toRender, model, partials);

    }



}