/* eslint-disable no-nested-ternary */
import Header from '../../component/Header';
import TableInfos from '../../component/TableInfos/index.js';
import {useEffect, useState} from 'react';
const React = require('react');
import styles from './[id].module.css';
import mathInfos from '../../component/Math/infos';
import ContainerRow from './../../component/ContainerRow/index';
import Container from './../../component/Container/index';
import Head from 'next/head';
import TableAbility from '../../component/TableInfoAbilityItems';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const {id} = context.params;
  const resp = await fetch(`${process.env.backUrl}/infos?account_id=${id}&limit=700`);
  const data = await resp.json();
  return {
    props: {data, account_id: Number(id)},
    revalidate: 15 * 60 * 60,
  };
}

export default function Matches({data, account_id}) {
  const [infos, setInfos] = useState(false);

  useEffect(() => {
    (async () => {
      const {playersMatches, _matchIds} = data;
      if (playersMatches && _matchIds) {
        mathInfos({playersMatches, _matchIds, account_id})
            .then((_infos)=> {
              setInfos(_infos);
            });
      }
    })();
  }, [data]);

  if (infos) {
    return (
      <div className={styles.container}>
        <Head>
          <title>DotaTryHard</title>
          <meta name="description" content="DotaTryHard" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Header />
        <Container isLoading={Boolean(infos)}>
          <h3>Hello! {infos.profile.personaname}</h3>
          <ContainerRow>
            <Container>
              <h4>Friends</h4>
              <TableInfos type={'Win'} data={infos.alliesPlayers} />
            </Container>
            <Container>
              <h4>Enemies</h4>
              <TableInfos type={'Loss'} data={infos.enemyPlayers} />
            </Container>
            <Container>
              <h4>Ability picks</h4>
              <TableAbility type={'ability'} data={infos.uniqueInfosAbility} />
            </Container>
            <Container>
              <h4>Purchased items</h4>
              <TableAbility type={'items'} data={infos.uniqueInfosItem} />
            </Container>
            <Container>
              <h4>Purchased items used</h4>
              <TableAbility type={'items'} data={infos.uniqueInfosItemUsed} />
            </Container>
          </ContainerRow>
        </Container>
      </div>
    );
  }
}
