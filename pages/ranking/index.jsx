import styles from './index.module.css';
import Container from '../../component/Container';
import React from 'react';
import {Form, Table} from 'react-bootstrap';
import useRanking from '../../hook/useRanking';

export async function getStaticProps() {
  console.log('getStatic - Home: ');
  const resp = await fetch(`${process.env.backUrl}/ranking?limit=2000`);
  const {data, avgGlobal} = await resp.json();
  const regionsNames = ['WORLD', 'SOUTH AMERICA', 'NORTH AMERICA', 'EUROPE', 'CHINA'];
  const regionData = [];
  for (let i = 0; i < regionsNames.length; i++) {
    const element = regionsNames[i];
    if (element !== 'WORLD') {
      const filter = data.filter((item) => item.profile.loccountrycode === element);
      regionData.push(filter);
    } else {
      regionData.push(data);
    }
  }
  return {
    props: {regionData, regionsNames, avgGlobal},
    revalidate: 10 * 60,
  };
}

export default function Home({regionData, regionsNames, avgGlobal}) {
  const {filterRegion, objType, isData, setData, filterName, order, isRegion} = useRanking({regionData});
  console.log(isData);
  return (
    <Container filterRegion={filterRegion} isLoading={Boolean(isData)}>
      <h2> {regionsNames[isRegion]} </h2>
      <h5> Welcome to the ability Draft Rankings, recently {Math.floor(avgGlobal.matches / 10).toLocaleString('pt-BR')} saved Matches </h5>
      <div className={styles.containerTable}>
        <Table className={styles.table} bordered striped={true}>
          <thead>
            <tr>
              <th>
                <span onClick={(e) => order('pos', e)}>Pos ↑</span>
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
              isData.map((player, i) => (
                <tr key={player.profile.account_id}>
                  <td>{player.pos - 1}</td>
                  <td>
                    <img src={player.profile.avatarfull} alt={player.profile.account_id} />
                  </td>
                  <td>{player.profile.personaname}</td>
                  <td>{player.rankingRate} </td>
                  <td>
                    <a href={`/matches/${player.profile.account_id}`} onClick={() => setData(false)}>
                      {player.matches} 👀
                    </a>
                  </td>
                  <td>
                    <a href={`/infos/${player.profile.account_id}`} onClick={() => setData(false)}>
                      {player.winRate.toFixed(1)}% 👀
                    </a>
                  </td>
                  {objType.slice(3, 13).map((_item, idx) => {
                    let value = Math.floor(((player[_item.type] - avgGlobal[_item.type]) / avgGlobal[_item.type]) * 100 * 10) / 10;
                    if (_item.type === 'deaths') {
                      value = value * -1;
                    }
                    const isPositive = value > 0;
                    return (
                      <td key={idx}>
                        {player[_item.type].toFixed(1)}
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
