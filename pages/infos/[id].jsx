/* eslint-disable no-nested-ternary */
import {useEffect, useState} from 'react';
const React = require('react');
import styles from './id.module.css';
import mathInfos from '../../component/Math/infos';
import Container from './../../component/Container/index';
import TableInfos from '../../component/infos/TableInfos/index.js';
import TableAbility from '../../component/infos/TableInfoAbilityItems/index.js';

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
    revalidate: 1 * 60 * 60,
  };
}

export default function Matches({data, account_id}) {
  const [infos, setInfos] = useState(false);

  useEffect(() => {
    (async () => {
      const {playersMatches, _matchIds} = data;
      if (playersMatches && _matchIds) {
        mathInfos({playersMatches, _matchIds, account_id}).then((_infos) => {
          setInfos(_infos);
        });
      }
    })();
  }, [data]);

  if (infos) {
    return (
      <Container isLoading={Boolean(infos)}>
        <h3>Hello! {infos.profile.personaname}</h3>
        <div className={styles.containerRow}>
          <div>
            <h4>Friends</h4>

            <TableInfos type={'Win'} data={infos.alliesPlayers} />
          </div>
          <div>
            <h4>Enemies</h4>
            <TableInfos type={'Loss'} data={infos.enemyPlayers} />
          </div>
          <div>
            <h4>Ability picks</h4>
            <TableAbility type={'ability'} data={infos.uniqueInfosAbility} />
          </div>
          <div>
            <h4>Purchased items</h4>
            <TableAbility type={'items'} data={infos.uniqueInfosItem} />
          </div>
          <div>
            <h4>Purchased items used</h4>
            <TableAbility type={'items'} data={infos.uniqueInfosItemUsed} />
          </div>
        </div>
      </Container>
    );
  }
}
