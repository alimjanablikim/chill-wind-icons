# Chill-Wind Icons

Dynamic Angular icon library with native Tailwind CSS support, tree-shakeable icon data, and built from Iconoir SVGs.

## Gallery
https://alimjanablikim.github.io/chill-wind-icons/

## Features

- 🎯 **Native Tailwind CSS Support** - Use standard Tailwind utilities for sizing, colors, and animations
- 🌲 **Tree-shakeable** - Only import the icons you use
- 🚀 **Performance optimized** - Built-in SVG sanitization caching
- 📱 **Fully responsive** - Works with all Tailwind breakpoints
- 🎨 **Dark mode ready** - Seamless integration with Tailwind's dark mode
- ♿ **Accessible** - Proper ARIA attributes and keyboard navigation
- 🔒 **Type-safe** - Full TypeScript support with literal types for all icon names

## Installation

```bash
npm install @chill-wind/icons
```

## Quick Start

```typescript
// Single icon import
import { CwIcon, checkRegularIconData } from '@chill-wind/icons';

// Multiple icons import
import { CwIcon, checkRegularIconData, userRegularIconData } from '@chill-wind/icons';

@Component({
  template: `
    <!-- Basic usage with Tailwind classes -->
    <cw-icon [icon]="checkIcon" class="w-6 h-6 text-green-500"></cw-icon>

    <!-- Multiple icons usage -->
    <cw-icon [icon]="checkIcon" class="w-5 h-5 text-green-600"></cw-icon>
    <cw-icon [icon]="userIcon" class="w-5 h-5 text-blue-600"></cw-icon>

    <!-- Responsive sizing -->
    <cw-icon [icon]="checkIcon" class="w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"></cw-icon>

    <!-- Dark mode support -->
    <cw-icon [icon]="checkIcon" class="text-gray-700 dark:text-gray-300"></cw-icon>

    <!-- Hover effects -->
    <cw-icon [icon]="checkIcon" class="hover:text-blue-600 hover:scale-110 transition-all"></cw-icon>

    <!-- Animations -->
    <cw-icon [icon]="checkIcon" class="animate-pulse"></cw-icon>
  `
})
export class MyComponent {
  checkIcon = checkRegularIconData;
  userIcon = userRegularIconData;
}
```

## Tailwind CSS Usage

The component is designed to work seamlessly with Tailwind CSS utilities:

### Sizing
```html
<!-- Tailwind size utilities -->
<cw-icon [icon]="icon" class="w-4 h-4"></cw-icon>     <!-- 16px -->
<cw-icon [icon]="icon" class="w-6 h-6"></cw-icon>     <!-- 24px -->
<cw-icon [icon]="icon" class="size-8"></cw-icon>      <!-- 32px (Tailwind 3.4+) -->

<!-- Arbitrary values -->
<cw-icon [icon]="icon" class="w-[18px] h-[18px]"></cw-icon>
```

### Colors
```html
<!-- Tailwind color utilities -->
<cw-icon [icon]="icon" class="text-blue-500"></cw-icon>
<cw-icon [icon]="icon" class="text-slate-700"></cw-icon>

<!-- Arbitrary colors using Tailwind CSS syntax -->
<!-- The component automatically detects and applies text-[#colorValue] as inline styles -->
<cw-icon [icon]="icon" class="text-[#1da1f2]"></cw-icon>
<cw-icon [icon]="icon" class="text-[#ff6b6b]"></cw-icon>
<cw-icon [icon]="icon" class="text-[#f505ed]"></cw-icon>
```

### Animations
```html
<!-- Built-in Tailwind animations -->
<cw-icon [icon]="icon" class="animate-spin"></cw-icon>
<cw-icon [icon]="icon" class="animate-pulse"></cw-icon>
<cw-icon [icon]="icon" class="animate-bounce"></cw-icon>
```

### Responsive Design
```html
<!-- Different sizes at different breakpoints -->
<cw-icon [icon]="icon" class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"></cw-icon>

<!-- Different colors for light/dark mode -->
<cw-icon [icon]="icon" class="text-gray-700 dark:text-gray-300"></cw-icon>
```

### Hover & Focus States
```html
<!-- Hover effects -->
<cw-icon [icon]="icon" class="hover:text-blue-600 transition-colors"></cw-icon>
<cw-icon [icon]="icon" class="hover:scale-110 transition-transform"></cw-icon>

<!-- Focus styles -->
<cw-icon [icon]="icon" class="focus:outline-none focus:ring-2 focus:ring-blue-500"></cw-icon>
```

## Component API

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| icon | IconData | undefined | The icon data object to render |
| size | number \| string | 24 | Size in pixels (overridden by Tailwind classes) |
| alt | string \| null | null | Accessibility label |
| strokeWeight | string | icon default | SVG stroke width |
| svgClass | string | '' | Additional classes for the SVG element |
| showFallback | boolean | true | Show fallback icon when data is missing |

## TypeScript Support

The library includes full TypeScript support with literal types for all icon names:

```typescript
import { IconName, RegularIconName, SolidIconName } from '@chill-wind/icons';

// Full type safety and autocomplete
const iconName: RegularIconName = 'check'; // ✅ Valid
const invalidName: RegularIconName = 'invalid'; // ❌ TypeScript error
```

## Available Icons

Total icons: 1671
- Regular: 1383 icons
- Solid: 288 icons

## License

MIT
