import React from 'react';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from './index.module.css';
function TableRanking({isData, filterName, order, setData, avgGlobal}) {
  function AvgCompare({player, type}) {
    const value =
      Math.floor(
          Number(((player[type] - avgGlobal[type]) / avgGlobal[type]) * 100) * 1,
      ) / 1;
    if (type === 'deaths') {
      if (value > 0) {
        return (
          <>
            <br />
            <span className={styles.negative}>+{value}%</span>{' '}
          </>
        );
      } else {
        return (
          <>
            <br /> <span className={styles.positive}>{value}%</span>
          </>
        );
      }
    }
    if (value > 0) {
      return (
        <>
          <br />
          <span className={styles.positive}>+{value}%</span>{' '}
        </>
      );
    } else {
      return (
        <>
          <br /> <span className={styles.negative}>{value}%</span>
        </>
      );
    }
  }
  return (
    <div className={styles.container}>
      <Table className={styles.table} bordered striped={true}>
        <thead>
          <tr>
            <th>
              <span onClick={(e) => order('pos', e)}>Pos ↑</span>
            </th>
            <th>
              Ico
            </th>
            <th>
              <Form.Control
                className={styles.form}
                type="text"
                placeholder="name"
                onChange={(e) => {
                  filterName(e.target.value);
                }}
              />
            </th>
            <th>
              <span onClick={(e) => order('rankingRate', e)}>Rate ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('matches', e)}>Matches ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('winRate', e)}>WinRate ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('kills', e)}>kills ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('deaths', e)}>Deaths ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('assists', e)}>Assis ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('last_hits', e)}>Lasts ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('denies', e)}>Denies ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('gold_per_min', e)}>GPM ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('xp_per_min', e)}>XPM ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('hero_damage', e)}>Hero ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('tower_damage', e)}>Tower ↓</span>
            </th>
            <th>
              <span onClick={(e) => order('hero_healing', e)}>Heal ↓</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {isData &&
            isData.map((player, i) => (
              <tr key={player.profile.account_id}>
                <td>{player.pos}</td>
                <td>
                  <img
                    src={player.profile.avatarfull}
                    alt={player.profile.account_id}
                  />
                </td>
                <td>{player.profile.personaname}</td>
                <td>{player.rankingRate} </td>
                <td>
                  <a
                    href={`/matches/${player.profile.account_id}`}
                    onClick={() => setData(false)}
                  >
                    {player.matches} 👀
                  </a>
                </td>
                <td>
                  <a
                    href={`/infos/${player.profile.account_id}`}
                    onClick={() => setData(false)}
                  >
                    {player.winRate.toFixed(1)}% 👀
                  </a>
                </td>
                <td>
                  {player.kills.toFixed(1)}{' '}
                  <AvgCompare player={player} type={'kills'} />
                </td>
                <td>
                  {player.deaths.toFixed(1)}{' '}
                  <AvgCompare player={player} type={'deaths'} />{' '}
                </td>
                <td>
                  {player.assists.toFixed(1)}{' '}
                  <AvgCompare player={player} type={'assists'} />{' '}
                </td>
                <td>
                  {player.last_hits.toFixed(1)}
                  <AvgCompare player={player} type={'last_hits'} />{' '}
                </td>
                <td>
                  {player.denies.toFixed(1)}
                  <AvgCompare player={player} type={'denies'} />{' '}
                </td>
                <td>
                  {player.gold_per_min.toFixed(0)}{' '}
                  <AvgCompare player={player} type={'gold_per_min'} />{' '}
                </td>
                <td>
                  {player.xp_per_min.toFixed(0)}
                  <AvgCompare player={player} type={'xp_per_min'} />{' '}
                </td>
                <td>
                  {player.hero_damage.toFixed(0)}{' '}
                  <AvgCompare player={player} type={'hero_damage'} />{' '}
                </td>
                <td>
                  {player.tower_damage.toFixed(0)}{' '}
                  <AvgCompare player={player} type={'tower_damage'} />{' '}
                </td>
                <td>
                  {player.hero_healing.toFixed(0)}{' '}
                  <AvgCompare player={player} type={'hero_healing'} />{' '}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableRanking;
