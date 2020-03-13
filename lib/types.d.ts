export interface Config {
    to: CSSStyleDeclaration | string;
    paused?: boolean;
    onStart?: Function | undefined | null;
    onTransitionStart?: Function | undefined | null;
    onTransitionEnd?: Function | undefined | null;
}
export interface State {
    dirty: boolean;
    transitionsCount: number;
}
