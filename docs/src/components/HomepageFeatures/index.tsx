import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: ReactNode;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple Integration',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor"/>
      </svg>
    ),
    description: (
      <>
        Drop into any remark-based pipeline. Works seamlessly with Astro, Next.js, 
        Gatsby, Docusaurus, and other static site generators.
      </>
    ),
  },
  {
    title: 'Five Note Types',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.9"/>
        <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" opacity="0.7"/>
        <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.8"/>
        <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor" opacity="0.6"/>
        <circle cx="7" cy="7" r="2" fill="white" opacity="0.3"/>
      </svg>
    ),
    description: (
      <>
        Note, Tip, Important, Quote, and Bonus - each with distinct styling 
        and semantic meaning for better content organization.
      </>
    ),
  },
  {
    title: 'Zero Configuration',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: (
      <>
        Works out of the box with automatic style injection. Customize with 
        optional configurations for advanced use cases.
      </>
    ),
  },
  {
    title: 'Fully Customizable',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="currentColor"/>
      </svg>
    ),
    description: (
      <>
        Override default styles, add custom class prefixes, and control style 
        injection for perfect integration with your design system.
      </>
    ),
  },
  {
    title: 'TypeScript Ready',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 8L8 16M12 10v6M16 12v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    description: (
      <>
        Full TypeScript support with exported types for options and note types. 
        Enjoy autocomplete and type safety in your editor.
      </>
    ),
  },
  {
    title: 'MDX Compatible',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h7l-7 16h7M20 4h-7l7 16h-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    description: (
      <>
        Seamlessly works with MDX files. Transform your markdown notes without 
        worrying about compatibility issues.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
          <p className={styles.featureDescription}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.featuresTitle}>
            Why Choose Remark Notes?
          </Heading>
          <p className={styles.featuresSubtitle}>
            Everything you need to create beautiful documentation
          </p>
        </div>
        <div className="row" style={{gap: '20px 0'}}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
