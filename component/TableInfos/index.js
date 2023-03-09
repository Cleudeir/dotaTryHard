import React, {useState} from 'react';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import orderTable from '../Math/orderTable';
import styles from './index.module.css';
export default function TableInfos({data, type}) {
  const [isData, setData] = useState(data);
  const [isSave] = useState(data);
  function filterName(e) {
    if (isSave) setData(isSave.filter((x) => x.profile.personaname.slice(0, e.length).toUpperCase().includes(e.toUpperCase())));
  }

  return (
    <div className={styles.container} >
      <Table className={styles.table}
        bordered
        striped={true}
      >
        <thead>
          <tr>
            <th>
              ico
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
              <span onClick={(e) => orderTable('winRate', e, isData, setData)}>
                {type.includes('Win') ? 'WinRate ↓' : 'LossRate ↓'}
              </span>
            </th>
            <th>
              <span onClick={(e) => orderTable('matches', e, isData, setData)}>
                {'Matches ↓'}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {isData &&
              isData.map((player, i) => (
                <tr key={player.profile.account_id}>
                  <td>
                    <img src={player.profile.avatarfull} alt={player.profile.account_id} />
                  </td>
                  <td>{player.profile.personaname}</td>
                  <td>{player.winRate.toFixed(1)}% </td>
                  <td>{player.matches}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </div>
  );
}
