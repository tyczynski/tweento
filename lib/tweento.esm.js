/*!
 * @package tweento.js
 * @version v1.0.0
 * @author Przemysław Tyczyński | https://tyczynski.pl
 * @license MIT
 */
import calliffn from 'calliffn';

/** @const defaults default configuration object */
var defaults = {
	// Options
	to: {},
	paused: false,

	// Events
	onStart: null,
	onTransitionStart: null,
	onTransitionEnd: null,
};

/**
 * Tweento class
 *
 * @class
 */
class Tweento {
	/**
	 * @param {HTMLElement} element
	 * @param {Object} config
	 */
	constructor(element, config) {
		this.element = element;

		this.config = { ...defaults, ...config };
		this.state = {
			dirty: false,
		};

		this.transitionStart = this.transitionStart.bind(this);
		this.transitionEnd = this.transitionEnd.bind(this);

		if (!this.config.paused) {
			this.start();
		}
	}

	/**
	 * Method that starts the transition of the element
	 *
	 * @return {void}
	 */
	start() {
		if (this.state.dirty) return;
		this.state.dirty = true;

		calliffn(this.config.onStart);

		if (typeof this.config.to === 'object') {
			this.setStyles();
		} else {
			this.element.classList.add(this.config.to);
		}

		this.state.transitionsCount = getComputedStyle(this.element)
			.getPropertyValue('transition-duration')
			.split(',')
			.filter(item => item).length;

		this.bindEvents();
	}

	/**
	 * Bind `transitionend` and `transitionstart` event to the element
	 *
	 * @return {void}
	 */
	bindEvents() {
		this.element.addEventListener('transitionstart', this.transitionStart);
		this.element.addEventListener('transitionend', this.transitionEnd);
	}

	/**
	 * Set passed inline styles to the element
	 *
	 * @return {void}
	 */
	setStyles() {
		const { to } = this.config;

		for (const key in to) {
			if (Object.prototype.hasOwnProperty.call(to, key)) {
				this.element.style[key] = to[key];
			}
		}
	}

	/**
	 * Callback for the element 'transitionstart' event
	 *
	 * @return {void}
	 */
	transitionStart() {
		this.element.removeEventListener('transitionstart', this.transitionStart);
		calliffn(this.config.onTransitionStart);
	}

	/**
	 * Callback for the element 'transitionend' event
	 *
	 * @return {void}
	 */
	transitionEnd() {
		this.state.transitionsCount -= 1;
		const { transitionsCount } = this.state;

		if (transitionsCount === 0) {
			this.element.removeEventListener('transitionend', this.transitionEnd);
			calliffn(this.config.onTransitionEnd);
		}
	}
}

/**
 * @param {HTMLElement} element
 * @param {Object} config
 * @return {Tweento}
 */
function tweento(element, config = {}) {
	if (!(element instanceof HTMLElement)) {
		throw new Error('Passed element must be an HTMLElement instance.');
	}

	return new Tweento(element, config);
}

export default tweento;
