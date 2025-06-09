import type { IconData } from '../../icon-data.interface';

/**
 * @category shapes
 * @type regular
 * @name Circle
 */
export const circleRegularIconData: IconData = {
  name: 'circle',
  type: 'regular',
  category: 'shapes',
  viewBox: '0 0 24 24',
  innerSvg: `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10" fill="none"/>`,
  defaultStrokeWidth: '1.5',
};
