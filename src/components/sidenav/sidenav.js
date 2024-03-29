'use client';

import React, { useEffect, useState } from 'react';
import styles from './sidenav.module.css';
import { slugify } from '@/lib/utils';
import ScrollProgress from './scrollprogress/scrollProgressIndicator';

function TableOfContents({ headings }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300 && !isVisible) {
        setIsVisible(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  return (
    <aside className={`${styles.sidenav} text-sm`}>
      <ScrollProgress />
      <div
        className={`${styles.sidenav_contents} sm:hidden xl:flex xl:flex-col ${
          isVisible ? styles.animate : ''
        } `}
      >
        {/* <div>{headings.length ? <h3>Table of Contents</h3> : null}</div> */}

        <nav className=" ml-[1.4rem] mb-[1.4rem] max-w-[220px] rounded-lg">
          <ul>
            {headings.map((heading, index) => (
              <li
                key={index}
                className={`${styles.tocItem} ${
                  isVisible ? styles.fadeIn : ''
                } hover:bg-[var(--text-color-primary-100)] text-[var(--text-color-primary-800)] hover:text-yellow-600 rounded-lg transition-colors duration-300 ease-in-out`}
                style={{
                  marginLeft: `${heading.depth - 2}em`,
                  lineHeight: 1.5,
                  letterSpacing: '0.3px',
                  //marginBottom: `${heading.depth === 2 ? '20px' : '16px'}`,
                  paddingTop: `${heading.depth === 2 ? '10px' : '8px'}`,
                  paddingBottom: `${heading.depth === 2 ? '10px' : '8px'}`,
                  paddingLeft: `${heading.depth === 2 ? '10px' : '8px'}`,

                  animationDelay: `${0.5 + index * 0.5}s`,
                }}
              >
                <a href={`#${slugify(heading.id)}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default TableOfContents;
