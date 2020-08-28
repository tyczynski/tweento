import calliffn from 'calliffn';
import { Config, State } from './types';
import defaults from './defaults';

export default class Tweento {
  private element: HTMLElement;
  private config: Config;
  private state: State;

  constructor(element: HTMLElement, config: Config) {
    this.element = element;

    this.config = { ...defaults, ...config };
    this.state = {
      dirty: false,
      transitionsCount: 0,
    };

    this.transitionStart = this.transitionStart.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this);

    if (!this.config.paused) {
      this.start();
    }
  }

  /**
   * Method that starts the transition of the element
   */
  public start() {
    if (this.state.dirty) return;
    this.state.dirty = true;

    calliffn(this.config.onStart);

    if (typeof this.config.to === 'object') {
      this.setStyles();
    } else {
      const method = this.config.to.charAt(0) === '!' ? 'remove' : 'add';
      const className = method === 'remove' ? this.config.to.substring(1) : this.config.to;
      this.element.classList[method](className);
    }

    this.state.transitionsCount = getComputedStyle(this.element)
      .getPropertyValue('transition-duration')
      .split(',')
      .filter((item) => item).length;

    this.bindEvents();
  }

  /**
   * Bind `transitionend` and `transitionstart` event to the element
   */
  private bindEvents() {
    this.element.addEventListener('transitionstart', this.transitionStart);
    this.element.addEventListener('transitionend', this.transitionEnd);
  }

  /**
   * Set passed inline styles to the element
   */
  private setStyles() {
    const to = this.config.to as CSSStyleDeclaration;

    for (const key in to) {
      if (Object.prototype.hasOwnProperty.call(to, key)) {
        this.element.style[key] = to[key];
      }
    }
  }

  /**
   * Callback for the element 'transitionstart' event
   */
  private transitionStart() {
    this.element.removeEventListener('transitionstart', this.transitionStart);
    calliffn(this.config.onTransitionStart);
  }

  /**
   * Callback for the element 'transitionend' event
   */
  private transitionEnd() {
    this.state.transitionsCount -= 1;
    const { transitionsCount } = this.state;

    if (transitionsCount === 0) {
      this.element.removeEventListener('transitionend', this.transitionEnd);
      calliffn(this.config.onTransitionEnd);
    }
  }
}
