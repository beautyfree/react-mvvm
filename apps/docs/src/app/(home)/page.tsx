import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { CodeBlock } from "@/components/CodeBlock";
import { Gradient } from "@/components/Gradient";

const separatedExample = `
import { action, makeObservable, observable } from 'mobx';
// [!code focus]
import { view, ViewModel, configure } from 'react-mvvm';

// [!code focus:7]
configure({
  vmFactory: VM => {
    const viewModel = new VM();
    makeObservable(viewModel);
    return viewModel;
  },
});

// [!code focus]
class CounterViewModel extends ViewModel {
  // [!code focus]
  @observable counter = 0;

  // [!code focus:3]
  @action increase = () => {
    this.counter++;
  }
// [!code focus]
}

// [!code focus]
const Counter = view(CounterViewModel)(({ viewModel }) => (
  <div>
    // [!code focus]
    <span>Counter: {viewModel.counter}</span>
    // [!code focus]
    <button onClick={() => viewModel.increase()}>Update</button>
  </div>
))`;

const contextExample = `
import React, { FC } from 'react';
// [!code focus]
import { view, childView } from 'react-mvvm';
import { SomeViewModel } from './path-to-view-model';

// [!code focus]
const SomeChildView = childView<SomeViewModel>()(({ viewModel }) => (
  <div>
    // [!code focus:2]
    {/* You can use view models as context at any depth level inside a view */}
    <span>Counter: {viewModel.counter}</span>

    // [!code focus:2]
    {/* You can also use view's props with a viewModel object, so there's no need to drill them */}
    <span>{viewModel.viewProps.prop1}</span>
  </div>
));

type Props = {
  prop1: number;
};

// [!code focus]
const SomeView = view(SomeViewModel)<Props>(({ viewModel, prop1 }) => (
  <div>
    // [!code focus:5]
    {/* You can use view models as context */}
    <span>Counter: {viewModel.counter}</span>
    <span>Sum: {viewModel.counter + prop1}</span>
    <button onClick={() => viewModel.increase()}>Update</button>
    <SomeChildView />
  </div>
))`;

const hooksExample = `
// [!code focus]
import { view, ViewModel } from 'react-mvvm';
import { AnyMemoizedComponent } from './AnyMemoizedComponent';

// [!code focus]
class SomeViewModel extends ViewModel {
  // [!code focus:3]
  // Can be used instead of useLayoutEffect(() => { ... }, []);
  protected onViewMountedSync() { }

  // [!code focus:3]
  // Can be used instead of useEffect(() => { ... }, []);
  protected onViewUnmounted() { }

  // [!code focus:3]
  // Can be used partially instead of useEffect(() => { ... });
  protected onViewUpdated() { }

  // [!code focus:3]
  // Any function that created in a ViewModel is memoized,
  // so you don't need to use useMemo or useCallback
  handleClick = () => { ... };
}

// [!code focus]
const SomeView = view(SomeViewModel)(({ viewModel }) => (
  <div>
    // [!code focus:2]
    Thus, the view can start to consist exclusively of JSX code
    <AnyMemoizedComponent onClick={viewModel.handleClick} />
  </div>
));`;

export default function HomePage() {
  return (
    <main>
      <div className="prose flex flex-col gap-8">
        {/* Hero Section */}
        <div className="relative px-4 pt-16 text-center">
          <div className="absolute inset-0 z-[-1]">
            <Gradient currentId={0} />
          </div>
          <Image
            alt="React MVVM - Modern MVVM architecture for React applications"
            className="mx-auto mb-4 h-44 w-44"
            src={logo}
            width={176}
          />
          <h1 className="mb-4 font-bold text-5xl text-white">React MVVM</h1>
          <p className="mx-auto max-w-2xl text-white text-xl">
            Transform your React development with clean MVVM architecture and
            MobX state management
          </p>
          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              href="https://www.npmjs.com/package/react-mvvm"
              rel="noopener"
              target="_blank"
            >
              <Image
                alt="NPM version badge"
                height={20}
                src="https://img.shields.io/npm/v/react-mvvm"
                style={{ width: "auto" }}
                width={0}
              />
            </Link>
            <Image
              alt="Bundle size badge"
              height={20}
              src="https://raw.githubusercontent.com/beautyfree/react-mvvm/master/badges/weight.svg"
              style={{ width: "auto" }}
              width={0}
            />
            <Link
              href="https://github.com/beautyfree/react-mvvm/blob/main/LICENSE"
              rel="noopener"
              target="_blank"
            >
              <Image
                alt="License badge"
                height={20}
                src="https://img.shields.io/npm/l/react-mvvm"
                style={{ width: "auto" }}
                width={0}
              />
            </Link>
            {/* <Image
            alt="Test coverage badge"
            height={20}
            src="https://raw.githubusercontent.com/beautyfree/react-mvvm/master/badges/coverage-jest%20coverage.svg"
            width={120}
          /> */}
          </div>
        </div>

        <div className="container mx-auto divide-y px-5 pb-32">
          {/* Description */}
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-lg text-muted-foreground">
              React MVVM is a library which simplifies the usage of MobX with
              React by applying MVVM pattern. With this package you can create
              views and view models and keep the logic and presentation
              separately.
            </p>
            <p className="text-lg text-muted-foreground">
              The library allows you to form a strict approach to development,
              as well as simplify the development process by taking into account
              the proposed approach.
            </p>
          </div>

          {/* Features */}
          <Cards className="py-6">
            <Card title="Effortlessly Simple">
              Master React MVVM in minutes, not hours. With just 2 functions and
              1 abstract class, you'll be building better apps immediately.
            </Card>
            <Card title="TypeScript First">
              Built for modern development. Enjoy full TypeScript support with
              intelligent autocomplete, type safety, and enhanced developer
              experience.
            </Card>
            <Card title="Lightweight">
              The size of the library is less than 1.6 Kb.
            </Card>
            <Card title="Easy to extend">
              The library allows you to create easily extensible and scalable
              applications.
            </Card>
          </Cards>

          {/* Code Examples */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg">
                Achieve perfect separation of concerns - keep your business
                logic clean and your UI focused
              </h3>
              <CodeBlock code={separatedExample} lang="tsx" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg">
                Replace complex Context API patterns with elegant, type-safe
                view models
              </h3>
              <CodeBlock code={contextExample} lang="tsx" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg">
                Eliminate hook complexity and embrace declarative component
                architecture
              </h3>
              <CodeBlock code={hooksExample} lang="tsx" />
            </div>
          </div>

          {/* Flexibility */}
          <Callout title="It's very flexible!" type="info">
            <p>
              React MVVM depends on several packages, but you are free to choose
              any recent version of these packages.
            </p>
            <p>
              For{" "}
              <code className="rounded-sm border border-primary/40 px-1">
                react
              </code>{" "}
              the available versions are <strong>16, 17, 18 and 19</strong>.
            </p>
            <p>
              For{" "}
              <code className="rounded-sm border border-primary/40 px-1">
                mobx-react
              </code>{" "}
              the available versions are <strong>6 and 7</strong>.
            </p>
            <p>
              For{" "}
              <code className="rounded-sm border border-primary/40 px-1">
                mobx-react-lite
              </code>{" "}
              the available versions are <strong>3 and 4</strong> (recommended
              for most cases).
            </p>
            <p>
              For{" "}
              <code className="rounded-sm border border-primary/40 px-1">
                mobx
              </code>{" "}
              the available versions are <strong>4, 5 and 6</strong>. But,
              please, see the{" "}
              <Link
                className="text-primary underline"
                href="/docs/getting-started"
              >
                Getting started
              </Link>{" "}
              section before using the 4<sup>th</sup> or 5<sup>th</sup>{" "}
              versions.
            </p>
          </Callout>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="font-bold text-2xl">
              Ready to Transform Your Development?
            </h3>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive{" "}
              <Link className="text-primary" href="/docs/examples">
                example gallery
              </Link>{" "}
              and discover{" "}
              <Link
                className="text-primary"
                href="https://github.com/beautyfree/react-mvvm/tree/main/examples"
              >
                real-world patterns
              </Link>{" "}
              that will accelerate your next project!
            </p>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-white text-sm no-underline ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              href="/docs/getting-started"
            >
              Start Building
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
