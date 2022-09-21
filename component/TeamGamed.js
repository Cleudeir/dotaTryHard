import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import orderTable from './orderTable';

export default function FriendsGamed({data, type}) {
  const [useData, setData] = useState(data);
  const [useSave] = useState(data);
  const [useLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);


  function imageStyle(url) {
    return {margin: 0, padding: 0, backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'};
  }
  function ImageSize() {
    return (
      <div style={{margin: 0, padding: 0, width: 50, height: 50}}></div>
    );
  }

  function filterName(e) {
    if (useSave) setData(useSave.filter((x) => x.profile.personaname.slice(0, e.length).toUpperCase().includes(e.toUpperCase())));
  }

  return (

    <div >
      {!useLoading && <img src={'https://i.pinimg.com/originals/cd/77/f3/cd77f35d8796025d03b5452d65269e9d.gif'} style={{margin: 'auto', filter: 'invert(1)'}} />}
      {useLoading &&

        <Table bordered striped={true} style={{whiteSpace: 'nowrap', textAlign: 'center', margin: 0, padding: 0}}
          responsive={window.screen.width < 590 ? false : true}>
          <thead>
            <tr>
              <th>
                {useSave &&
                  <div style={{display: 'flex', flexDirection: 'row'}}>
                    <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('profile.personaname', e, useData, setData)}>Nick ↓</span>
                  </div>
                }
              </th>
              <th >
                {useSave && <div style={{display: 'flex', flexDirection: 'row'}}>
                  <Form.Control style={{display: 'flex', color: '#37e', width: 90, margin: 'auto', flexDirection: 'row', height: 25}} type='text' placeholder='search' onChange={(e) => {
                    filterName(e.target.value);
                  }} />
                </div>
                }
              </th>
              <th>
                <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('win', e, useData, setData)}>{type.includes('Win') ? 'Win ↓' : 'Loss ↓'}</span>
              </th>
              <th>
                <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('loss', e, useData, setData)}>{type.includes('Win') ? 'Loss ↓' : 'Win ↓'}</span>
              </th>
              <th>
                <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('matches', e, useData, setData)}>Matches ↓</span>
              </th>
              <th>
                <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('winRate', e, useData, setData)}>{type.includes('Win') ? 'WinRate ↓' : 'LossRate ↓'}</span>
              </th>
            </tr>
          </thead>
          <tbody >
            {useData && useData.map((player, i) => (
              <tr key={player.profile.account_id} >
                <td style={imageStyle(player.profile.avatarfull)}>
                  <ImageSize />
                </td>
                <td >
                  {player.profile.personaname.slice(0, 10)}
                </td>
                <td >
                  {player.win}
                </td>
                <td >
                  {player.loss}
                </td>
                <td >
                  {player.matches}
                </td>
                <td >
                  {player.winRate.toFixed(1)}% </td>
              </tr>
            ))}
          </tbody>
        </Table >

      }
    </div >
  );
}
