/* eslint-disable no-nested-ternary */
import Header from '../../component/Header';
import FriendsGamed from '../../component/FriendsGamed';
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
    revalidate: 1*60*60,
  };
}

export default function Matches({data}) {
  console.log(data);
  return (
    <div>
      <Header />
      <FriendsGamed friendsGamed={data.friendsGamed}/>
    </div>
  );
}
