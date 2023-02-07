import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import {Table} from 'react-bootstrap';
import {unixToHMS} from '../Math/unixToHMS';
import styles from './index.module.css';

function TableMatches({_match, _avg, qnt}) {
  console.log('_match, _avg, qnt: ', _match, _avg, qnt);
  function colorWinStyle(win) {
    if (win === 0) {
      return {backgroundColor: 'rgba(234,67,53,0.3)', whiteSpace: 'nowrap'};
    }
    return {backgroundColor: 'rgba(58,182,132,0.3)', whiteSpace: 'nowrap'};
  }
  const urlImg1 = 'https://static.vecteezy.com/ti/vetor-gratis/t2/375499-ponto-de-interrogacaoial-icone-gr%C3%A1tis-vetor.jpg';
  const urlImg2 = 'https://www.segalfamilyfoundation.org/wp-content/uploads/2021/07/white-background.jpg';
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
                    <th colSpan="4">Skills</th>
                    <th> </th>
                    <th colSpan="6">Itens</th>
                    <th> </th>
                    <th colSpan="3">Itens used</th>
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
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/ability/${player.ability_0}.png`}
                              alt={''}
                            />
                          </td>
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/ability/${player.ability_1}.png`}
                              alt={''}
                            />
                          </td>
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/ability/${player.ability_2}.png`}
                              alt={''}
                            />
                          </td>
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/ability/${player.ability_3}.png`}
                              alt={''}
                            />
                          </td>
                          <td> </td>
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/items/${player.item_0}.png`}
                              alt={''}
                            />
                          </td>
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/items/${player.item_1}.png`}
                              alt={''}
                            />
                          </td>
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/items/${player.item_2}.png`}
                              alt={''}
                            />
                          </td>
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/items/${player.item_3}.png`}
                              alt={''}
                            />
                          </td>
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/items/${player.item_4}.png`}
                              alt={''}
                            />
                          </td>
                          <td>
                            <img
                              src={`https://cdn.datdota.com/images/items/${player.item_5}.png`}
                              alt={''}
                            />
                          </td>
                          <td> </td>
                          <td>
                            <img src={'https://cdn.datdota.com/images/items/ultimate_scepter.png'}
                              alt={''} style={player.aghanims_scepter === 0 ? {opacity: 0} : {filter: 'none'}} />
                          </td>
                          <td>
                            <img src={'https://cdn.datdota.com/images/items/aghanims_shard.png'}
                              alt={''} style={player.aghanims_shard === 0 ? {opacity: 0} : {filter: 'none'}} />
                          </td>
                          <td>
                            <img src={'https://cdn.datdota.com/images/items/moon_shard.png'}
                              alt={''} style={player.moonshard === 0 ? {opacity: 0} : {filter: 'none'}} />
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
