import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import Image from "next/image";
import Link from "next/link";

const separatedExample = `import { action, makeObservable, observable } from 'mobx';
import { view, ViewModel, configure } from 'react-mvvm';

configure({
  vmFactory: VM => {
    const viewModel = new VM();
    makeObservable(viewModel);
    return viewModel;
  },
});

class CounterViewModel extends ViewModel {
  @observable counter = 0;

  @action increase = () => {
    this.counter++;
  }
}

const Counter = view(CounterViewModel)(({ viewModel }) => (
  <div>
    <span>Counter: {viewModel.counter}</span>
    <button onClick={() => viewModel.increase()}>Update</button>
  </div>
))`;

const contextExample = `import React, { FC } from 'react';
import { view, childView } from 'react-mvvm';
import { SomeViewModel } from './path-to-view-model';

const SomeChildView = childView<SomeViewModel>()(({ viewModel }) => (
  <div>
    {/* You can use view models as context at any depth level inside a view */}
    <span>Counter: {viewModel.counter}</span>

    {/* You can also use view's props with a viewModel object, so there's no need to drill them */}
    <span>{viewModel.viewProps.prop1}</span>
  </div>
));

type Props = {
  prop1: number;
};

const SomeView = view(SomeViewModel)<Props>(({ viewModel, prop1 }) => (
  <div>
    {/* You can use view models as context */}
    <span>Counter: {viewModel.counter}</span>
    <span>Sum: {viewModel.counter + prop1}</span>
    <button onClick={() => viewModel.increase()}>Update</button>
    <SomeChildView />
  </div>
))`;

const hooksExample = `import { view, ViewModel } from 'react-mvvm';
import { AnyMemoizedComponent } from './AnyMemoizedComponent';

class SomeViewModel extends ViewModel {
  // This function can be used instead of
  //  useLayoutEffect(() => { ... }, []);
  protected onViewMountedSync() { }

  // This function can be used instead of
  //  useEffect(() => { ... }, []);
  protected onViewUnmounted() { }

  // This function can be used partially instead of
  //  useEffect(() => { ... });
  protected onViewUpdated() { }

  // Any function that created in a ViewModel is memoized,
  //  so you don't need to use useMemo or useCallback
  handleClick = () => { ... };
}

const SomeView = view(SomeViewModel)(({ viewModel }) => (
  <div>
    Thus, the view can start to consist exclusively of JSX code

    <AnyMemoizedComponent onClick={viewModel.handleClick} />
  </div>
));`;

export default function HomePage() {
  return (
    <main className="container mx-auto divide-y px-5 pb-32">
      <div className="flex flex-col gap-8">
        {/* Hero Section */}
        <div className="px-4 py-16 text-center">
          <h1 className="mb-4 font-bold text-5xl">React MVVM</h1>
          <p className="mx-auto mb-8 max-w-2xl text-muted-foreground text-xl">
            An implementation of MVVM for React applications with MobX
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              href="/docs/getting-started"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2">
          <Image
            alt="NPM version"
            src="https://img.shields.io/npm/v/react-mvvm"
          />
          <Image
            alt="EcmaScript 6"
            src="https://img.shields.io/badge/EcmaScript-v.6-blue"
          />
          <Image
            alt="Weight"
            src="https://raw.githubusercontent.com/beautyfree/react-mvvm/master/badges/weight.svg"
          />
          <Image
            alt="License"
            src="https://img.shields.io/npm/l/react-mvvm"
          />
          <Image
            alt="Vulnerabilities"
            src="https://img.shields.io/snyk/vulnerabilities/npm/react-mvvm?label=Vulnerabilities"
          />
          <Image
            alt="Coverage"
            src="https://raw.githubusercontent.com/beautyfree/react-mvvm/master/badges/coverage-jest%20coverage.svg"
          />
          <Image
            alt="Build"
            src="https://github.com/beautyfree/react-mvvm/actions/workflows/build.yml/badge.svg"
          />
        </div>

        {/* Description */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-lg text-muted-foreground">
            React MVVM is a library which simplifies the usage of MobX with React
            by applying MVVM pattern. With this package you can create views and
            view models and keep the logic and presentation separately.
          </p>
          <p className="text-lg text-muted-foreground">
            The library allows you to form a strict approach to development, as
            well as simplify the development process by taking into account the
            proposed approach.
          </p>
        </div>

        {/* Features */}
        <Cards>
          <Card title="Simple to use">
            There's literally 2 functions and 1 abstract class in this packages.
            So, it won't be difficult for you to learn it.
          </Card>
          <Card title="Well typed">
            The library not only can be easily used with TypeScript, it is
            actually recommended for use with TypeScript!
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
              You can easily separate your business logic and user interface
              controls
            </h3>
            <DynamicCodeBlock code={separatedExample} lang="tsx" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg">
              You can use it instead of React Context API
            </h3>
            <DynamicCodeBlock code={contextExample} lang="tsx" />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg">You can get rid of hooks</h3>
            <DynamicCodeBlock code={hooksExample} lang="tsx" />
          </div>
        </div>

        {/* Flexibility */}
        <Callout title="It's very flexible!" type="info">
          <p className="mb-2">
            React MVVM depends on several packages, but you are free to choose
            any recent version of these packages.
          </p>
          <p className="mb-2">
            For{" "}
            <code className="rounded-sm border border-primary/40 px-1">
              react
            </code>{" "}
            the available versions are <strong>16, 17 and 18</strong>.
          </p>
          <p className="mb-2">
            For{" "}
            <code className="rounded-sm border border-primary/40 px-1">
              mobx-react
            </code>{" "}
            the available versions are <strong>6 and 7</strong>.
          </p>
          <p>
            For{" "}
            <code className="rounded-sm border border-primary/40 px-1">
              mobx
            </code>{" "}
            the available versions are <strong>4, 5 and 6</strong>. But, please,
            see the{" "}
            <Link
              className="text-primary underline"
              href="/docs/getting-started"
            >
              Getting started
            </Link>{" "}
            section before using the 4<sup>th</sup> or 5<sup>th</sup> versions.
          </p>
        </Callout>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="mb-4 font-bold text-2xl">And there's more!</h3>
          <p className="mb-6 text-lg text-muted-foreground">
            You can check the{" "}
            <Link
              className="text-primary hover:underline"
              href="/docs/examples"
            >
              examples page
            </Link>{" "}
            and see some other{" "}
            <Link
              className="text-primary hover:underline"
              href="/docs/examples/useful-examples"
            >
              useful cases
            </Link>
            !
          </p>
          <Link
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            href="/docs/getting-started"
          >
            Start Building
          </Link>
        </div>
      </div>
    </main>
  );
}
