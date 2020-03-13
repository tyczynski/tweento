export interface Config {
  // Options
  to: CSSStyleDeclaration | string;
  paused?: boolean;

  // Events
  onStart?: Function | undefined | null;
  onTransitionStart?: Function | undefined | null;
  onTransitionEnd?: Function | undefined | null;
}

export interface State {
  dirty: boolean;
  transitionsCount: number;
}
