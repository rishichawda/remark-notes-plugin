import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Simple Integration',
    icon: '🔌',
    description: (
      <>
        Easy to integrate with any remark-based markdown processing pipeline,
        including Astro, Gatsby, and other static site generators.
      </>
    ),
  },
  {
    title: 'Multiple Note Types',
    icon: '🎨',
    description: (
      <>
        Supports 5 different note types - Note, Tip, Important, Quote, and Bonus - each with
        distinct styling for better content organization.
      </>
    ),
  },
  {
    title: 'Elegant Design',
    icon: '✨',
    description: (
      <>
        Transform plain blockquotes into beautifully styled note elements that enhance
        your content's readability and visual appeal.
      </>
    ),
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <div className={styles.featureIcon}>{icon}</div>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
