import Head from 'next/head';
import styles from './index.module.css';
import React from 'react';
import Header from '../Header';
import Link from 'next/link';

export default function Container({filterRegion, isLoading, children}) {
  if (isLoading === undefined) {
    isLoading = true;
  }
  if (!isLoading) {
    return (
      <div className={styles.container}>
        <img className={styles.img} src={'https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif'} />
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Head>
          <title>DotaTryHard</title>
          <meta name="description" content="DotaTryHard" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header filterRegion={filterRegion} />
        {children}
        <footer className={styles.footer}>
          <h6>Copyright 2022</h6>
          <Link href="https://github.com/Cleudeir" passHref>
            <a href="replace">
              <img width={30} src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="git" />
              by Avatar
            </a>
          </Link>
        </footer>
      </div>
    );
  }
}
