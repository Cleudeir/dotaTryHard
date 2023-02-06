// refactors this code
import Matches from './../../pages/matches/[id]';

export default async function mathInfos({playersMatches, _matchIds, account_id}) {
  const matches = [];
  _matchIds.forEach((item) =>
    matches.push({
      match_id: item.match_id,
      players: playersMatches.filter((y) => y.match_id === item),
    }),
  );
  const playersAlliesTeamGame = [];
  const playersEnemyTeamGame = [];
  const uniqueAlliesPlayers = new Set();
  const uniqueEnemyPlayers = new Set();
  let person;

  const uniqueInfosAbility = {};
  const uniqueInfosItem = {};
  const uniqueInfosItemUsed = {};

  matches.map((item) => {
    const [{player_slot, win, profile}] = item.players.filter((x) => x.account_id === account_id);
    console.log(item);
    person = profile;

    item.players.map((x) => {
      if (x.account_id > 150 && x.account_id !== account_id) {
        let teamGame;

        if (x.player_slot < 100 && player_slot < 100 || x.player_slot > 100 && player_slot > 100) {
          teamGame = playersAlliesTeamGame;
          uniqueAlliesPlayers.add(x.account_id);
        } else {
          teamGame = playersEnemyTeamGame;
          uniqueEnemyPlayers.add(x.account_id);
        }

        teamGame.push({profile: x.profile, win: win === 0 ? 1 : 0});
      } else if (x.account_id === account_id ) {
        if (!uniqueInfosAbility[x.ability_0]) {
          uniqueInfosAbility[x.ability_0] = {win: x.win, count: 1};
        } else {
          uniqueInfosAbility[x.ability_0].win += x.win;
          uniqueInfosAbility[x.ability_0].count += 1;
        }
        if (!uniqueInfosAbility[x.ability_1]) {
          uniqueInfosAbility[x.ability_1] = {win: x.win, count: 1};
        } else {
          uniqueInfosAbility[x.ability_1].win += x.win;
          uniqueInfosAbility[x.ability_1].count += 1;
        }
        if (!uniqueInfosAbility[x.ability_2]) {
          uniqueInfosAbility[x.ability_2] = {win: x.win, count: 1};
        } else {
          uniqueInfosAbility[x.ability_2].win += x.win;
          uniqueInfosAbility[x.ability_2].count += 1;
        }
        if (!uniqueInfosAbility[x.ability_3]) {
          uniqueInfosAbility[x.ability_3] = {win: x.win, count: 1};
        } else {
          uniqueInfosAbility[x.ability_3].win += x.win;
          uniqueInfosAbility[x.ability_3].count += 1;
        }
        if (!uniqueInfosItem[x.item_0]) {
          uniqueInfosItem[x.item_0] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_0].win = x.win;
          uniqueInfosItem[x.item_0].count += 1;
        }
        if (!uniqueInfosItem[x.item_1]) {
          uniqueInfosItem[x.item_1] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_1].win = x.win;
          uniqueInfosItem[x.item_1].count += 1;
        }
        if (!uniqueInfosItem[x.item_2]) {
          uniqueInfosItem[x.item_2] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_2].win = x.win;
          uniqueInfosItem[x.item_2].count += 1;
        }
        if (!uniqueInfosItem[x.item_3]) {
          uniqueInfosItem[x.item_3] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_3].win = x.win;
          uniqueInfosItem[x.item_3].count += 1;
        }
        if (!uniqueInfosItem[x.item_4]) {
          uniqueInfosItem[x.item_4] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_4].win = x.win;
          uniqueInfosItem[x.item_4].count += 1;
        }
        if (!uniqueInfosItem[x.item_5]) {
          uniqueInfosItem[x.item_5] = {win: x.win, count: 1};
        } else {
          uniqueInfosItem[x.item_5].win = x.win;
          uniqueInfosItem[x.item_5].count += 1;
        }
        if (!uniqueInfosItemUsed['moonshard']) {
          uniqueInfosItemUsed['moonshard'] = x.moonshard;
        } else {
          uniqueInfosItemUsed['moonshard'] += x.moonshard;
        }
        if (!uniqueInfosItemUsed['aghanims_scepter']) {
          uniqueInfosItemUsed['aghanims_scepter'] = x.aghanims_scepter;
        } else {
          uniqueInfosItemUsed['aghanims_scepter'] += x.aghanims_scepter;
        }
        if (!uniqueInfosItemUsed['aghanims_shard']) {
          uniqueInfosItemUsed['aghanims_shard'] = x.aghanims_shard;
        } else {
          uniqueInfosItemUsed['aghanims_shard'] += x.aghanims_shard;
        }
        console.log(!uniqueInfosAbility[x.ability_0], uniqueInfosAbility[x.ability_0]);
        console.log(uniqueInfosAbility);
      }
    });
  });
  const alliesPlayers = await orderAlliesEnemy(uniqueAlliesPlayers, playersAlliesTeamGame);
  const enemyPlayers = await orderAlliesEnemy(uniqueEnemyPlayers, playersEnemyTeamGame);
  return {alliesPlayers, enemyPlayers, profile: person, uniqueInfosItem, uniqueInfosItemUsed, uniqueInfosAbility};
}

async function orderAlliesEnemy(playersUnique, gamed) {
  const uniqueToArray = Array.from(playersUnique);
  const PlayersWinRate = [];
  uniqueToArray.map((id) => {
    let win = 0;
    let loss = 0;
    const [{profile}] = gamed
        .filter((x) => x.profile.account_id === id)
        .map((x) => {
          if (x.win === 1) {
            win++;
          } else {
            loss++;
          }
          return x;
        });
    PlayersWinRate.push({
      profile,
      win,
      loss,
      matches: win + loss,
      winRate: Math.floor((win / (win + loss)) * 10000) / 100,
    });
  });
  const PlayersOrder = PlayersWinRate.sort((a, b) => {
    if (a.matches > b.matches) return -1;
    if (a.matches < b.matches) return 1;
    return 0;
  });
  return PlayersOrder;
}
