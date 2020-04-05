import { Component, Prop, State, Method, h } from '@stencil/core';

@Component({
  tag: 'quick-toast',
  styleUrl: 'quick-toast.css',
  shadow: true
})

export class PizzaToast {
  timer = null

  @State() title: string = ''
  @State() message: string = ''
  @State() isShow: boolean = false

  @Prop() time: number = 3000
  @Prop() autoHidden: boolean = false
  @Prop() noCloseButton: boolean = false
  @Prop() closeButtonText: string = 'Close'

  @Method() show(
    {title, message, time} = {title: '', message: '', time: undefined}
  ): Promise<void> {
    if (this.isShow) return Promise.resolve()
    this.isShow = true
    this.title = title ? title : ''
    this.message = message ? message : ''

    if (this.autoHidden) {
      this.timer = setTimeout (() => {
        if (this.isShow) {
          this.hide()
          this.timer = null
        }
      }, time || this.time)
    }

    return Promise.resolve()
  }

  @Method() hide(): Promise<void> {
    this.isShow = false
    clearTimeout()
    this.timer = null
    return Promise.resolve()
  }

  render() {
    let rootStateClassAttr: string = ''

    if (this.isShow) {
      rootStateClassAttr += ' --show'
    }

    return <div class={`PizzaToast${rootStateClassAttr}`}>
      <div class="PizzaToast__inner">
        <h2 class="PizzaToast__title">{this.title}</h2>
        <p class="PizzaToast__message">{this.message}</p>
      </div>
      <button
        class="PizzaToast__close"
        type="button"
        title={this.closeButtonText}
        onClick={(): void => {this.hide()}}
      >{this.closeButtonText}</button>
    </div>;
  }
}
