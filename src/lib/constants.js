export const BLOG_TITLE = 'Hakan Bilgic';
export const BLOG_DESCRIPTION =
  'Personal blog of Hakan Bilgic. Hakan writes about neuroscience, stock market and psychology.';

export const COLOR_THEME_COOKIE_NAME = 'color-theme';

export const LIGHT_COLOR = {
  '--bg-color': '#f8fafc',
  '--text-color-primary-800': '#1e2936', // text-slate-800 all articles headline, mdx content and blogintro
  '--text-color-primary-900': '#0f172a', // text-slate-900 h1postslug year articles
  '--text-color-primary-700': '#334155', // timeline
  '--text-color-primary-600': '#475569', // text-slate-600 blogintro 2.section
  '--text-color-primary-500': '#64748b', // header gradient
  '--text-color-primary-400': '#94a3b8', // footer text
  '--text-color-primary-200': '#e2e8f0', // footer border-top
  '--text-color-primary-100': '#f1f5f9', // hover background
  '--text-color-secondary-700': '#374151', // text-gray-700 headline blogpost articles route hover is slate-100
  '--text-color-secondary-500': '#6b7280', // date articles route for a post and postslug date
  '--scroll-fill': '#a3a3a3',
  '--scroll-container': '#e5e7eb',
  '--background-topic-yellow': '#fef08a',
  '--background-topic-red': '#fecaca',
  '--background-topic-blue': '#bfdbfe',
};

export const DARK_COLOR = {
  '--bg-color': '#1a202c',
  '--text-color-primary-800': '#e2e8f0',
  '--text-color-primary-900': '#f1f5f9',
  '--text-color-primary-700': '#cbd5e1',
  '--text-color-primary-600': '#94a3b8',
  '--text-color-primary-500': '#64748b',
  '--text-color-primary-400': '#475569',
  '--text-color-primary-300': '#334155',
  '--text-color-primary-200': '#475569',
  '--text-color-primary-100': '#0f172a',
  '--text-color-secondary-700': '#d1d5db',
  '--text-color-secondary-500': '#a1a1aa',
  '--scroll-fill': '#475569',
  '--scroll-container': '#020617',
  '--background-topic-yellow': '#a16207',
  '--background-topic-red': '#450a0a',
  '--background-topic-blue': '#1e3a8a',
};
export const LIGHT_TOKENS = { ...LIGHT_COLOR };
export const DARK_TOKENS = { ...DARK_COLOR };
