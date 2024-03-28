
export interface DbModuleConfigOptions {
    networks: NetworkConfig[]
}

export interface NetworkConfig {
    rpcUrl?: string
    cosmosPayerSeed?: string
    network: string
}

export class DbModuleConfig {
}
