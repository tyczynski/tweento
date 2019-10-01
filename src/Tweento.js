import calliffn from 'calliffn';

import defaults from './defaults';

/**
 * Tweento class
 *
 * @class
 */
export default class Tweento {
	/**
	 * @param {HTMLElement} element
	 * @param {Object} config
	 */
	constructor(element, config) {
		this.element = element;

		this.config = { ...defaults, ...config };

		this.state = {
			transitionStartCount: 0,
			dirty: false,
		};

		this.transitionStart = this.transitionStart.bind(this);
		this.transitionEnd = this.transitionEnd.bind(this);

		this.bindEvents();

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
		const { to } = this.config;

		if (this.state.dirty) return;
		this.state.dirty = true;

		calliffn(this.config.onStart);

		this.bindEvents();

		if (typeof to === 'object') {
			this.setStyles();
		} else {
			this.element.classList.add(to);
		}

		const tranitionDuration = getComputedStyle(this.element).getPropertyValue(
			'transition-duration',
		);
		this.state.transitionEndCount = tranitionDuration.split(',').filter(item => item).length;
	}

	/**
	 * Bind 'transitionend' and 'transitionstart' event to the element
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
		this.state.transitionStartCount += 1;

		if (this.state.transitionStartCount === 1) {
			this.element.removeEventListener('transitionstart', this.transitionStart);

			calliffn(this.config.onTransitionStart);
		}
	}

	/**
	 * Callback for the element 'transitionend' event
	 *
	 * @return {void}
	 */
	transitionEnd() {
		this.state.transitionEndCount -= 1;

		if (this.state.transitionEndCount === 0) {
			this.element.removeEventListener('transitionend', this.transitionEndCount);

			calliffn(this.config.onTransitionEnd);
		}
	}
}
