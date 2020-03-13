import { Config, State } from './types';
export default class Tweento {
    element: HTMLElement;
    config: Config;
    state: State;
    constructor(element: HTMLElement, config: Config);
    private start;
    private bindEvents;
    private setStyles;
    private transitionStart;
    private transitionEnd;
}
