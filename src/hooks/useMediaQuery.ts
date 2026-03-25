'use client';

import { useCallback, useEffect, useState } from 'react';

function useMediaQueryMatch(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

export function useMediaQuery() {
  const isMobile = useMediaQueryMatch('(max-width: 767px)');
  const isTablet = useMediaQueryMatch('(min-width: 768px) and (max-width: 1023px)');
  const isDesktop = useMediaQueryMatch('(min-width: 1024px)');

  const getBreakpoint = useCallback((): 'mobile' | 'tablet' | 'desktop' => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  }, [isMobile, isTablet]);

  return {
    isMobile,
    isTablet,
    isDesktop,
    breakpoint: getBreakpoint(),
  };
}
