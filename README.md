# tweento.js - WORK IN PROGRESS

Animation library based on CSS animations.

The main idea is to provide a simple API to animating elements with CSS properties that recieve callbacks useful for performing various actions.

## Usage

```js
import tweento from 'tweento';

const element = document.querySelector('#element');

const twn = tweento(element, {
	/**
	 * Class name or object with valid css properties
	 * e.g 'classname' or { width: '300px', color: red }
	 *
	 * @default null
	 */
	to: null,

	/**
	 * Defines whether the transition should be started immediately after calling the function
	 *
	 * @default false
	 */
	paused: false,

	onStart: () => {
		console.log('onStart');
	},
	onTransitionStart: () => {
		console.log('onTransitionStart');
	},
	onTransitionEnd: () => {
		console.log('onTransitionEnd');
	},
});

// if `paused: false`, the method is not available
twn.start();
```

## License

[MIT](LICENSE) © [Przemysław Tyczyński](https://tyczynski.pl)
