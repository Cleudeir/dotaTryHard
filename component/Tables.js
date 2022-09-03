import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';

function Tables({_matches, number}) {
  const [mounted, setMounted] = useState(false);
  const [useData, setData] = useState(false);
  useEffect(() => {
    setMounted(true);
    const data = [];
    for (let i = 0; i < _matches.length/number; i++) {
      data.push(_matches.slice(i*number, (i+1)*(number)));
    }
    console.log(data);
    setData(data);
  }, []);

  function colorWinStyle(win) {
    if (win === 0) {
      return {backgroundColor: 'rgba(234,67,53,0.3)', whiteSpace: 'nowrap'};
    }
    return {backgroundColor: 'rgba(58,182,132,0.3)', whiteSpace: 'nowrap'};
  }
  function imageStyle(url) {
    return {margin: 0, padding: 0, backgroundImage: `url(${url})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center'};
  }
  function ImageSize() {
    return (
      <div style={{margin: 0, padding: 0, width: 50, height: 50}}></div>
    );
  }

  function AccordionTable({data, index}) {
    return (
      <Accordion.Item id={`accordion${index}`} eventKey={index} >
        <Accordion.Header onClick={()=>{
          window.scrollTo(0, 0);
        }}>Top {number*(index+1)}</Accordion.Header>
        <Accordion.Body style={{margin: 0, padding: 1}} >
          <Table bordered striped={true} responsive={true}
            style={document.documentElement.clientWidth < 580 ?
          {textAlign: 'center', fontSize: '0.85rem', verticalAlign: 'center'} :
          {textAlign: 'center'}}>
            <thead>
              <tr>
                <th style={{width: 70}}>Pos  </th>
                <th colSpan="2">Nick</th>
                <th>Rate</th>
                <th>kills</th>
                <th>deaths</th>
                <th>Assis</th>
                <th>Lasts</th>
                <th>Denies</th>
                <th>GPM</th>
                <th>XPM</th>
                <th>Hero</th>
                <th>Tower</th>
                <th>Heal</th>
              </tr>
            </thead>
            <tbody>
              {data.map((player, i) => (
                <tr key={player.profile.account_id}>
                  <td style={colorWinStyle(player.win)}>
                    {(i+1)+number*index}
                  </td>
                  <td style={imageStyle(player.profile.avatarfull)}>
                    <ImageSize />
                  </td>
                  <td style={colorWinStyle(player.win)}>
                    <a href={`/matches/${player.profile.account_id}`}>
                      {player.profile.personaname.slice(0, 15)}
                    </a></td>
                  <td style={colorWinStyle(player.win)}>
                    {player.rankingRate} </td>
                  <td style={colorWinStyle(player.win)}>
                    {player.kills} </td>
                  <td style={colorWinStyle(player.win)}>
                    {player.deaths} </td>
                  <td style={colorWinStyle(player.win)}>
                    {player.assists} </td>
                  <td style={colorWinStyle(player.win)}>
                    {player.last_hits}</td>
                  <td style={colorWinStyle(player.win)}>
                    {player.denies}</td>
                  <td style={colorWinStyle(player.win)}>
                    {player.gold_per_min.toLocaleString('pt-BR')} </td>
                  <td style={colorWinStyle(player.win)}>
                    {player.xp_per_min.toLocaleString('pt-BR')}</td>
                  <td style={colorWinStyle(player.win)}>
                    {player.hero_damage.toLocaleString('pt-BR')} </td>
                  <td style={colorWinStyle(player.win)}>
                    {player.tower_damage.toLocaleString('pt-BR')} </td>
                  <td style={colorWinStyle(player.win)}>
                    {player.hero_healing.toLocaleString('pt-BR')} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Accordion.Body>
      </Accordion.Item>
    );
  }

  return (
    mounted && <Accordion defaultActiveKey={0}>
      {useData && useData.map((matches, index)=> (
        <AccordionTable key={index} data={matches} index={index}/>
      ))}
    </Accordion >
  );
}

export default Tables;
