import styles from './index.module.css';
import Header from '../component/Header';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Tables from '../component/Tables';

const React = require('react');


export async function getStaticProps() {
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/ranking`);
  const data = await resp.json();
  return {
    props: {data},
    revalidate: 10 * 60,
  };
}

export default function Home({data}) {
  const router = useRouter();
  console.log(router.query);


  const [useData, setData] = useState(false);

  useEffect(()=>{
    if (router.query.region) {
      const filter = data.filter((item)=>item.profile.loccountrycode === router.query.region.toLocaleUpperCase().replace('_', ' '));
      console.log(filter);
      if (filter.length > 0 ) {
        setData(filter);
      } else {
        setData(false);
      }
    } else {
      setData(data);
      console.log(data);
    }
  }, [router]);
  return (
    <div className={styles.container} >
      <Header />
      <h1 style={{margin: 'auto', padding: 5}}>{router.query.region?router.query.region.toLocaleUpperCase().replace('_', ' '):'WORLD'}</h1>
      {useData && <main>
        <span>
          <Tables _matches={useData} number={50}/>
        </span>
      </main>}
      {!useData && <h4 style={{margin: 'auto', padding: 30}}>nenhum jogador encontrado!</h4>}
    </div>
  );
}
