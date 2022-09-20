/* eslint-disable no-nested-ternary */
import Header from '../../component/Header';
import CardCarousel from '../../component/CardCarousel';
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
  const resp = await fetch(`${process.env.backUrl}/player?account_id=${id}&limit=30`);
  const data = await resp.json();
  return {
    props: {data},
    revalidate: 1*60*60,
  };
}

export default function Matches({data}) {
  return (
    <div>
      <Header />
      <CardCarousel _match={data.matches} _avg={data.avg}/>
    </div>
  );
}
