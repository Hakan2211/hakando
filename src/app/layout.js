import './globals.css';
import { BLOG_TITLE, BLOG_DESCRIPTION } from '@/lib/constants';
import { GeistSans } from 'geist/font/sans';

import Header from '@/components/header/header';
import { cookies } from 'next/headers';
import {
  COLOR_THEME_COOKIE_NAME,
  DARK_TOKENS,
  LIGHT_TOKENS,
} from '@/lib/constants';

export const metadata = {
  title: { BLOG_TITLE },
  description: { BLOG_DESCRIPTION },
};

export default function RootLayout({ children }) {
  const savedTheme = cookies().get(COLOR_THEME_COOKIE_NAME);
  const theme = savedTheme?.value || 'light';

  return (
    <html
      lang="en"
      // data-color-theme={theme}
      style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
