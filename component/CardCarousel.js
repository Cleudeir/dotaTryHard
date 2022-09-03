import Carousel from 'react-bootstrap/Carousel';
import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {unixToHMS} from './Maths';
import Accordion from 'react-bootstrap/Accordion';

function CardCarousel({_match, _avg}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
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
  return (
    mounted && <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Matches</Accordion.Header>
        <Accordion.Body style={{margin: 0, padding: 1}}>
          <Carousel variant="dark" keyboard={'md'} indicators={false} interval={300000} touch={false} style={{width: '100%', maxWidth: 1200, margin: 'auto'}}>
            {_match.map((match) => (
              <Carousel.Item key={match.match_id}>
                <Card className="text-center">
                  {unixToHMS(match.start_time)}
                  <Card.Header>
                    Radiant score <Button variant="primary">{match.radiant_score}</Button> - <Button variant="primary">{match.dire_score}</Button> Dire score
                  </Card.Header>
                  <Card.Footer className="text-muted">{_avg.profile.personaname} match_id: {match.match_id}</Card.Footer>
                </Card>
                <Table bordered striped={true} responsive={true} style={document.documentElement.clientWidth < 580 ? {textAlign: 'center', fontSize: '0.85rem', verticalAlign: 'center'} : {textAlign: 'center'}}>
                  <thead>
                    <tr>
                      <th style={{width: 70}}>Pos  </th>
                      <th colSpan="2">Nick</th>
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
                      <th>Hero</th>
                      <th colSpan="4">Skills</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.players.sort(function(a, b) {
                      if (a.player_slot < b.player_slot) return -1;
                      if (a.player_slot > b.player_slot) return 1;
                      return 0;
                    }).map((player, index) => (
                      <tr key={player.profile.account_id}>
                        <td style={colorWinStyle(player.win)}>
                          {index+1}
                        </td>
                        <td style={imageStyle(player.profile.avatarfull)}>
                          <ImageSize />
                        </td>

                        <td style={colorWinStyle(player.win)}>
                          <a href={`/matches/${player.profile.account_id}`}>
                            {player.profile.personaname.slice(0, 15)}
                          </a></td>
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
                        <td style={imageStyle(player.hero_id)}>
                          <div style={{margin: 0, padding: 0, width: 70, height: 50}}></div>
                        </td>
                        <td style={imageStyle(player.ability_0)}>
                          <ImageSize />
                        </td>
                        <td style={imageStyle(player.ability_1)}>
                          <ImageSize />
                        </td>
                        <td style={imageStyle(player.ability_2)}>
                          <ImageSize />
                        </td>
                        <td style={imageStyle(player.ability_3)}>
                          <ImageSize />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Mais jogadas</Accordion.Header>
        <Accordion.Body>
          Em desenvolvimento...
        </Accordion.Body>
      </Accordion.Item>
    </Accordion >

  );
}

export default CardCarousel;
