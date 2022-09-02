import Carousel from 'react-bootstrap/Carousel';
import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {unixToHMS} from './Maths';
import Accordion from 'react-bootstrap/Accordion';

function CardCarousel({data: player}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    mounted && <Accordion >
      <Accordion.Item eventKey="0">
        <Accordion.Header>Match Status</Accordion.Header>
        <Accordion.Body style={{margin: 0, padding: 1}}>
          <Carousel variant="dark" keyboard={'md'} indicators={false} interval={300000} touch={false} style={{width: '100%', maxWidth: 800, margin: 'auto'}}>
            {player.map((match) => (
              <Carousel.Item key={match.match_id}>
                <Card className="text-center">
                  {unixToHMS(match.start_time)}
                  <Card.Header>
                    Radiant score <Button variant="primary">{match.radiant_score}</Button> - <Button variant="primary">{match.dire_score}</Button> Dire score
                  </Card.Header>
                  <Card.Footer className="text-muted">match_id: {match.match_id}</Card.Footer>
                </Card>
                <Table bordered striped={true} responsive={true} style={document.documentElement.clientWidth < 580 ? {textAlign: 'center', fontSize: '0.85rem', verticalAlign: 'center', minWidth: 580} : {textAlign: 'center'}}>
                  <thead>
                    <tr>
                      <th>Nick</th>
                      <th>K/D/A</th>
                      <th>L/D</th>
                      <th>GPM</th>
                      <th>XPM</th>
                      <th>Hero</th>
                      <th>Tower</th>
                      <th>Heal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {match.players.map((player) => (
                      <tr key={player.profile.account_id}>
                        <td><a href={`/matches/${player.profile.account_id}`}>{player.profile.personaname.slice(0, 13)}</a></td>
                        <td>{`${player.kills}/${player.deaths}/${player.assists}`}</td>
                        <td>{`${player.last_hits}/${player.denies}`}</td>
                        <td>{player.gold_per_min.toLocaleString('pt-BR')}</td>
                        <td>{player.xp_per_min.toLocaleString('pt-BR')}</td>
                        <td>{player.hero_damage.toLocaleString('pt-BR')}</td>
                        <td>{player.tower_damage.toLocaleString('pt-BR')}</td>
                        <td>{player.hero_healing.toLocaleString('pt-BR')}</td>
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
