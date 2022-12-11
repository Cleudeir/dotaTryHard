/* eslint-disable no-nested-ternary */
import Header from '../../component/Header';
import TeamGamed from '../../component/TeamGamed';
import { useEffect, useState } from 'react';
const React = require('react');
import Accordion from 'react-bootstrap/Accordion';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/infos?account_id=${id}`);
  const data = await resp.json();
  return {
    props: { data },
    revalidate: 24 * 60 * 60,
  };
}

export default function Matches({ data }) {
  console.log(data);
  const [useSreen, setScreen] = useState(false);
  useEffect(() => {
    setScreen(window.screen.width);
  }, []);
  return (
    useSreen && <>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 600, marginTop: 90, marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ marginLeft: 'auto', marginRight: 'auto' }}>Hello! {data.profile.personaname}</h2>
        <Accordion defaultActiveKey="0" style={{ width: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          <Accordion.Item eventKey="0" >
            <Accordion.Header>See Your Win Rate with your friends</Accordion.Header>
            <Accordion.Body style={{ whiteSpace: 'nowrap', textAlign: 'center', margin: 0, padding: 0 }}>
              <TeamGamed type={'See Your Win Rate with your friends'} data={data.alliesPlayers.slice(0, 100)} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>See Your Loss Rate with your enemies</Accordion.Header>
            <Accordion.Body style={{ whiteSpace: 'nowrap', textAlign: 'center', margin: 0, padding: 0 }}>
              <TeamGamed type={'See Your Loss Rate with your enemies'} data={data.enemyPlayers.slice(0, 100)} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
}
