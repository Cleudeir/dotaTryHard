import styles from './index.module.css';
import React from 'react';

export default function Container({isLoading, children}) {
  if ( !isLoading ) {
    return (
      <div className={styles.container}>
        <img className={styles.img}
          src={'https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif'}
        />
      </div>
    );
  }
  if ( isLoading ) {
    return (
      <div className={styles.container}>
        {children}
      </div>
    );
  }
}
