import CardPlayer from '../component/CardPlayer';
import styles from './index.module.css';
import Header from '../component/Header';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

const React = require('react');


export async function getStaticProps() {
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/ranking`);
  const data = await resp.json();
  return {
    props: {data},
    revalidate: 24 * 60 * 60,
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
      <Header/>
      <h1 style={{margin: 'auto', padding: 5}}>{router.query.region?router.query.region.toLocaleUpperCase().replace('_', ' '):'WORLD'}</h1>
      {useData && <main>
        <span>
          <h2 className={styles.title}>Top 50</h2>
          <div className={styles.containerList} >

            <div className={styles.list_cards} >
              {useData.slice(0, 50).map((item, index)=>(<CardPlayer key={item.profile.personaname} index={index+1}item={item}/> ))}
            </div>
          </div>
        </span>
        {useData.length>50 &&(
          <span>
            <h2 className={styles.title}>Top 200</h2>
            <div className={styles.containerList} >
              <div className={styles.list_cards} >
                {useData.slice(50, 200).map((item, index)=>(<CardPlayer key={index} index={index+50}item={item}/> ))}
              </div>
            </div>
          </span>
        )}
        {useData.length>200 &&(
          <span>
            <h2 className={styles.title}>Top 400</h2>
            <div className={styles.containerList} >
              <div className={styles.list_cards} >
                {useData.slice(200, 400).map((item, index)=>(<CardPlayer key={index} index={index+200}item={item}/> ))}
              </div>
            </div>
          </span>
        )}
      </main>}
      {!useData && <h4 style={{margin: 'auto', padding: 30}}>nenhum jogador encontrado!</h4>}
    </div>
  );
}
