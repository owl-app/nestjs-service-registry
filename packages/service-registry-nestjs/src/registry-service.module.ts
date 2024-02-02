import { DynamicModule, ForwardReference, Provider, Type } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { createServiceRegistryProvider } from './providers';

export interface RegistryServiceModulepts<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  name: string,
  imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>,
  providers?: Provider[],
  services?: Record<string, Type<T>>
}

export class RegistryServiceModule {
  static forFeature<T>(opts: RegistryServiceModulepts<T>): DynamicModule {
    const { name, imports = [], providers = [], services = {} } = opts;
    const serviceRegistry = createServiceRegistryProvider<T>(name, services);
    const servicesProviders: Array<Type<T>> = [];

    Object.values(services).forEach((rule: Type<T>) => {
      servicesProviders.push(rule)
    })

    return {
      module: RegistryServiceModule,
      imports: [...imports, ConfigModule],
      providers: [...providers, ...servicesProviders, serviceRegistry],
      exports: [...imports, RegistryServiceModule, ConfigModule, serviceRegistry],
    }
  }
}