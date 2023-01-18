import styles from './ranking.module.css';
import Header from '../component/Header';
import TableRanking from '../component/TableRanking';
import Container from '../component/Container';
import Head from 'next/head';
import useRanking from './../hook/useRanking';

const React = require('react');

export async function getStaticProps() {
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/ranking?limit=1000`);
  const data = await resp.json();
  const regionsNames = ['WORLD', 'SOUTH AMERICA', 'NORTH AMERICA', 'EUROPE', 'CHINA'];
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
  const {filterRegion, isData, setData, filterName, order, isRegion} = useRanking({regionData});

  return (
    <div className={styles.container}>
      <Head>
        <title>DotaTryHard</title>
        <meta name="description" content="DotaTryHard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header filterRegion={filterRegion} />
      <Container isLoading={Boolean(isData)}>
        <h2> {regionsNames[isRegion]} </h2>
        <TableRanking
          isData={isData}
          filterName={filterName}
          order={order}
          setData={setData}
        />
      </Container>
    </div>
  );
}
