import styles from './index.module.css';
import Header from '../component/Header';
import {useEffect, useState} from 'react';
import Tables from '../component/Tables';

const React = require('react');


export async function getStaticProps() {
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/ranking?limit=500`);
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
    props: {regionData: regionData, regionsNames},
    revalidate: 10 * 60,
  };
}


export default function Home({regionData, regionsNames}) {
  const [useRegion, setRegion] = useState(1);
  const [useData, setData] = useState(false);
  const [useLoading, setLoading] = useState(false);

  useEffect(()=>{
    console.log('data: ', regionData, regionData[useRegion]);
    setData(regionData[useRegion]);
    setLoading(true);
  }, []);

  function filterRegion(region) {
    console.log(region);
    setData(regionData[region].slice(0, 30));
    setRegion(region);
    setTimeout(() => {
      setData(regionData[region]);
    }, 1000);
  }


  return (
    <div className={styles.container} >
      <Header filterRegion={filterRegion} />
      <main id="main" style={{padding: 5, minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
        { useLoading &&
        <>
          <h1 style={{marginLeft: 'auto', marginRight: 'auto', padding: 5}}>{regionsNames[useRegion]}</h1>
          <Tables useSave={regionData[useRegion]} useData={useData} setData={setData} setLoading={setLoading}/>
        </>
        }
        { !useLoading &&<img src={'https://i.pinimg.com/originals/cd/77/f3/cd77f35d8796025d03b5452d65269e9d.gif'} style={{margin: 'auto', filter: 'invert(1)'}}/>}
      </main>
    </div>
  );
}
