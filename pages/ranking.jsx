import styles from '../styles/ranking.module.css';
import Header from '../component/Header';
import {useEffect, useState} from 'react';
import TableRanking from '../component/TableRanking';
import Container from '../component/Container';
import Head from 'next/head';

const React = require('react');

export async function getStaticProps() {
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/ranking?limit=1000`);
  const data = await resp.json();
  const regionsNames = ['WORLD', 'SOUTH AMERICA', 'NORTH AMERICA', 'EUROPE', 'CHINA', 'unknown'];
  const regionData = [];
  for (let i = 0; i < regionsNames.length; i++) {
    const element = regionsNames[i];
    if (element !== 'WORLD') {
      const filter = data.filter((item) => item.profile.loccountrycode === element);
      regionData.push(filter);
    } else {
      regionData.push(data);
    }
  }
  return {
    props: {regionData, regionsNames},
    revalidate: 4 * 60 * 60,
  };
}

export default function Home({regionData, regionsNames}) {
  const [useRegion, setRegion] = useState(1);
  const [useData, setData] = useState(false);
  useEffect(() => {
    console.log('data: ', regionData, regionData[useRegion]);
    setData(regionData[useRegion].slice(0, 300));
  }, []);

  function filterRegion(region) {
    setData(regionData[region].slice(0, 30).map((x, i) => ({...x, pos: i + 1})));
    setRegion(region);
    setTimeout(() => {
      setData(
          regionData[region].slice(0, 300).map((x, i) => ({...x, pos: i + 1})),
      );
    }, 1000);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>DotaTryHard</title>
        <meta name="description" content="DotaTryHard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header filterRegion={filterRegion} />
      <Container isLoading={Boolean(useData)}>
        <h1> {regionsNames[useRegion]} </h1>
        <TableRanking
          className={styles.table}
          useSave={regionData[useRegion]}
          useData={useData}
          setData={setData}
        />
      </Container>
    </div>
  );
}
