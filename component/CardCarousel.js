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
  function colorWin(win) {
    if (win === 0) {
      return {backgroundColor: 'rgba(234,67,53,0.3)'};
    }
    return {backgroundColor: 'rgba(58,182,132,0.3)'};
  }
  return (
    mounted && <Accordion >
      <Accordion.Item eventKey="0">
        <Accordion.Header>Match Status</Accordion.Header>
        <Accordion.Body style={{margin: 0, padding: 1}}>
          <Carousel variant="dark" keyboard={'md'} indicators={false} interval={300000} touch={false} style={{width: '100%', maxWidth: 800, margin: 'auto'}}>
            {_match.map((match) => (
              <Carousel.Item key={match.match_id}>
                <Card className="text-center">
                  {unixToHMS(match.start_time)}
                  <Card.Header>
                    Radiant score <Button variant="primary">{match.radiant_score}</Button> - <Button variant="primary">{match.dire_score}</Button> Dire score
                  </Card.Header>
                  <Card.Footer className="text-muted">{_avg.profile.personaname} match_id: {match.match_id}</Card.Footer>
                </Card>
                <Table bordered striped={true} responsive={true} style={document.documentElement.clientWidth < 580 ? {textAlign: 'center', fontSize: '0.85rem', verticalAlign: 'center', minWidth: 700} : {textAlign: 'center'}}>
                  <thead>
                    <tr>
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
                    </tr>
                  </thead>
                  <tbody>
                    {match.players.sort(function(a, b) {
                      if (a.player_slot < b.player_slot) return -1;
                      if (a.player_slot > b.player_slot) return 1;
                      return 0;
                    }).map((player) => (
                      <tr key={player.profile.account_id}>
                        <td style={{margin: 0, padding: 0, width: 35, backgroundImage: `url(${player.profile.avatarfull})`, backgroundSize: 'contain'}}>
                        </td>
                        <td style={colorWin(player.win)}>
                          <a href={`/matches/${player.profile.account_id}`}>
                            {player.profile.personaname.slice(0, 13)}
                          </a></td>
                        <td style={colorWin(player.win)}>
                          {player.kills} </td>
                        <td style={colorWin(player.win)}>
                          {player.deaths} </td>
                        <td style={colorWin(player.win)}>
                          {player.assists} </td>
                        <td style={colorWin(player.win)}>
                          {player.last_hits}</td>
                        <td style={colorWin(player.win)}>
                          {player.denies}</td>
                        <td style={colorWin(player.win)}>
                          {player.gold_per_min.toLocaleString('pt-BR')} </td>
                        <td style={colorWin(player.win)}>
                          {player.xp_per_min.toLocaleString('pt-BR')}</td>
                        <td style={colorWin(player.win)}>
                          {player.hero_damage.toLocaleString('pt-BR')} </td>
                        <td style={colorWin(player.win)}>
                          {player.tower_damage.toLocaleString('pt-BR')} </td>
                        <td style={colorWin(player.win)}>
                          {player.hero_healing.toLocaleString('pt-BR')} </td>
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
        <Accordion.Header>Match Skills</Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion >

  );
}

export default CardCarousel;
