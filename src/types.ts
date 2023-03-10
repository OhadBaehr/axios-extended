// Helpers
export type NestedKeyValuePairs<T> = { [key: string]: T | NestedKeyValuePairs<T> };
export type SerializableValue = null | number | boolean | string | undefined
export type SerializableObject = NestedKeyValuePairs<SerializableValue>
export type Serializable = SerializableValue | SerializableObject | null


/**
 * Creates a new type which is a strict subset of Original, where all its properties are optional
 * @template Subset - The type of the subset
 * @template Original - The type of the original object
 */
export type StrictPartial<Subset, Original> = {
    [K in keyof Subset]:
    K extends keyof Original
    ? StrictPartial<Subset[K], Original[K]>
    : Subset extends { [key: string]: Original }
    ? StrictPartial<Subset[K], Original>
    : never
};




/**
 * Creates a new object where k is a property name from a cell in an array of objects, 
 * the resulting object will contain all cells where the value of property k is the key
 * @template T - An array of unknown objects that have a common property K
 * @template K - The common key for all objects in T
 */
export type ReduceToObject<T extends Array<unknown>, K extends keyof T[number]> = {
    [P in T[number][K]as string]: Extract<T[number], Record<K, P>>
};




/**
 * Extracts the type of a single element of an array
 * @template T - An array of unknown elements
 */
export type SingleElement<T extends Array<unknown>> = T extends (infer U)[] ? U : never




/**
 * Extracts the type of the T
 * @template T - The type parameter to infer
 */
export type InferType<T> = T extends infer R ? R : never




/**
 * Extracts the type of the property K of a type T
 * @template T - The object type
 * @template K - The name of the property to extract the type from
 */
export type InferPropertyType<T, K extends string, fallback = never> =
    K extends keyof T ? InferType<T[K]> : fallback;



/**
 * Creates a new type which is T with the properties K made required
 * @template T - The object type
 * @template K - The keys to make required
 */
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }



/**
 * Extracts the type of the property K from an array of unknown objects
 * @template T - An array of unknown objects
 * @template K - The name of the property to extract the type from
 */
export type ExtractPropertyFromArray<T extends unknown[], K extends keyof T[number]> =
    T extends Array<infer U> ? U[K] : never;





/**
 * Extracts the type of the property K from an array of unknown objects if it exists, and if the objects have a property P with a matching value
 * @template T - An array of unknown objects
 * @template K - The name of the property to extract the type from
 * @template P - The name of the property that must match a certain value
 */
export type ExtractPropertyFromArrayIfExist<T extends unknown[], K extends keyof T[number], P extends string,fallback=never> =
    T extends Array<infer U> ? (U extends Record<P, unknown> ? (U extends Record<K, unknown> ? U[K] : fallback) :fallback) : fallback;





/**
 * Creates a new object type where the properties are the unique values of a specific property of an array of objects
 * @template T - An array of objects
 * @template P - The property name to use as keys in the new object
*/
export type ArrayToObject<T extends { [key: string]: unknown }[], P extends keyof T[number]> = {
    [K in keyof T[number][P]]?: Extract<T[number], Record<P, K>>;
};





/**
 * Determines if two types A and B are equal
 * @template A - The first type to compare
 * @template B - The second type to compare
*/
export type IsEqual<A, B> =
    (<G>() => G extends A ? 1 : 2) extends
    (<G>() => G extends B ? 1 : 2)
    ? true
    : false;



/**
 * Extends properties of A by properties of B, overides if needed
 * @template A - Type to extend
 * @template B - Type for new properties
*/
export type Override<A, B> = Omit<A, keyof B> & B;