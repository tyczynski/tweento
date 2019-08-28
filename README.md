# tweento.js - WORK IN PROGRESS

Animation library based on CSS animations.

The main idea is to provide a simple API to animating elements with CSS properties that recieve callbacks useful for performing various actions.

## Usage

```js
import tweento from 'tweento';

const element = document.querySelector('#element');

const twn = tweento(element, {
  // only valid css values
  css: {
    color: '#ff0',
    width: '250px',
    height: '250px',
    transition: '0.3s ease',
    transitionDelay: '1s',
  },
  paused: true // default false
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

twn.start(); // if paused: false, the method is not available
```

## License

[MIT](LICENSE) © [Przemysław Tyczyński](https://tyczynski.pl)
