import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import Demo from './../components/demo'

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Home `}
      description="useForm provides a way to create complex forms easily, this hook returns an object of values ​​in the same shape that it receives."
      >
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/get-starter')}>
              Get Started
            </Link>
          </div>
            <div style={{margin:30}}>
              <a href="https://github.com/Jucian0/useform/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/Jucian0/useform"/> </a>
              <a href="https://bundlephobia.com/result?p=useforms@1.0.3"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/useforms"/> </a>
              <a href="https://bundlephobia.com/result?p=useforms@1.0.3"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/useforms"/> </a>
              <a href="https://github.com/Jucian0/useform"><img alt="GitHub stars" src="https://img.shields.io/github/stars/jucian0/useform?style=social"/> </a>
              <a href="https://github.com/Jucian0/useform"><img alt="GitHub forks" src="https://img.shields.io/github/forks/jucian0/useform?style=social"/> </a>
            </div>
        </div>
      </header>
      <main>
          <section className={styles.features}>
            <div className="container">
                <Demo/>
            </div>
          </section>
      </main>
    </Layout>
  );
}

export default Home;
