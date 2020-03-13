'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var calliffn = _interopDefault(require('calliffn'));

var defaults = {
  to: {},
  paused: false,
  onStart: null,
  onTransitionStart: null,
  onTransitionEnd: null
};

class Tweento {
  constructor(element, config) {
    this.element = element;
    this.config = { ...defaults,
      ...config
    };
    this.state = {
      dirty: false,
      transitionsCount: 0
    };
    this.transitionStart = this.transitionStart.bind(this);
    this.transitionEnd = this.transitionEnd.bind(this);

    if (!this.config.paused) {
      this.start();
    }
  }

  start() {
    if (this.state.dirty) return;
    this.state.dirty = true;
    calliffn(this.config.onStart);

    if (typeof this.config.to === 'object') {
      this.setStyles();
    } else {
      this.element.classList.add(this.config.to);
    }

    this.state.transitionsCount = getComputedStyle(this.element).getPropertyValue('transition-duration').split(',').filter(item => item).length;
    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener('transitionstart', this.transitionStart);
    this.element.addEventListener('transitionend', this.transitionEnd);
  }

  setStyles() {
    const to = this.config.to;

    for (const key in to) {
      if (Object.prototype.hasOwnProperty.call(to, key)) {
        this.element.style[key] = to[key];
      }
    }
  }

  transitionStart() {
    this.element.removeEventListener('transitionstart', this.transitionStart);
    calliffn(this.config.onTransitionStart);
  }

  transitionEnd() {
    this.state.transitionsCount -= 1;
    const {
      transitionsCount
    } = this.state;

    if (transitionsCount === 0) {
      this.element.removeEventListener('transitionend', this.transitionEnd);
      calliffn(this.config.onTransitionEnd);
    }
  }

}

function tweento(element, config) {
  return new Tweento(element, config);
}

module.exports = tweento;
