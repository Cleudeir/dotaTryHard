export default async function mathInfos( {playersMatches, _matchIds, account_id} ) {
  const matches = [];
  _matchIds.forEach( ( item ) =>
    matches.push( {
      match_id: item.match_id,
      players: playersMatches.filter( ( y ) => y.match_id === item ),
    } ),
  );
  const uniqueAlliesPlayers = {};
  const uniqueEnemyPlayers = {};
  const uniqueInfosAbility = {};
  const uniqueInfosItem = {};
  const uniqueInfosItemUsed = {};
  let person;
  matches.map( ( item ) => {
    const [{player_slot, profile}] = item.players.filter( ( x ) => x.account_id === account_id );
    person = profile;

    function uniqueRate( unique, x ) {
      const n0 = unique[x.account_id]?.matches || 0;
      const n1 = n0 + 1;
      const win0 = unique[x.account_id]?.win || 0;
      const win1 = win0 + x.win;
      unique[x.account_id] = {
        profile: x.profile,
        win: win1,
        matches: n1,
        winRate: win1 / n1 * 100,
      };
    }
    item.players.map( ( x ) => {
      if ( x.account_id > 150 && x.account_id !== account_id ) {
        if ( x.player_slot < 100 && player_slot < 100 || x.player_slot > 100 && player_slot > 100 ) {
          uniqueRate( uniqueAlliesPlayers, x );
        } else {
          uniqueRate( uniqueEnemyPlayers, x );
        }
      } else if ( x.account_id === account_id ) {
        // ability ---------------------------------------------------
        if ( !uniqueInfosAbility[x.ability_0] ) {
          uniqueInfosAbility[x.ability_0] = {win: x.win, count: 1};
        } else {
          uniqueInfosAbility[x.ability_0].win += x.win;
          uniqueInfosAbility[x.ability_0].count += 1;
        }
        if ( !uniqueInfosAbility[x.ability_1] ) {
          uniqueInfosAbility[x.ability_1] = {win: x.win, count: 1};
        } else {
          uniqueInfosAbility[x.ability_1].win += x.win;
          uniqueInfosAbility[x.ability_1].count += 1;
        }
        if ( !uniqueInfosAbility[x.ability_2] ) {
          uniqueInfosAbility[x.ability_2] = {win: x.win, count: 1};
        } else {
          uniqueInfosAbility[x.ability_2].win += x.win;
          uniqueInfosAbility[x.ability_2].count += 1;
        }
        if ( !uniqueInfosAbility[x.ability_3] ) {
          uniqueInfosAbility[x.ability_3] = {win: x.win, count: 1};
        } else {
          uniqueInfosAbility[x.ability_3].win += x.win;
          uniqueInfosAbility[x.ability_3].count += 1;
        }
        // item ---------------------------------------------------
        if ( !uniqueInfosItem[x.item_0] ) {
          uniqueInfosItem[x.item_0] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_0].win += x.win;
          uniqueInfosItem[x.item_0].count += 1;
        }
        if ( !uniqueInfosItem[x.item_1] ) {
          uniqueInfosItem[x.item_1] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_1].win += x.win;
          uniqueInfosItem[x.item_1].count += 1;
        }
        if ( !uniqueInfosItem[x.item_2] ) {
          uniqueInfosItem[x.item_2] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_2].win += x.win;
          uniqueInfosItem[x.item_2].count += 1;
        }
        if ( !uniqueInfosItem[x.item_3] ) {
          uniqueInfosItem[x.item_3] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_3].win += x.win;
          uniqueInfosItem[x.item_3].count += 1;
        }
        if ( !uniqueInfosItem[x.item_4] ) {
          uniqueInfosItem[x.item_4] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_4].win += x.win;
          uniqueInfosItem[x.item_4].count += 1;
        }
        if ( !uniqueInfosItem[x.item_5] ) {
          uniqueInfosItem[x.item_5] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_5].win += x.win;
          uniqueInfosItem[x.item_5].count += 1;
        }
        // item used ---------------------------------------------
        if ( Boolean( x.aghanims_shard ) ) {
          if ( !uniqueInfosItemUsed['aghanims_shard'] ) {
            uniqueInfosItemUsed['aghanims_shard'] = {win: x.win, count: 1};
          } else {
            uniqueInfosItemUsed['aghanims_shard'].win += x.win;
            uniqueInfosItemUsed['aghanims_shard'].count += 1;
          }
        }
        if ( Boolean( x.aghanims_scepter ) ) {
          if ( !uniqueInfosItemUsed['ultimate_scepter'] ) {
            uniqueInfosItemUsed['ultimate_scepter'] = {win: x.win, count: 1};
          } else {
            uniqueInfosItemUsed['ultimate_scepter'].win += x.win;
            uniqueInfosItemUsed['ultimate_scepter'].count += 1;
          }
        }
        if ( Boolean( x.moonshard ) ) {
          if ( !uniqueInfosItemUsed['moon_shard'] ) {
            uniqueInfosItemUsed['moon_shard'] = {win: x.win, count: 1};
          } else {
            uniqueInfosItemUsed['moon_shard'].win += x.win;
            uniqueInfosItemUsed['moon_shard'].count += 1;
          }
        }
      }
    } );
  } );
  const alliesPlayers = await orderAlliesEnemy( uniqueAlliesPlayers );
  const enemyPlayers = await orderAlliesEnemy( uniqueEnemyPlayers );
  return {alliesPlayers, enemyPlayers, profile: person, uniqueInfosItem, uniqueInfosItemUsed, uniqueInfosAbility};
}

async function orderAlliesEnemy( playersUnique ) {
  const PlayersWinRate = Object.values( playersUnique );
  const PlayersOrder = PlayersWinRate.sort( ( a, b ) => {
    if ( a.matches > b.matches ) return -1;
    if ( a.matches < b.matches ) return 1;
    return 0;
  } );
  return PlayersOrder;
}
