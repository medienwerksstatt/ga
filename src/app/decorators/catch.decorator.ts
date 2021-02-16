import {AppModule} from '../app.module';
import {ErrorService} from '../services/error/error.service';
import {ErrorInterface} from '../services/error/error.interface';

export function Catch(options?: { label: string }): MethodDecorator {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]): any {
            const errorService = AppModule.injector.get(ErrorService);
            try {
                const methodReturn = originalMethod.apply(this, args);
                if (methodReturn instanceof Promise) {
                    return methodReturn
                        .catch((error: Error) => errorService.add({
                            error,
                            label: options.label ? options.label : undefined
                        } as ErrorInterface));
                }
                return methodReturn;
            } catch (exception) {
                errorService.add({
                    error: exception,
                    label: options.label ? options.label : undefined
                } as ErrorInterface);
            }
        };

        return descriptor;
    };
}
