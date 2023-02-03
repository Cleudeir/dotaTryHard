// refactors this code
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
      }
    });
  });

  const alliesPlayers = await orderAlliesEnemy(uniqueAlliesPlayers, playersAlliesTeamGame);
  const enemyPlayers = await orderAlliesEnemy(uniqueEnemyPlayers, playersEnemyTeamGame);
  return {alliesPlayers, enemyPlayers, profile: person};
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
