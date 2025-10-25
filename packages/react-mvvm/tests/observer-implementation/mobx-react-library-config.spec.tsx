import { configure, view, ViewModel } from 'react-mvvm'
import { render, screen, act } from '@testing-library/react'
import { configure as configureMobx, makeObservable, observable, action } from 'mobx'

configureMobx({
  enforceActions: 'never',
})

describe('MobX React Library Configuration', () => {
  class TestViewModel extends ViewModel {
    @observable count = 0

    constructor() {
      super()
      makeObservable(this)
    }

    @action increment = () => {
      this.count++
    }
  }

  const TestComponent = view(TestViewModel)(({ viewModel }) => (
    <div>
      <span data-testid="count">{viewModel.count}</span>
      <button data-testid="increment" onClick={viewModel.increment}>
        Increment
      </button>
    </div>
  ))

  beforeEach(() => {
    // Reset configuration to default
    configure({
      lite: false,
    })
  })

  test('should work with mobx-react when lite is false', () => {
    render(<TestComponent />)
    
    expect(screen.getByTestId('count').textContent).toBe('0')
    
    act(() => {
      screen.getByTestId('increment').click()
    })
    
    expect(screen.getByTestId('count').textContent).toBe('1')
  })

  test('should work with mobx-react-lite when lite is true', () => {
    configure({
      lite: true,
    })

    render(<TestComponent />)
    
    expect(screen.getByTestId('count').textContent).toBe('0')
    
    act(() => {
      screen.getByTestId('increment').click()
    })
    
    expect(screen.getByTestId('count').textContent).toBe('1')
  })
})
