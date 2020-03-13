import Tweento from './Tweento';
import { Config } from './types';

export default function tweento(element: HTMLElement, config: Config): Tweento {
  return new Tweento(element, config);
}
