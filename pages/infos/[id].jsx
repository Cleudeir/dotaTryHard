/* eslint-disable no-nested-ternary */
import Header from '../../component/Header';
import TeamGamed from '../../component/TeamGamed';
import {useEffect, useState} from 'react';
const React = require('react');

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const {id} = context.params;
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/infos?account_id=${id}`);
  const data = await resp.json();
  return {
    props: {data},
    revalidate: 24*60*60,
  };
}

export default function Matches({data}) {
  console.log(data);
  const [useSreen, setScreen] = useState(false);
  useEffect(()=>{
    setScreen(window.screen.width);
  }, []);
  return (
    useSreen && <>
      <Header />
      <div style={useSreen<580?{}:{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <TeamGamed type={'See Your Win Rate with your friends'} data={data.alliesPlayers.slice(0, 100)}/>
        <TeamGamed type={'See Your Loss Rate with your enemies'} data={data.enemyPlayers.slice(0, 100)}/>
      </div>
    </>
  );
}
