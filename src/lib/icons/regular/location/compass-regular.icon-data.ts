import type { IconData } from '../../icon-data.interface';

/**
 * @category location
 * @type regular
 * @name Compass
 */
export const compassRegularIconData: IconData = {
  name: 'compass',
  type: 'regular',
  category: 'location',
  viewBox: '0 0 24 24',
  innerSvg: `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M10.586 10.586 16.95 7.05l-3.536 6.364L7.05 16.95z" fill="none"/><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10" fill="none"/>`,
  defaultStrokeWidth: '1.5',
};
