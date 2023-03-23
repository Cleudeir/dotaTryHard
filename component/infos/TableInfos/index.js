import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import styles from './index.module.css';
import orderTable from '../../Math/orderTable';

export default function TableInfos({data, type}) {
  const [filteredData, setFilteredData] = useState(data);
  const [originalData] = useState(data);

  function handleFilterName(e) {
    const filteredName = e.target.value.toUpperCase();
    setFilteredData(originalData.filter((x) => x.profile.personaname.toUpperCase().includes(filteredName)));
  }

  return (
    <div className={styles.container}>
      <Table className={styles.table} bordered striped>
        <thead>
          <tr>
            <th>Icon</th>
            <th>
              <Form.Control className={styles.form} type="text" placeholder="Name" onChange={handleFilterName} />
            </th>
            <th>
              <span onClick={(e) => orderTable('winRate', e, filteredData, setFilteredData)}>{type.includes('Win') ? 'Win Rate ↓' : 'Loss Rate ↓'}</span>
            </th>
            <th>
              <span onClick={(e) => orderTable('matches', e, filteredData, setFilteredData)}>Matches ↓</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData &&
            filteredData.map((player) => (
              <tr key={player.profile.account_id}>
                <td>
                  <img src={player.profile.avatarfull} alt={player.profile.account_id} />
                </td>
                <td>{player.profile.personaname}</td>
                <td>{player.winRate.toFixed(1)}%</td>
                <td>{player.matches}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}
