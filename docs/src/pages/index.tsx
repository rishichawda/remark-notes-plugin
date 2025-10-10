import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
// import GitHubRepo from '@site/src/components/GitHubRepo';
import Heading from '@theme/Heading';

import styles from './index.module.css';
import 'remark-notes-plugin/styles.css';

// Import the SVG logo
import Logo from '@site/static/img/logo.svg';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.logoContainer}>
            <Logo className={styles.heroLogo} role="img" aria-label="Remark Notes Plugin Logo" />
          </div>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <p className={styles.heroDescription}>
            A powerful remark plugin that transforms simple markdown blockquotes into beautiful, 
            professional note components. Perfect for documentation, blogs, and technical writing.
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button button--lg', styles.buttonPrimary)}
              to="/docs/intro">
              Get Started →
            </Link>
            <Link
              className={clsx('button button--outline button--lg', styles.buttonSecondary)}
              href="https://github.com/rishichawda/remark-notes-plugin">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" style={{marginRight: '8px'}}>
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              GitHub
            </Link>
          </div>
          <div className={styles.quickStart}>
            <code className={styles.installCommand}>npm install remark-notes-plugin</code>
          </div>
        </div>
      </div>
    </header>
  );
}

function LiveDemo() {
  return (
    <section className={styles.demoSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          See It In Action
        </Heading>
        <p className={styles.sectionSubtitle}>
          Five beautiful note types to enhance your content
        </p>
        <div className={styles.demoGrid}>
          <div className={styles.demoColumn}>
            <h3 className={styles.demoHeading}>Markdown Input</h3>
            <pre className={styles.demoCode}>
              {`> [!note]
> Perfect for general information
> and helpful context.

> [!tip]
> Share best practices and
> pro tips with your readers.

> [!important]
> Highlight critical information
> that demands attention.

> [!quote]
> Showcase quotes and
> testimonials beautifully.

> [!bonus]
> Add extra value with
> advanced techniques.`}
            </pre>
          </div>
          <div className={styles.demoColumn}>
            <h3 className={styles.demoHeading}>Rendered Output</h3>
            <div className={styles.demoNotes}>
              <blockquote className="remark-note remark-note-note">
                <div className="remark-note-header">
                  <span className="remark-note-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 11H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 16H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="remark-note-title">note</span>
                </div>
                <div className="remark-note-content">
                  <p>Perfect for general information and helpful context.</p>
                </div>
              </blockquote>

              <blockquote className="remark-note remark-note-tip">
                <div className="remark-note-header">
                  <span className="remark-note-icon">
                    <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.0006 9.03002C19.0007 8.10058 18.8158 7.18037 18.4565 6.32317C18.0972 5.46598 17.5709 4.68895 16.9081 4.03734C16.2453 3.38574 15.4594 2.87265 14.5962 2.52801C13.7331 2.18336 12.8099 2.01409 11.8806 2.03002C10.0966 2.08307 8.39798 2.80604 7.12302 4.05504C5.84807 5.30405 5.0903 6.98746 5.00059 8.77001C4.95795 9.9595 5.21931 11.1402 5.75999 12.2006C6.30067 13.2609 7.10281 14.1659 8.09058 14.83C8.36897 15.011 8.59791 15.2584 8.75678 15.5499C8.91565 15.8415 8.99945 16.168 9.00059 16.5V18.03H15.0006V16.5C15.0006 16.1689 15.0829 15.843 15.24 15.5515C15.3971 15.26 15.6241 15.0121 15.9006 14.83C16.8528 14.1911 17.6336 13.328 18.1741 12.3167C18.7147 11.3054 18.9985 10.1767 19.0006 9.03002Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M11.9901 5.64001L10.3301 8.41998C10.2549 8.54184 10.2138 8.68167 10.2111 8.82483C10.2084 8.96799 10.2441 9.10925 10.3146 9.23389C10.3851 9.35852 10.4877 9.46195 10.6118 9.53339C10.7359 9.60482 10.8769 9.64165 11.0201 9.64001H13.0201C13.1617 9.63947 13.301 9.67657 13.4237 9.7475C13.5463 9.81843 13.6479 9.92063 13.7181 10.0437C13.7883 10.1668 13.8245 10.3063 13.8231 10.4479C13.8217 10.5896 13.7827 10.7283 13.7101 10.85L12.0301 13.64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="remark-note-title">tip</span>
                </div>
                <div className="remark-note-content">
                  <p>Share best practices and pro tips with your readers.</p>
                </div>
              </blockquote>

              <blockquote className="remark-note remark-note-important">
                <div className="remark-note-header">
                  <span className="remark-note-icon">
                    <svg viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9,14a1.5,1.5,0,1,1,1.5068-1.5A1.5035,1.5035,0,0,1,9,14Z"/>
                      <path d="M9,2A7,7,0,1,1,2,9,7.0079,7.0079,0,0,1,9,2M9,0a9,9,0,1,0,9,9A9,9,0,0,0,9,0Z"/>
                      <path d="M10,4H8a1,1,0,0,0-.97,1.2425l1,4a1,1,0,0,0,1.94,0l1-4A1,1,0,0,0,10,4Zm0,2h0Z"/>
                    </svg>
                  </span>
                  <span className="remark-note-title">important</span>
                </div>
                <div className="remark-note-content">
                  <p>Highlight critical information that demands attention.</p>
                </div>
              </blockquote>

              <blockquote className="remark-note remark-note-quote">
                <div className="remark-note-header">
                  <span className="remark-note-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 15V14C14 13.0681 14 12.6022 14.1522 12.2346C14.3552 11.7446 14.7446 11.3552 15.2346 11.1522C15.6022 11 16.0681 11 17 11H17.5C18.9045 11 19.6067 11 20.1111 11.3371C20.3295 11.483 20.517 11.6705 20.6629 11.8889C21 12.3933 21 13.0955 21 14.5V15.3431C21 16.1606 21 16.5694 20.8478 16.9369C20.6955 17.3045 20.4065 17.5935 19.8284 18.1716L19.2396 18.7604C18.7822 19.2178 18 18.8938 18 18.2469V17.8787C18 17.3934 17.6066 17 17.1213 17H16C14.8954 17 14 16.1046 14 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                      <path d="M3 9V8C3 7.06812 3 6.60218 3.15224 6.23463C3.35523 5.74458 3.74458 5.35523 4.23463 5.15224C4.60218 5 5.06812 5 6 5H6.5C7.90446 5 8.60669 5 9.11114 5.33706C9.32952 5.48298 9.51702 5.67048 9.66294 5.88886C10 6.39331 10 7.09554 10 8.5V9.34315C10 10.1606 10 10.5694 9.84776 10.9369C9.69552 11.3045 9.40649 11.5935 8.82843 12.1716L8.23965 12.7604C7.78219 13.2178 7 12.8938 7 12.2469V11.8787C7 11.3934 6.6066 11 6.12132 11H5C3.89543 11 3 10.1046 3 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="remark-note-title">quote</span>
                </div>
                <div className="remark-note-content">
                  <p>Showcase quotes and testimonials beautifully.</p>
                </div>
              </blockquote>

              <blockquote className="remark-note remark-note-bonus">
                <div className="remark-note-header">
                  <span className="remark-note-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.23163 8.61762C7.26389 9.06284 6.28001 9.28545 6.04594 10.0382C5.81186 10.7909 6.4826 11.5753 7.82408 13.1439L8.17113 13.5498C8.55234 13.9955 8.74294 14.2184 8.82869 14.4942C8.91444 14.7699 8.88562 15.0673 8.82799 15.662L8.77552 16.2035C8.5727 18.2965 8.4713 19.343 9.08412 19.8082C9.69694 20.2734 10.6181 19.8492 12.4605 19.0009L12.9372 18.7815C13.4607 18.5404 13.7225 18.4199 14 18.4199C14.2775 18.4199 14.5393 18.5404 15.0628 18.7815L15.5395 19.0009C17.3819 19.8492 18.3031 20.2734 18.9159 19.8082C19.5287 19.343 19.4273 18.2965 19.2245 16.2035M20.1759 13.1439C21.5174 11.5753 22.1881 10.7909 21.9541 10.0382C21.72 9.28545 20.7361 9.06284 18.7684 8.61762L18.2593 8.50244C17.7001 8.37592 17.4205 8.31266 17.196 8.14225C16.9716 7.97183 16.8276 7.71355 16.5396 7.19699L16.2775 6.7267C15.2641 4.9089 14.7575 4 14 4C13.2425 4 12.7359 4.9089 11.7225 6.7267" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span className="remark-note-title">bonus</span>
                </div>
                <div className="remark-note-content">
                  <p>Add extra value with advanced techniques.</p>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="A powerful remark plugin that transforms markdown blockquotes into beautiful, professional note components">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        {/* <LiveDemo /> */}
        {/* <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <GitHubRepo owner="rishichawda" repo="remark-notes-plugin" />
            </div>
          </div>
        </div> */}
      </main>
    </Layout>
  );
}
