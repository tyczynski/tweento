import Tweento from './Tweento';

/**
 * @param {HTMLElement} element
 * @param {Object} config
 * @return {Tweento}
 */
export default function tweento(element, config = {}) {
	if (!(element instanceof HTMLElement)) {
		throw new Error('Passed element must be an HTMLElement instance.');
	}

	return new Tweento(element, config);
}
