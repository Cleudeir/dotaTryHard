import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import orderTable from '../Math/orderTable';
import styles from './index.module.css';
import {useEffect} from 'react';
export default function TableAbility({data, type}) {
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
        if (data[key].count >= 0) {
          dataWithWinRate.push({
            url: `https://cdn.datdota.com/images/${type}/${key}.png`,
            name: key.split('_').join(' '),
            count: data[key].count,
            win: data[key].win,
            winRate: Math.floor(data[key].win/data[key].count*1000)/10,
          });
        }
      }
    }
    const dataSort = dataWithWinRate.sort(function(a, b) {
      if (a.count > b.count) {
        return -1;
      }
      if (a.count < b.count) {
        return 1;
      }
      return 0;
    });
    setData(dataSort.slice(0, 200));
    setSave(dataSort.slice(0, 200));
  }, [data]);
  return (
    isData && <div className={styles.container}>
      <Table className={styles.table} bordered striped={true}>
        <thead>
          <tr>
            <th>ico</th>
            <th>
              <span>
                <Form.Control
                  className={styles.form}
                  type="text"
                  placeholder="name"
                  onChange={(e) => {
                    filterName(e.target.value);
                  }}
                />
              </span>
            </th>
            <th>
              <span onClick={(e) => orderTable('winRate', e, isSave, setData)}>
              winRate ↑
              </span>
            </th>
            <th>
              <span onClick={(e) => orderTable('count', e, isSave, setData)}>
              Matches ↑
              </span>
            </th>
          </tr>
        </thead>
        <tbody>{
          isData.map((player) =>(
            <tr key={player.name}>
              <td>
                <img
                  src={player.url}
                  alt={player.url}
                  onError={(e) => {
                    e.target.parentElement.parentElement.style.display = 'none';
                  }}
                />
              </td>
              <td>{player.name}</td>
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
