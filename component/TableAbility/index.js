import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import orderTable from '../Math/orderTable';
import styles from './index.module.css';
import {useEffect} from 'react';
export default function TableAbility({data}) {
  const [isData, setData] = useState(null);
  const [isSave, setSave] = useState(data);
  function filterName(e) {
    if (isSave) setData(isSave.filter((x) => x.name.toUpperCase().includes(e.toUpperCase())));
  }
  useEffect(() => {
    if (!data) {
      return;
    }
    const dataWithWinRate = [];
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        if (key.includes('vecteezy')) {
          continue;
        }
        const name = key.replace('https://cdn.datdota.com/images/ability/', '').replace('.png', '').split('_').join(' ');
        if (data[key].count > 1) {
          dataWithWinRate.push({
            url: key,
            name,
            count: data[key].count,
            win: data[key].win,
            winRate: Math.floor(data[key].win/data[key].count*1000)/10,
          });
        }
      }
    }
    const dataSort = dataWithWinRate.sort(function(a, b) {
      if (a.winRate > b.winRate) {
        return -1;
      }
      if (a.winRate < b.winRate) {
        return 1;
      }
      return 0;
    });
    setData(dataSort.slice(0, 300));
    setSave(dataSort.slice(0, 300));
  }, [data]);
  return (
    isData && <div className={styles.container}>
      <Table className={styles.table} bordered striped={true}>
        <thead>
          <tr>
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
            <th>ico</th>
            <th onClick={(e) => orderTable({type: 'winRate', e, isData, setData})}>winRate ↑</th>
            <th onClick={(e) => orderTable({type: 'count', e, isData, setData})}>Matches ↑</th>
          </tr>
        </thead>
        <tbody>{
          isData.map((player) =>(
            <tr key={player.name}>
              <td>{player.name}</td>
              <td>
                <img
                  src={player.url}
                  alt={player.url}
                  onError={(e) => {
                    e.target.parentElement.parentElement.style.display = 'none';
                  }}
                />
              </td>
              <td>{player.winRate}%</td>
              <td>{player.count}</td>
            </tr>
          ),
          )
        }</tbody>
      </Table>
    </div>
  );
}
