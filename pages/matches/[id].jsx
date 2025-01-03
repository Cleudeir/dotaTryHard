/* eslint-disable no-nested-ternary */
import { Table } from 'react-bootstrap';
import styles from './index.module.css';
import useMatches from '../../component/matches/useMatches';
import PaginationBar from '../../component/matches/PaginationBar';
import { unixToHMS } from '../../utils/unixToHMS';
import Container from '../../component/commons/Container';
const React = require('react');

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // false or 'blocking'
  };
}



export async function getStaticProps(context) {
  const { id } = context.params;
  const resp = await fetch(`${process.env.backUrl}/player?account_id=${id}`);
  const data = await resp.json();
  return {
    props: { data },
    revalidate: 1 * 60,
  };
}

export default function Matches({ data }) {
  const { colorWinStyle, objItemsUsed, objType } = useMatches();
  const [page, setPage] = React.useState(0);
  return (
    <Container>
      <div className={styles.containerAll}>
        <div>
          <h3 className={styles.h3}>
            {data.avg.profile.personaname}, See the last {data.matches.length} Matches
          </h3>
        </div>
        <div>
          <div key={data.matches[page].match_id} className={styles.match}>
            <div className={styles.score}>
              <h3 className={styles.textHeader}>MATCH SCORE</h3>
              <h4 className={styles.textHeader}>
                RADIANT {data.matches[page].radiant_score} - {data.matches[page].dire_score} DIRE
              </h4>
              <h5 className={styles.textHeader}>{unixToHMS(data.matches[page].start_time)}</h5>
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
                    .sort(function (a, b) {
                      if (a.player_slot < b.player_slot) return -1;
                      if (a.player_slot > b.player_slot) return 1;
                      return 0;
                    })
                    .map((player, _index) => (
                      <tr key={player.account_id + _index}>
                        <td className={player.leaver_status === 1 ? styles.avatarfullleave : styles.avatarfull}>
                          <img src={player.avatarfull} alt={player.account_id} />
                        </td>
                        <td style={colorWinStyle(player.win)}>{player.personaname.slice(0, 15)}</td>
                        {objType.map((_item, index) => (
                          <td key={index + 'nick'} style={colorWinStyle(player.win)}>
                            {player[_item.type]}
                          </td>
                        ))}
                        <td className={styles.hero}>
                          <img src={`https://cdn.datdota.com/images/heroes/${player.hero_id}_full.png`} alt={''} />
                        </td>

                        {[0, 1, 2, 3].map((index) => (
                          <td key={index + 'ability'}>
                            <img src={`https://cdn.datdota.com/images/ability/${player[`ability_${index}`]}.png`} alt={''} />
                          </td>
                        ))}

                        {[0, 1, 2, 3, 4, 5].map((index) => (
                          <td key={index + 'items'}>{+player[`item_${index}`] !== 0 && <img src={`https://cdn.datdota.com/images/items/${player[`item_${index}`]}.png`} alt={''} />}</td>
                        ))}

                        {objItemsUsed.map((_item) => (
                          <td key={_item.name + 'itemsUsed'}>
                            <img src={`https://cdn.datdota.com/images/items/${_item.img}.png`} alt={''} style={player[_item.name] === 0 ? { opacity: 0 } : { filter: 'none' }} />
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
        <PaginationBar page={page} setPage={setPage} data={data} />
      </div>
    </Container>
  );
}
