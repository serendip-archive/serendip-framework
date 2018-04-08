"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mustache = require("mustache");
class ViewEngineService {
    async start() {
    }
    renderMustache(toRender, model, partials) {
        return mustache.render(toRender, model, partials);
    }
}
ViewEngineService.dependencies = [];
exports.ViewEngineService = ViewEngineService;
