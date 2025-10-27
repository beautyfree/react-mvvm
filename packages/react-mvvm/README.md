<p align="center">
  <img width="20%" src=".github/assets/logo.png" alt="react-mvvm" />
  <h1 align="center">react-mvvm</h1>
</p>
<p align="center">
An implementation of MVVM for React applications with MobX.
</p>
<div align="center">

[![NPM Version](https://badgen.net/npm/v/react-mvvm)](https://www.npmjs.com/package/react-mvvm)
[![Weight](https://raw.githubusercontent.com/beautyfree/react-mvvm/master/badges/weight.svg)](https://github.com/beautyfree/react-mvvm)
[![License](https://img.shields.io/npm/l/react-mvvm)](https://github.com/beautyfree/react-mvvm/blob/main/LICENSE)

</div>

> **Note**: This project is a fork of [@yoskutik/react-vvm](https://github.com/Yoskutik/react-vvm) by Yoskutik, adapted and maintained with additional features and improvements.

React MVVM is a library which simplifies the usage of MobX with React by applying MVVM pattern. With this
package you can create views and view models and keep the logic and presentation separately.

The library allows you to form a strict approach to development, as well as simplify the development
process by taking into account the proposed approach.

## Documentation

You can find the React MVVM documentation [on the website](https://beautyfree.github.io/react-mvvm/).

The documentation is divided into several sections:

- [Getting Started](https://beautyfree.github.io/react-mvvm/docs/getting-started)
- [Core Concepts](https://beautyfree.github.io/react-mvvm/docs/core-concepts)
- [Examples](https://beautyfree.github.io/react-mvvm/docs/examples)

### Installation

```bash
npm install react-mvvm mobx mobx-react-lite reflect-metadata
```

## Examples

Here is a short example to get you started:

```tsx
import { action, observable, makeObservable } from 'mobx'
import { view, ViewModel } from 'react-mvvm'

class CounterViewModel extends ViewModel {
  @observable count = 0

  constructor() {
    super()
    makeObservable(this)
  }

  @action increase = () => {
    this.count++
  }
}

const Counter = view(CounterViewModel)(({ viewModel }) => (
  <div>
    <span>Counter: {viewModel.count}</span>
    <button onClick={() => viewModel.increase()}>increase</button>
  </div>
))
```

### Or even simpler

You don't need to call `makeObservable` in each ViewModel,
if you [configure](https://beautyfree.github.io/react-mvvm/docs/examples/useful-examples#automatic-makeobservable)
this package.

```tsx
import { action, observable, makeObservable } from 'mobx'
import { view, ViewModel } from 'react-mvvm'

class CounterViewModel extends ViewModel {
  @observable count = 0

  // By the way, this function is automatially memoized,
  //  so you down need to use useMemo or useCallback
  @action handleClick = () => {
    this.count++
  }
}

const Counter = view(CounterViewModel)(({ viewModel }) => (
  <div>
    <span>Counter: {viewModel.count}</span>
    <button onClick={viewModel.handleClick}>increase</button>
  </div>
))
```

That's a basic counter example. The component consists of JSX code only. All the logic is declared
in the view model. This is a fairly short example. However, the larger the component becomes, the
better the benefits of the MVVM approach are seen.

We have several short examples [on the website](https://beautyfree.github.io/react-mvvm/docs/examples). And
also there are several
[full-fledged examples](https://github.com/beautyfree/react-mvvm/tree/master/examples)
of applications with React MVVM

### License

MIT
