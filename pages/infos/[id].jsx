/* eslint-disable no-nested-ternary */
import Header from '../../component/Header';
import TeamGamed from '../../component/TeamGamed';
import {useEffect, useState} from 'react';
const React = require('react');
import Accordion from 'react-bootstrap/Accordion';
import mathInfos from '../../component/Math/infos';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const {id} = context.params;
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/infos?account_id=${id}&limit=100`);
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
      console.log('{ playersMatches, _matchIds }: ', {playersMatches, _matchIds});

      if (playersMatches && _matchIds) {
        mathInfos({playersMatches, _matchIds, account_id})
            .then((_infos)=> setInfos(_infos));
      }
    })();
  }, [data]);
  if (!infos) {
    return (
      <>
           Carregando!!!
      </>
    );
  }
  if (infos) {
    return (
      <>
        <Header />
        <div style={{display: 'flex', flexDirection: 'column', maxWidth: 600, marginTop: 90, marginLeft: 'auto', marginRight: 'auto'}}>
          <h2 style={{marginLeft: 'auto', marginRight: 'auto'}}>Hello! {infos.profile.personaname}</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>See Your Win Rate with your friends</Accordion.Header>
              <Accordion.Body style={{whiteSpace: 'nowrap', textAlign: 'center', width: '100%', margin: 0, padding: 0}}>
                <TeamGamed type={'See Your Win Rate with your friends'} data={infos.alliesPlayers.slice(0, 100)} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>See Your Loss Rate with your enemies</Accordion.Header>
              <Accordion.Body style={{whiteSpace: 'nowrap', textAlign: 'center', width: '100%', margin: 0, padding: 0}}>
                <TeamGamed type={'See Your Loss Rate with your enemies'} data={infos.enemyPlayers.slice(0, 100)} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </>
    );
  }
}
