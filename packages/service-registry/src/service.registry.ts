import { ExistingServiceException } from "./exception/existing.service.exception";
import { NonExistingServiceException } from "./exception/non-existing.service.exception";
import { IServiceRegistry } from "./service.registry.interface";

export class ServiceRegistry<T> implements IServiceRegistry<T>
{
    private services: Record<string, T> = {}

    constructor(readonly context: string = 'service'){}

    all(): Record<string, T>
    {
        return this.services;
    }

    register(identifier: string, service: T): void
    {
        if (this.has(identifier)) {
            throw new ExistingServiceException(this.context, identifier);
        }

        this.services[identifier] = service;
    }

    unregister(identifier: string): void
    {
        if (!this.has(identifier)) {
            throw new NonExistingServiceException(this.context, identifier, Object.getOwnPropertyNames(this.services));
        }

        delete (this.services[identifier]);
    }

    has(identifier: string): boolean
    {
        return this.services[identifier] !== undefined;
    }

    get(identifier: string): T
    {
        if (!this.has(identifier)) {
            throw new NonExistingServiceException(this.context, identifier, Object.getOwnPropertyNames(this.services));
        }

        return this.services[identifier];
    }
}
