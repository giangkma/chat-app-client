import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Resolver } from 'react-hook-form';

export declare type ClassType<T> = {
    new (...args: any[]): T;
};

/**
 * Class validator form resolver factory
 * to create resolver for use with react hook form
 *
 * @export
 * @template TFormValues
 * @param {ClassType<TFormValues>} classValidator
 * @returns {Resolver<TFormValues>}
 */
export function classValidatorFormResolverFactory<
    TFormValues extends Record<string, any> = Record<string, any>
>(classValidator: ClassType<TFormValues>): Resolver<TFormValues> {
    return async data => {
        const errors = await validate(plainToClass(classValidator, data), {
            forbidUnknownValues: true,
        });

        const hasError = errors.length > 0;
        return {
            values: hasError ? {} : data,
            errors: hasError
                ? errors.reduce((allErrors, currentError) => {
                      return {
                          ...allErrors,
                          [currentError.property]: {
                              type: 'validation',
                              // map constraints to error message string
                              message: currentError.constraints
                                  ? Object.values(
                                        currentError.constraints,
                                    ).reduce(
                                        (prev, curr) => prev + '\n' + curr,
                                        '',
                                    )
                                  : undefined,
                          },
                      };
                  }, {})
                : {},
        };
    };
}
