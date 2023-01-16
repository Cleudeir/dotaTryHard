import Carousel from 'react-bootstrap/Carousel';
import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {unixToHMS} from './Maths';

function CardCarousel({_match, _avg, qnt}) {
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
    return {
      margin: 0,
      padding: 0,
      backgroundImage: `url(${url})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  }
  function ImageSize() {
    return <div style={{margin: 0, padding: 0, width: 50, height: 50}}></div>;
  }
  return (
    mounted && (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 10,
          minHeight: '100vh',
        }}
      >
        <div>
          <h1>See the last {qnt} Matches</h1>
        </div>
        <div style={{width: '100%', maxWidth: 1360, margin: 'auto'}}>
          {_match.map((match) => (
            <div key={match.match_id}>
              <Card className="text-center" style={{marginTop: 10, borderRadius: 0}}>
                <Card.Header>
                  <div style={{margin: 'auto'}}>⠀⠀⠀Match score</div>
                  <div>
                    {' '}
                    Radiant{' '}
                    <Button style={{cursor: 'default'}} variant="primary">
                      {match.radiant_score}
                    </Button>{' '}
                    -{' '}
                    <Button style={{cursor: 'default'}} variant="primary">
                      {match.dire_score}
                    </Button>{' '}
                    Dire
                  </div>
                  {unixToHMS(match.start_time)}
                  <br />
                </Card.Header>
                <Card.Footer className="text-muted">
                  {_avg.profile.personaname} - match_id: {match.match_id}
                </Card.Footer>
              </Card>
              <Table
                bordered
                striped={true}
                responsive={document.documentElement.clientWidth < 580 ? true : false}
                style={
                  document.documentElement.clientWidth < 580 ?
                    {
                      textAlign: 'center',
                      fontSize: '0.85rem',
                      verticalAlign: 'center',
                    } :
                    {textAlign: 'center'}
                }
              >
                <thead>
                  <tr>
                    <th style={{width: 70}}>Pos </th>
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
                  {match.players
                      .sort(function(a, b) {
                        if (a.player_slot < b.player_slot) return -1;
                        if (a.player_slot > b.player_slot) return 1;
                        return 0;
                      })
                      .map((player, index) => (
                        <tr key={player.profile.account_id}>
                          <td style={colorWinStyle(player.win)}>{index + 1}</td>
                          <td style={imageStyle(player.profile.avatarfull)}>
                            <ImageSize />
                          </td>
                          <td style={colorWinStyle(player.win)}>{player.profile.personaname.slice(0, 15)}</td>
                          <td style={colorWinStyle(player.win)}>{player.kills} </td>
                          <td style={colorWinStyle(player.win)}>{player.deaths} </td>
                          <td style={colorWinStyle(player.win)}>{player.assists} </td>
                          <td style={colorWinStyle(player.win)}>{player.last_hits}</td>
                          <td style={colorWinStyle(player.win)}>{player.denies}</td>
                          <td style={colorWinStyle(player.win)}>{player.gold_per_min.toLocaleString('pt-BR')} </td>
                          <td style={colorWinStyle(player.win)}>{player.xp_per_min.toLocaleString('pt-BR')}</td>
                          <td style={colorWinStyle(player.win)}>{player.hero_damage.toLocaleString('pt-BR')} </td>
                          <td style={colorWinStyle(player.win)}>{player.tower_damage.toLocaleString('pt-BR')} </td>
                          <td style={colorWinStyle(player.win)}>{player.hero_healing.toLocaleString('pt-BR')} </td>
                          <td style={imageStyle(player.hero_id)}>
                            <div
                              style={{
                                margin: 0,
                                padding: 0,
                                width: 70,
                                height: 50,
                              }}
                            ></div>
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
              <Carousel.Caption></Carousel.Caption>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default CardCarousel;
