import styles from './index.module.css';
import Header from '../component/Header';
import {useEffect, useState} from 'react';
import Tables from '../component/Tables';

const React = require('react');


export async function getStaticProps() {
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/ranking?limit=400`);
  const data = (await resp.json());
  const regionsNames = ['WORLD', 'SOUTH AMERICA', 'NORTH AMERICA', 'EUROPE', 'CHINA'];
  const regionData = [];
  for (let i = 0; i < regionsNames.length; i++) {
    const element = regionsNames[i];
    if (element !== 'WORLD') {
      const filter = data.filter((item)=> item.profile.loccountrycode === element);
      regionData.push(filter);
    } else {
      regionData.push(data);
    }
  }

  return {
    props: {regionData, regionsNames},
    revalidate: 10 * 60,
  };
}

export default function Home({regionData, regionsNames}) {
  const [useRegion, setRegion] = useState(false);
  useEffect(()=>{
    console.log('data: ', regionData, regionData[useRegion]);
    setRegion(1);
  }, []);

  function filterRegion(region) {
    console.log(region);
    setRegion(false);
    setTimeout(() => {
      setRegion(region);
    }, 1000);
  }
  return (
    <div className={styles.container} >
      <Header filterRegion={filterRegion} />
      <h1 style={{margin: 'auto', padding: 5}}>{regionsNames[useRegion]}</h1>
      <main>
        {useRegion !== false &&
        <Tables _matches={regionData[useRegion]} number={50}/>
        }
      </main>
    </div>
  );
}
