import styles from './index.module.css';
import Header from '../../component/Header';
import TableRanking from '../../component/TableRanking';
import Container from '../../component/Container';
import Head from 'next/head';
import useRanking from '../../hook/useRanking';
import Footer from '../../component/Footer';
import React from 'react';

export async function getStaticProps() {
  console.log( 'getStatic - Home: ' );
  const resp = await fetch( `${ process.env.backUrl }/ranking?limit=1000` );
  const {data, avgGlobal} = await resp.json();
  const regionsNames = [
    'WORLD',
    'SOUTH AMERICA',
    'NORTH AMERICA',
    'EUROPE',
    'CHINA',
  ];
  const regionData = [];
  for ( let i = 0; i < regionsNames.length; i++ ) {
    const element = regionsNames[i];
    if ( element !== 'WORLD' ) {
      const filter = data.filter(
          ( item ) => item.profile.loccountrycode === element,
      );
      regionData.push( filter );
    } else {
      regionData.push( data );
    }
  }
  return {
    props: {regionData, regionsNames, avgGlobal},
    revalidate: 10 * 60,
  };
}

export default function Home( {regionData, regionsNames, avgGlobal} ) {
  const {filterRegion, isData, setData, filterName, order, isRegion} =
    useRanking( {regionData} );

  return (
    <div className={ styles.container }>
      <Head>
        <title>DotaTryHard</title>
        <meta name="description" content="DotaTryHard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header filterRegion={ filterRegion } />
      <Container isLoading={ Boolean( isData ) }>
        <h2> { regionsNames[isRegion] } </h2>
        <h5> Welcome to the ability Draft Rankings, recently { Math.floor( avgGlobal.matches / 10 ).toLocaleString( 'pt-BR' ) } saved Matches </h5>
        <TableRanking
          isData={ isData }
          avgGlobal={ avgGlobal }
          filterName={ filterName }
          order={ order }
          setData={ setData }
        />
      </Container>
      <Footer />
    </div>
  );
}
