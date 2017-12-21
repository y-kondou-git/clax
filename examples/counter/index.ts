import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as h from 'react-hyperscript'
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

const counterStore = new CounterStore


interface PropTypes {
  counterStore: CounterStore
}

class Counter extends React.Component<PropTypes> {
  render() {
    return h('div', [
      h('button', {onClick: () => this.props.counterStore.plus()}, '+'),
      h('span', {onClick: () => this.props.counterStore.plus2()}, this.props.counterStore.count.toString()),
      h('button', {onClick: () => this.props.counterStore.minus()}, '-')
    ])
  }
}

const ConnectedCounter = clax.connect(Counter, [counterStore])


ReactDOM.render(h(ConnectedCounter), document.querySelector('body > div'))