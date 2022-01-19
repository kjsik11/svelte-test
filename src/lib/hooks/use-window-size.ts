import { writable } from 'svelte/store';

export enum BreakpointLevel {
  base = 0,
  sm = 1,
  md = 2,
  lg = 3,
  xl = 4,
  '2xl' = 5,
}

const BREAKPOINTS = [
  {
    name: 'base',
    minWidth: 0,
    level: BreakpointLevel.base,
  },
  {
    name: 'sm',
    minWidth: 640,
    level: BreakpointLevel.sm,
  },
  {
    name: 'md',
    minWidth: 768,
    level: BreakpointLevel.md,
  },
  {
    name: 'lg',
    minWidth: 1024,
    level: BreakpointLevel.lg,
  },
  {
    name: 'xl',
    minWidth: 1280,
    level: BreakpointLevel.xl,
  },
  {
    name: '2xl',
    minWidth: 1536,
    level: BreakpointLevel['2xl'],
  },
] as const;

export type Breakpoint = typeof BREAKPOINTS[number];

export function widthToBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINTS[5].minWidth) return BREAKPOINTS[5];
  if (width >= BREAKPOINTS[4].minWidth) return BREAKPOINTS[4];
  if (width >= BREAKPOINTS[3].minWidth) return BREAKPOINTS[3];
  if (width >= BREAKPOINTS[2].minWidth) return BREAKPOINTS[2];
  if (width >= BREAKPOINTS[1].minWidth) return BREAKPOINTS[1];
  return BREAKPOINTS[0];
}

export type WindowSizeStorage = {
  innerWidth: number;
  innerHeight: number;
  breakpoint: Breakpoint;
};

export const windowSizeStore = writable<WindowSizeStorage>({
  innerWidth: 0,
  innerHeight: 0,
  breakpoint: BREAKPOINTS[0],
});
