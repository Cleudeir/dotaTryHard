import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import {Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {unixToHMS} from './Maths';
import Accordion from 'react-bootstrap/Accordion';

function CardCarousel({data: player}) {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Match Status</Accordion.Header>
        <Accordion.Body>
          <Carousel variant="dark" indicators={false} interval={300000} style={{width: '100%'}}>
            {player.map((match, index) => (
              <Carousel.Item Key={index + 1}>
                <Card className="text-center">
                  {unixToHMS(match.start_time)}
                  <Card.Header>
                    Radiant score <Button variant="primary">{match.radiant_score}</Button> - <Button variant="primary">{match.dire_score}</Button> Dire score
                  </Card.Header>
                  <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
                <Table bordered style={{textAlign: 'center'}}>
                  <thead>
                    <th>Nick</th>
                    <th>K/D/A</th>
                    <th>L/D</th>
                    <th>GPM</th>
                    <th>XPM</th>
                    <th>Hero</th>
                    <th>Tower</th>
                    <th>Heal</th>
                  </thead>
                  <tbody>
                    {match.players.map((player, j) => (
                      <tr Key={j}>
                        <td style={player.win === 0 ? {backgroundColor: 'rgba(234,67,53,0.3)'} : {backgroundColor: 'rgba(58,182,132,0.3)'}} ><a href={`/matches/${player.profile.account_id}`}>{player.profile.personaname.slice(0, 10)}</a></td>
                        <td style={player.win === 0 ? {backgroundColor: 'rgba(234,67,53,0.3)'} : {backgroundColor: 'rgba(58,182,132,0.3)'}} >{player.kills !== '-' ? `${player.kills}/${player.deaths}/${player.assists}` : '-'}</td>
                        <td style={player.win === 0 ? {backgroundColor: 'rgba(234,67,53,0.3)'} : {backgroundColor: 'rgba(58,182,132,0.3)'}} >{player.kills !== '-' ? `${player.last_hits}/${player.denies}` : '-'}</td>
                        <td style={player.win === 0 ? {backgroundColor: 'rgba(234,67,53,0.3)'} : {backgroundColor: 'rgba(58,182,132,0.3)'}} >{player.gold_per_min.toLocaleString('pt-BR')}</td>
                        <td style={player.win === 0 ? {backgroundColor: 'rgba(234,67,53,0.3)'} : {backgroundColor: 'rgba(58,182,132,0.3)'}} >{player.xp_per_min.toLocaleString('pt-BR')}</td>
                        <td style={player.win === 0 ? {backgroundColor: 'rgba(234,67,53,0.3)'} : {backgroundColor: 'rgba(58,182,132,0.3)'}} >{player.hero_damage.toLocaleString('pt-BR')}</td>
                        <td style={player.win === 0 ? {backgroundColor: 'rgba(234,67,53,0.3)'} : {backgroundColor: 'rgba(58,182,132,0.3)'}} >{player.tower_damage.toLocaleString('pt-BR')}</td>
                        <td style={player.win === 0 ? {backgroundColor: 'rgba(234,67,53,0.3)'} : {backgroundColor: 'rgba(58,182,132,0.3)'}} >{player.hero_healing.toLocaleString('pt-BR')}</td>
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
    </Accordion>

  );
}

export default CardCarousel;
