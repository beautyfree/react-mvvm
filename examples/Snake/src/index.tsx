import "reflect-metadata";
import { makeObservable } from "mobx";
import { createRoot } from "react-dom/client";
import { configure } from "react-mvvm";
import { Map } from "./components/Map/Map";

configure({
  vmFactory: (VM) => makeObservable(new VM()),
});

createRoot(document.getElementById("root")!).render(<Map />);
