import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';

function Tables({useData, setData, useSave, setLoading}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function styleTd() {
    return {whiteSpace: 'nowrap'};
  }
  function imageStyle(url) {
    return {margin: 0, padding: 0, backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'};
  }
  function ImageSize() {
    return (
      <div style={{margin: 0, padding: 0, width: 50, height: 50}}></div>
    );
  }

  function order(type, e) {
    setTimeout(() => {
      const save = useData;
      const [name, filterDirection] = e.target.innerHTML.split(' ');
      console.log({name, type, filterDirection});

      if (filterDirection === '↓') {
        const _sort = save.sort(function(a, b) {
          if (a[type] > b[type]) {
            return -1;
          }
          if (a[type] < b[type]) {
            return 1;
          }
          return 0;
        });
        e.target.innerHTML = `${name} ↑`;
        console.log(_sort, type, e.target.innerHTML);
        setData(save.slice(0, 20));
        setTimeout(() => {
          setData(_sort);
        }, 30);
      }
      if (filterDirection === '↑') {
        const _sort = save.sort(function(a, b) {
          if (a[type] < b[type]) {
            return -1;
          }
          if (a[type] > b[type]) {
            return 1;
          }
          return 0;
        });
        e.target.innerHTML = `${name} ↓`;
        console.log(_sort, type, e.target.innerHTML);
        setData(save.slice(0, 20));
        setTimeout(() => {
          setData(_sort);
        }, 30);
      }
    }, 2000);
  };

  function filterName(e) {
    if (useSave) setData(useSave.filter((x) => x.profile.personaname.slice(0, e.length).toUpperCase().includes(e.toUpperCase())));
  }
  return (
    mounted &&
      <Table bordered striped={true} responsive={true}
        style={document.documentElement.clientWidth < 580 ?
        {textAlign: 'center', fontSize: '0.85rem', verticalAlign: 'center', maxWidth: 1200, whiteSpace: 'nowrap', margin: 'auto'} :
        {textAlign: 'center', maxWidth: 1200, whiteSpace: 'nowrap', margin: 'auto'}}>
        <thead>
          <tr>
            <th style={{width: 70}}>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('pos', e)}>Pos ↑</span>
            </th>
            <th colSpan="2">Nick
              {useSave && <input type={'text'} style={{color: '#37e', width: 110, marginLeft: 5}} onChange={(e) => {
                filterName(e.target.value);
              }}></input>}
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('rankingRate', e)}>Rate ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('matches', e)}>Matches ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('winRate', e)}>WinRate ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('kills', e)}>kills ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('deaths', e)}>Deaths ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('assists', e)}>Assis ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('last_hits', e)}>Lasts ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('denies', e)}>Denies ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('gold_per_min', e)}>GPM ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('xp_per_min', e)}>XPM ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('hero_damage', e)}>Hero ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('tower_damage', e)}>Tower ↓</span>
            </th>
            <th>
              <span style={{color: '#37e', cursor: 'pointer'}} onClick={(e) => order('hero_healing', e)}>Heal ↓</span>
            </th>
          </tr>
        </thead>
        <tbody >
          {useData && useData.map((player, i) => (
            <tr key={player.profile.account_id} >
              <td style={styleTd(player.win)}>
                {player.pos}
              </td>
              <td style={imageStyle(player.profile.avatarfull)}>
                <ImageSize />
              </td>
              <td style={styleTd(player.win)}>
                {player.profile.personaname.slice(0, 15)}
              </td>
              <td style={styleTd(player.win)}>
                {player.rankingRate} </td>
              <td style={styleTd(player.win)} >
                <a href={`/matches/${player.profile.account_id}`} onClick={()=>setLoading(false)} >
                  {player.matches}  👀
                </a> </td>
              <td style={styleTd(player.win)}>
                {player.winRate.toFixed(1)}% </td>
              <td style={styleTd(player.win)}>
                {player.kills.toFixed(1)} </td>
              <td style={styleTd(player.win)}>
                {player.deaths.toFixed(1)} </td>
              <td style={styleTd(player.win)}>
                {player.assists.toFixed(1)} </td>
              <td style={styleTd(player.win)}>
                {player.last_hits.toFixed(1)}</td>
              <td style={styleTd(player.win)}>
                {player.denies.toFixed(1)}</td>
              <td style={styleTd(player.win)}>
                {player.gold_per_min.toFixed(0)} </td>
              <td style={styleTd(player.win)}>
                {player.xp_per_min.toFixed(0)}</td>
              <td style={styleTd(player.win)}>
                {player.hero_damage.toFixed(0)} </td>
              <td style={styleTd(player.win)}>
                {player.tower_damage.toFixed(0)} </td>
              <td style={styleTd(player.win)}>
                {player.hero_healing.toFixed(0)} </td>
            </tr>
          ))}
        </tbody>
      </Table >
  );
}

export default Tables;
