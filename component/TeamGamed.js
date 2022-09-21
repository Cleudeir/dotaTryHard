import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import orderTable from './orderTable';

export default function FriendsGamed({data, type}) {
  console.log(data);
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

  return (

    <div style={{display: 'flex', flexDirection: 'column', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', marginTop: 100}} >
      {!useLoading && <img src={'https://i.pinimg.com/originals/cd/77/f3/cd77f35d8796025d03b5452d65269e9d.gif'} style={{margin: 'auto', filter: 'invert(1)'}} />}

      {useLoading &&
        <>
          <h2 style={{marginTop: 100, textAlign: 'center'}} >{type}</h2>
          <Table bordered striped={true} style={{whiteSpace: 'nowrap', textAlign: 'center'}} >
            <thead>
              <tr>
                <th style={{width: 70}}>
                  <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('pos', e, useData, setData)}>Pos ↑</span>
                </th>
                <th>
                  {useSave && <div style={{display: 'flex', flexDirection: 'row', marginLeft: 5}}>
                    <span style={{color: '#37e', cursor: 'pointer', margin: 'auto'}} onClick={(e) => orderTable('profile.personaname', e, useData, setData)}>Nick ↓</span>
                  </div>
                  }
                </th>
                <th >
                  {useSave && <div style={{display: 'flex', flexDirection: 'row', marginLeft: 5}}>
                    <Form.Control style={{display: 'flex', color: '#37e', width: 130, flexDirection: 'row', marginLeft: 5, height: 25}} type='text' placeholder='search' onChange={(e) => {
                      filterName(e.target.value);
                    }} />
                  </div>
                  }
                </th>
                <th>
                  <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('win', e, useData, setData)}>Win ↓</span>
                </th>
                <th>
                  <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('loss', e, useData, setData)}>Loss ↓</span>
                </th>
                <th>
                  <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('matches', e, useData, setData)}>Matches ↓</span>
                </th>
                <th>
                  <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => orderTable('winRate', e, useData, setData)}>WinRate ↓</span>
                </th>
              </tr>
            </thead>
            <tbody >
              {useData && useData.map((player, i) => (
                <tr key={player.profile.account_id} >
                  <td >
                    {i + 1}
                  </td>
                  <td style={imageStyle(player.profile.avatarfull)}>
                    <ImageSize />
                  </td>
                  <td >
                    {player.profile.personaname.slice(0, 15)}
                  </td>
                  <td >
                    {player.win}
                  </td>
                  <td >
                    {player.loss}
                  </td>
                  <td >
                    <a href={`/matches/${player.profile.account_id}`} onClick={() => setLoading(false)} >
                      {player.matches}  👀
                    </a> </td>
                  <td >
                    {player.winRate.toFixed(1)}% </td>
                </tr>
              ))}
            </tbody>
          </Table >
        </>
      }
    </div >
  );
}
