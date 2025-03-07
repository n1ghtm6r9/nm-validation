declare module '@nestjs/core/helpers/execution-context-host' {
  type ExecutionContextHost = any;
}

declare module '@nestjs/common' {
  interface CanActivate {}
  const UseGuards =
    data =>
    (...params) => {};
  const Global = (): ClassDecorator => {};
  const Module = (data): ClassDecorator => {};
  const Inject: (data) => ParameterDecorator;
  const Injectable = (): ClassDecorator => {};
}

declare module '@nmxjs/config' {
  enum TransporterEnumType {
    NATS = 'nats',
    TCP = 'tcp',
    GRPC = 'grpc',
  }
  interface IConfig {
    transport?: {
      type: TransporterEnumType;
      services: Array<{
        name?: string;
        port?: number;
        host?: string;
      }>;
      keepaliveTimeMs?: number;
      keepaliveTimeoutMs?: number;
    };
  }
  const configKey: string;
  const getConfig: () => IConfig;
}
