/**
 * ChillwindIcons - Main Library Export
 * Dynamic Angular icon library with native Tailwind CSS support, tree-shakeable icon data, and built from Iconoir SVGs.
 */

// Main Icon Component
export { CwIcon } from './components/cw-icon/cw-icon.component';

// Icon Data Interface
export type { IconData } from './icons/icon-data.interface';

// TypeScript Types for Icon Names
export type { RegularIconName, SolidIconName, IconName, IconType, IconNameForType, IconSelection } from './icons/icon-types';

// Icon Data Objects
export * from './icons/regular';
export * from './icons/solid';

// Types and utilities for component props
import type { IconData } from './icons/icon-data.interface';

export interface ChillwindIconProps {
  icon?: IconData;
  size?: number | string;
  alt?: string | null;
  strokeWeight?: string;
  svgClass?: string;
}

export const CHILLWIND_ICON_SIZES = {
  xs: '0.75rem', sm: '1rem', md: '1.25rem', lg: '1.5rem', xl: '2rem', '2xl': '2.5rem', '3xl': '3rem',
  '3': '0.75rem', '4': '1rem', '5': '1.25rem', '6': '1.5rem', '7': '1.75rem', '8': '2rem', '10': '2.5rem', '12': '3rem', '16': '4rem', '20': '5rem', '24': '6rem'
} as const;

export type ChillwindIconSizeKey = keyof typeof CHILLWIND_ICON_SIZES;
export type ChillwindIconSizeValue = typeof CHILLWIND_ICON_SIZES[ChillwindIconSizeKey];
