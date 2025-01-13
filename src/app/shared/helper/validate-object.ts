export type ObjectValidator<T> = { [K in keyof T]: (value: any) => boolean };

export function validateObject<T>(obj: any,
                                  validator: ObjectValidator<T>): obj is T {
  return Object
    .keys(validator)
    .every(key => validator[key as keyof T](obj[key]));
}
