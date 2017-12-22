import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as clax from '../../lib/index'


class CounterStore {
  count = 0

  plus() {
    this.count += 1
  }

  minus() {
    this.count -= 1
  }

  async plus2() {
    this.plus()
    await new Promise(resolve => setTimeout(resolve, 1000))
    this.plus()
  }
}


interface PropTypes {
  counterStore: CounterStore
}

class Counter extends React.Component<PropTypes> {
  render() {
    return <div>
      <button onClick={() => this.props.counterStore.plus()}>+</button>
      <span onClick={() => this.props.counterStore.plus2()}>{this.props.counterStore.count}</span>
      <button onClick={() => this.props.counterStore.minus()}>-</button>
    </div>
  }
}

const ConnectedCounter = clax.connect(Counter, [CounterStore])


ReactDOM.render(<ConnectedCounter/>, document.querySelector('body > div'))
