import Carousel from 'react-bootstrap/Carousel';
import React, {useEffect, useState} from 'react';
import {Table} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {unixToHMS} from '../Maths';
import styles from './index.module.css';

function TableMatches({_match, _avg, qnt}) {
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
  return (
    <div className={styles.container}>
      <div>
        <h2>{_avg.profile.personaname}, See the last {qnt} Matches</h2>
      </div>
      <div>
        {_match.map((match) => (
          <div key={match.match_id} className={styles.match}>
            <div className={styles.score}>
              <h3>Match score</h3>
              <h4>RADIANT {match.radiant_score} - {match.dire_score} DIRE</h4>
              <h5>{unixToHMS(match.start_time)}</h5>
            </div>
            <div className={styles.containerTable}>
              <Table className={styles.table} bordered striped={true}>
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
                          <td className={styles.avatarfull}>
                            <img
                              src={player.profile.avatarfull}
                              alt={player.profile.account_id}
                            />
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
                          <td className={styles.hero} >
                            <img src={player.hero_id} alt={''} />
                          </td>
                          <td>
                            <img src={player.ability_0} alt={''} />
                          </td>
                          <td>
                            <img src={player.ability_1} alt={''} />
                          </td>
                          <td>
                            <img src={player.ability_2} alt={''} />
                          </td>
                          <td>
                            <img src={player.ability_3} alt={''} />
                          </td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </div>
            <Carousel.Caption></Carousel.Caption>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableMatches;
