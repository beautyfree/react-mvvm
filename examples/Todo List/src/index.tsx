import "reflect-metadata";
import { configure as configureMobx, makeObservable } from "mobx";
import { render } from "react-dom";
import { configure as configureVVM } from "react-mvvm";
import { App } from "./views/App";

configureMobx({
  enforceActions: "never",
});

configureVVM({
  vmFactory: (VM) => {
    const viewModel = new VM();
    makeObservable(viewModel);
    return viewModel;
  },
});

render(<App />, document.getElementById("root"));
