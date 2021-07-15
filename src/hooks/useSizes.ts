import { useTheme } from 'react-jss';

import { Theme } from 'src/types/styles';

export default function useSizes(
  defaultSize: string,
  breakpoints?: Record<string, string>,
): string {
  const theme: Theme = useTheme();

  const result = [];
  if (breakpoints) {
    Object.keys(breakpoints).forEach((breakpoint) => {
      const maxWidth = theme.screens[breakpoint];
      const imageSize = breakpoints[breakpoint];
      result.push(`(max-width: ${maxWidth}) ${imageSize}`);
    });
  }
  result.push(defaultSize);

  return result.join(', ');
}
