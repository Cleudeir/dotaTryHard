export default function useMatches() {
  function colorWinStyle(win) {
    const backgroundColor = win === 0 ? 'rgba(234, 67, 53, 0.3)' : 'rgba(58, 182, 132, 0.3)';
    const whiteSpace = 'nowrap';
    return {backgroundColor, whiteSpace};
  }
  const objType = [
    {type: 'kills', name: 'Kills'},
    {type: 'deaths', name: 'Deaths'},
    {type: 'assists', name: 'Assis'},
    {type: 'last_hits', name: 'Lasts'},
    {type: 'denies', name: 'Denies'},
    {type: 'gold_per_min', name: 'GPM'},
    {type: 'xp_per_min', name: 'XPM'},
    {type: 'hero_damage', name: 'Hero'},
    {type: 'tower_damage', name: 'Tower'},
    {type: 'net_worth', name: 'netWorth'},
    {type: 'hero_healing', name: 'Heal'},
    {type: 'Hero_level', name: 'Level'},
  ];

  const objItemsUsed = [
    {img: 'ultimate_scepter', name: 'aghanims_scepter'},
    {img: 'aghanims_shard', name: 'aghanims_shard'},
    {img: 'moon_shard', name: 'moonshard'},
  ]

  return {colorWinStyle, objType, objItemsUsed};
}
