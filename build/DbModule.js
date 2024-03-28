"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const core_1 = require("@aries-framework/core");
let DbModule = class DbModule {
    constructor() {
        // todo 
    }
    register(dependencyManager) {
        // dependencyManager.registerInstance(AgentConfig, agent)
        dependencyManager.resolve(core_1.AgentConfig);
    }
    async initialize(agentContext) {
        //todo  we can connect to our ledger using this
    }
};
DbModule = __decorate([
    (0, core_1.injectable)()
], DbModule);
exports.DbModule = DbModule;
