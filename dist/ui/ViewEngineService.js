"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ViewEngineService {
    async start() {
    }
    renderMustache(toRender, model, partials) {
        return Mustache.render(toRender, model, partials);
    }
}
ViewEngineService.dependencies = [];
exports.ViewEngineService = ViewEngineService;
