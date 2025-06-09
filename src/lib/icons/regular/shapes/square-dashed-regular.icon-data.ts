import type { IconData } from '../../icon-data.interface';

/**
 * @category shapes
 * @type regular
 * @name Square Dashed
 */
export const squareDashedRegularIconData: IconData = {
  name: 'square-dashed',
  type: 'regular',
  category: 'shapes',
  viewBox: '0 0 24 24',
  innerSvg: `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M7 4H4v3M4 11v2M11 4h2M11 20h2M20 11v2M17 4h3v3M7 20H4v-3M17 20h3v-3" fill="none"/>`,
  defaultStrokeWidth: '1.5',
};
