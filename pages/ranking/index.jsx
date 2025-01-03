import styles from './index.module.css';
import React from 'react';
import { Form, Table } from 'react-bootstrap';
import Container from '../../component/commons/Container';
import useRanking from '../../component/ranking/useRanking';

export async function getStaticProps() {
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/api/PlayersMatches/average`);
  const { playersMatches, averages } = await resp.json();
  const regionsNames = playersMatches.map((x) => x.region);
  return {
    props: { playersMatches, regionsNames, avgGlobal: averages },
    revalidate: 1 * 60,
  };
}


export default function Home({ playersMatches, regionsNames, avgGlobal }) {

  const { filterRegion, objType, isData, setData, filterName, order, isRegion } = useRanking({ playersMatches });
  const { data, region } = avgGlobal.find(item => item.region === isRegion)
  return (
    <Container filterRegion={filterRegion} isLoading={Boolean(isData)}>
      <h4 className={styles.title}> {region} </h4>
      <h6 className={styles.subTitle}>   Welcome to the ability Draft Rankings, recently {Math.floor(avgGlobal.matches / 10).toLocaleString('pt-BR')} saved Matches </h6>
      <div className={styles.containerTable}>
        <Table className={styles.table} bordered striped={true}>
          <thead>
            <tr>
              <th>
                <span onClick={(e) => order('position', e)}>Pos ↓</span>
              </th>
              <th>Ico</th>
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
              {objType.map((_item, idx) => (
                <th key={idx}>{<span onClick={(e) => order(_item.type, e)}>{_item.name} ↓</span>}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isData &&
              isData.map((playerMatch, i) => (
                <tr key={playerMatch.account_id}>
                  <td>{playerMatch.position}</td>
                  <td>
                    <img src={playerMatch.player.avatarfull} alt={playerMatch.account_id} />
                  </td>
                  <td>{playerMatch.player.personaname}</td>
                  <td>{playerMatch.score} </td>
                  <td>
                    <a href={`/matches/${playerMatch.account_id}`} onClick={() => setData(false)}>
                      {playerMatch.matches} 👀
                    </a>
                  </td>
                  <td>
                    <a href={`/infos/${playerMatch.account_id}`} onClick={() => setData(false)}>
                      {playerMatch.win_rate.toFixed(1)}% 👀
                    </a>
                  </td>
                  {objType.slice(3, 13).map(({ type }, idx) => {
                    console.log(JSON.stringify(data, null, 2));
                    let value = Math.floor(((playerMatch[type] - data[type]) / data[type] * 100));
                    if (type === 'deaths') {
                      value = value * -1
                    }
                    const isPositive = value > 0;
                    return (
                      <td key={idx}>
                        {playerMatch[{ type }.type].toFixed(0)}
                        <br />
                        <span className={isPositive ? styles.positive : styles.negative}>{isPositive ? `+${value}%` : `${value}%`}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}
