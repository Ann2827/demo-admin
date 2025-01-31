export type PartialRecursive<T> = {
  [P in keyof T]?: PartialRecursive<T[P]>;
};
export type RequiredRecursive<T> = {
  [P in keyof T]-?: RequiredRecursive<T[P]>;
};

export type Nullable<T> = { [K in keyof T]: T[K] | null };
