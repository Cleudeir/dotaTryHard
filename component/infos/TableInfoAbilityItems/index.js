import React, {useState, useEffect} from 'react';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from './index.module.css';
import orderTable from '../../Math/orderTable';

export default function TableAbility({data, type}) {
  const [filteredData, setFilteredData] = useState(null);
  const [originalData, setOriginalData] = useState(data);

  function handleFilter(e) {
    if (originalData) {
      setFilteredData(originalData.filter((item) => item.name.toUpperCase().includes(e.target.value.toUpperCase())));
    }
  }

  useEffect(() => {
    if (data) {
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
              winRate: Math.floor((data[key].win / data[key].count) * 1000) / 10,
            });
          }
        }
      }
      const sortedData = dataWithWinRate.sort((a, b) => b.count - a.count);
      setOriginalData(sortedData.slice(0, 200));
      setFilteredData(sortedData.slice(0, 200));
    }
  }, [data, type]);

  return (
    filteredData && (
      <div className={styles.container}>
        <Table className={styles.table} bordered striped>
          <thead>
            <tr>
              <th>Icon</th>
              <th>
                <span>
                  <Form.Control className={styles.form} type="text" placeholder="Name" onChange={handleFilter} />
                </span>
              </th>
              <th>
                <span onClick={() => orderTable('winRate', setOriginalData, setFilteredData, originalData)}>Win Rate ↑</span>
              </th>
              <th>
                <span onClick={() => orderTable('count', setOriginalData, setFilteredData, originalData)}>Matches ↑</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((player) => (
              <tr key={player.name}>
                <td>
                  <img
                    src={player.url}
                    alt={player.name}
                    onError={(e) => {
                      e.target.parentElement.parentElement.style.display = 'none';
                    }}
                  />
                </td>
                <td>{player.name}</td>
                <td>{player.winRate}%</td>
                <td>{player.count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  );
}
