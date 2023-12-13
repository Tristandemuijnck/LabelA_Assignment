/** 'any' type is valid in the case of a value for a key/value pair. */
export type AnyObject<key extends string | number | symbol = string> = Record<key, any>;
