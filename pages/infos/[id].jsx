/* eslint-disable no-nested-ternary */
import Header from '../../component/Header';
import TeamGamed from '../../component/TeamGamed';
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
  const resp = await fetch(`${process.env.backUrl}/player?account_id=${id}`);
  const data = await resp.json();
  return {
    props: {data},
    revalidate: 24*60*60,
  };
}

export default function Matches({data}) {
  console.log(data);
  return (
    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
      <Header />
      <TeamGamed type={'See Your win Rate with your friends'} data={data.alliesPlayers.slice(0, 100)}/>
      <TeamGamed type={'See Your loss Rate with your enemies'} data={data.enemyPlayers.slice(0, 100)}/>
    </div>
  );
}
