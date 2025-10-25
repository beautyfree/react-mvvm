import { type ComponentClass, type FC, Fragment, type ReactNode } from "react";
import type { Constructable } from "./types";
import { ASSIGN, type ViewModel } from "./ViewModel";

type TConfiguration = {
  vmFactory: <T extends ViewModel>(VM: Constructable<T>) => T;
  Wrapper:
    | FC<{ children: ReactNode }>
    | ComponentClass<{ children: ReactNode }>;
};

export const configuration: TConfiguration = {
  vmFactory: (VM) => new VM(),
  Wrapper: Fragment,
};

export const configure = (config: Partial<TConfiguration>) => {
  ASSIGN(configuration, config);
};
