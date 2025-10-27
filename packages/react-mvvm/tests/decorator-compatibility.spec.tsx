import React from "react";
import { render, screen } from "@testing-library/react";
import { action, makeObservable, observable } from "mobx";
import { view, ViewModel } from "../src";

// Test ViewModel with decorators
class DecoratorViewModel extends ViewModel {
  @observable count = 0;

  @action increment = () => {
    this.count++;
  };
}

// Test ViewModel without decorators (using makeObservable)
class AnnotationViewModel extends ViewModel {
  count = 0;

  increment = () => {
    this.count++;
  };

  constructor() {
    super();
    // This should work without conflicts
    makeObservable(this, {
      count: observable,
      increment: action,
    });
  }
}

const DecoratorView = view(DecoratorViewModel)(() => {
  const vm = DecoratorViewModel.prototype as any;
  return (
    <div>
      <span data-testid="count">{vm.count}</span>
      <button data-testid="increment" onClick={vm.increment}>
        Increment
      </button>
    </div>
  );
});

const AnnotationView = view(AnnotationViewModel)(() => {
  const vm = AnnotationViewModel.prototype as any;
  return (
    <div>
      <span data-testid="count">{vm.count}</span>
      <button data-testid="increment" onClick={vm.increment}>
        Increment
      </button>
    </div>
  );
});

describe("Decorator Compatibility", () => {
  it("should work with decorators without MobX errors", () => {
    // This test should not throw the "makeObservable second arg must be nullish" error
    expect(() => {
      render(<DecoratorView />);
    }).not.toThrow();
  });

  it("should work with annotations without conflicts", () => {
    // This test should not throw any MobX errors
    expect(() => {
      render(<AnnotationView />);
    }).not.toThrow();
  });
});
