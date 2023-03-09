import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import {Table} from 'react-bootstrap';
import {unixToHMS} from '../Math/unixToHMS';
import styles from './index.module.css';

function TableMatches({_match, _avg, qnt}) {
  function colorWinStyle(win) {
    if (win === 0) {
      return {backgroundColor: 'rgba(234,67,53,0.3)', whiteSpace: 'nowrap'};
    }
    return {backgroundColor: 'rgba(58,182,132,0.3)', whiteSpace: 'nowrap'};
  }
  return (
    <div className={styles.container}>
      <div>
        <h2>
          {_avg.profile.personaname}, See the last {qnt} Matches
        </h2>
      </div>
      <div>
        {_match.map((match) => (
          <div key={match.match_id} className={styles.match}>
            <div className={styles.score}>
              <h3>MATCH SCORE</h3>
              <h4>
                RADIANT {match.radiant_score} - {match.dire_score} DIRE
              </h4>
              <h5>{unixToHMS(match.start_time)}</h5>
            </div>
            <div className={styles.containerTable}>
              <Table className={styles.table} bordered striped={true}>
                <thead>
                  <tr>
                    <th>ico</th>
                    <th>Nick</th>
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
                    <th>Level</th>
                    <th> </th>
                    <th>Hero</th>
                    <th> </th>
                    <th colSpan="4">Skills</th>
                    <th> </th>
                    <th colSpan="6">Items</th>
                    <th> </th>
                    <th colSpan="3">Items used</th>
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
                          <td className={player.leaver_status === 1 ? styles.avatarfullleave : styles.avatarfull}>
                            <img src={player.profile.avatarfull} alt={player.profile.account_id} />
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
                          <td>{player.Hero_level}</td>
                          <td> </td>
                          <td className={styles.hero}>
                            <img src={`https://cdn.datdota.com/images/heroes/${player.hero_id}_full.png`} alt={''} />
                          </td>
                          <td> </td>
                          {[0, 1, 2, 3].map((index) => (
                            <td key={index}>
                              <img src={`https://cdn.datdota.com/images/ability/${player[`ability_${index}`]}.png`} alt={''} />
                            </td>
                          ))}
                          <td> </td>
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <td key={index}>{+player[`item_${index}`] !== 0 && <img src={`https://cdn.datdota.com/images/items/${player[`item_${index}`]}.png`} alt={''} />}</td>
                          ))}
                          <td> </td>
                          {[
                            {img: 'ultimate_scepter', name: 'aghanims_scepter'},
                            {img: 'aghanims_shard', name: 'aghanims_shard'},
                            {img: 'moon_shard', name: 'moonshard'},
                          ].map((_item) => (
                            <td key={_item}>
                              <img src={`https://cdn.datdota.com/images/items/${_item.img}.png`} alt={''} style={player[_item.name] === 0 ? {opacity: 0} : {filter: 'none'}} />
                            </td>
                          ))}
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
