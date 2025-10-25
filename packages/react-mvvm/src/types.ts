import type { ComponentType } from "react";

export type Constructable<T> = new (...args: unknown[]) => T;

// Observer function type that matches both mobx-react and mobx-react-lite
// It accepts any React component and returns a component of the same type
export type ObserverFunction = <T extends ComponentType<unknown>>(
  component: T
) => T;
