/* eslint-disable no-nested-ternary */
import Header from '../../component/Header';
import Head from 'next/head';
import {Table} from 'react-bootstrap';
import styles from './index.module.css';
import {unixToHMS} from '../../component/Math/unixToHMS';
import useMatches from '../../hook/useMatches';
import Pagination from 'react-bootstrap/Pagination';
const React = require('react');

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  };
}

const qnt = 50;

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
  const {colorWinStyle, objItemsUsed, objType} = useMatches();
  const [page, setPage] = React.useState(0);
  console.log(data);
  return (
    <div>
      <Head>
        <title>DotaTryHard</title>
        <meta name="description" content="DotaTryHard" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <div className={styles.containerAll}>
        <div>
          <h2>
            {data.avg.profile.personaname}, See the last {data.matches.length} Matches
          </h2>
        </div>
        <div>
          <div key={data.matches[page].match_id} className={styles.match}>
            <div className={styles.score}>
              <h3>MATCH SCORE</h3>
              <h4>
                RADIANT {data.matches[page].radiant_score} - {data.matches[page].dire_score} DIRE
              </h4>
              <h5>{unixToHMS(data.matches[page].start_time)}</h5>
            </div>
            <div className={styles.containerTable}>
              <Table className={styles.table} bordered striped={true}>
                <thead>
                  <tr>
                    <th>ico</th>
                    <th>Nick</th>
                    {objType.map((_item, idx) => (
                      <th key={idx}>{_item.name}</th>
                    ))}
                    <th colSpan="1">Hero</th>
                    <th colSpan="4">Skills</th>
                    <th colSpan="6">Items</th>
                    <th colSpan="3">Items used</th>
                  </tr>
                </thead>
                <tbody>
                  {data.matches[page].players
                      .sort(function(a, b) {
                        if (a.player_slot < b.player_slot) return -1;
                        if (a.player_slot > b.player_slot) return 1;
                        return 0;
                      })
                      .map((player) => (
                        <tr key={player.profile.account_id}>
                          <td className={player.leaver_status === 1 ? styles.avatarfullleave : styles.avatarfull}>
                            <img src={player.profile.avatarfull} alt={player.profile.account_id} />
                          </td>
                          <td style={colorWinStyle(player.win)}>{player.profile.personaname.slice(0, 15)}</td>
                          {objType.map((_item, idx) => (
                            <td key={idx} style={colorWinStyle(player.win)}>
                              {player[_item.type]}
                            </td>
                          ))}
                          <td className={styles.hero}>
                            <img src={`https://cdn.datdota.com/images/heroes/${player.hero_id}_full.png`} alt={''} />
                          </td>

                          {[0, 1, 2, 3].map((index) => (
                            <td key={index}>
                              <img src={`https://cdn.datdota.com/images/ability/${player[`ability_${index}`]}.png`} alt={''} />
                            </td>
                          ))}

                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <td key={index}>{+player[`item_${index}`] !== 0 && <img src={`https://cdn.datdota.com/images/items/${player[`item_${index}`]}.png`} alt={''} />}</td>
                          ))}

                          {objItemsUsed.map((_item) => (
                            <td key={_item}>
                              <img src={`https://cdn.datdota.com/images/items/${_item.img}.png`} alt={''} style={player[_item.name] === 0 ? {opacity: 0} : {filter: 'none'}} />
                            </td>
                          ))}
                        </tr>
                      ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination>
          <Pagination.First
            onClick={() => {
              setPage(0);
            }}
          />
          <Pagination.Prev
            onClick={() => {
              if (page > 0) {
                setPage((e) => e - 1);
              }
            }}
          />
          {[2, 1].map((index) => {
            if (page - index >= 0) {
              return (
                <Pagination.Item
                  key={index}
                  onClick={(e) => {
                    setPage(Number(e.target.innerHTML) - 1);
                  }}
                >
                  {page - index + 1}
                </Pagination.Item>
              );
            }
          })}
          <Pagination.Item active>{page + 1}</Pagination.Item>
          {[1, 2].map((index) => {
            if (index + page < data.matches.length) {
              return (
                <Pagination.Item
                  key={index}
                  onClick={(e) => {
                    setPage(Number(e.target.innerHTML) - 1);
                  }}
                >
                  {index + page + 1}
                </Pagination.Item>
              );
            }
          })}
          <Pagination.Next
            onClick={() => {
              if (page + 1 < data.matches.length) {
                setPage((e) => e + 1);
              }
            }}
          />
          <Pagination.Last
            onClick={() => {
              setPage(data.matches.length - 1);
            }}
          />
        </Pagination>
      </div>
    </div>
  );
}
