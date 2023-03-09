/* eslint-disable no-nested-ternary */
import Header from '../../component/Header';
import Head from 'next/head';
import TableMatches from '../../component/TableMatches';
const React = require('react');

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  };
}

const qnt = 30;

export async function getStaticProps(context) {
  const {id} = context.params;
  const resp = await fetch(`${process.env.backUrl}/player?account_id=${id}&limit=${qnt}`);
  const data = await resp.json();
  return {
    props: {data},
    revalidate: 1 * 60 * 60,
  };
}

export default function Matches({data}) {
  return (
    <div>
      <Head>
        <title>DotaTryHard</title>
        <meta name="description" content="DotaTryHard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <TableMatches _match={data.matches.slice(0, qnt)} qnt={qnt} _avg={data.avg} />
    </div>
  );
}
