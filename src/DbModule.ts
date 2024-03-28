import { AgentConfig, DependencyManager, Module, Update, injectable } from "@aries-framework/core";
import type { AgentContext } from "@aries-framework/core";

@injectable()
export class DbModule implements Module {
    public constructor() {
        // todo 
    }
    public register(dependencyManager: DependencyManager) {
        // dependencyManager.registerInstance(AgentConfig, agent)
        dependencyManager.resolve(AgentConfig)
    }
    public async initialize(agentContext: AgentContext): Promise<void> {
        //todo  we can connect to our ledger using this
    }
}