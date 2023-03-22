import {useEffect, useState} from 'react';
import orderTable from '../component/Math/orderTable';

export default function useRanking({regionData}) {
  const [isRegion, setRegion] = useState(1);
  const [isData, setData] = useState(false);
  const [listLength] = useState(500);
  useEffect(() => {
    setData(regionData[isRegion].slice(0, listLength));
  }, []);

  function filterRegion(region) {
    setData(regionData[region].slice(0, 30).map((x, i) => ({...x, pos: i + 1})));
    setRegion(region);
    setTimeout(() => {
      setData(
          regionData[region].slice(0, listLength).map((x, i) => ({...x, pos: i + 1})),
      );
    }, 1000);
  }

  function filterName(e) {
    const useSave = regionData[isRegion];
    if (useSave) setData(useSave.filter((x) => x.profile.personaname.toUpperCase().includes(e.toUpperCase())).slice(0, 300));
  }
  function order(type, e) {
    orderTable(type, e, isData, setData);
  }

  const objType = [
    {type: 'rankingRate', name: 'Rate'},
    {type: 'matches', name: 'Matches'},
    {type: 'winRate', name: 'WinRate'},
    {type: 'kills', name: 'Kills'},
    {type: 'deaths', name: 'Deaths'},
    {type: 'assists', name: 'Assis'},
    {type: 'last_hits', name: 'Lasts'},
    {type: 'denies', name: 'Denies'},
    {type: 'gold_per_min', name: 'GPM'},
    {type: 'xp_per_min', name: 'XPM'},
    {type: 'tower_damage', name: 'Tower'},
    {type: 'hero_healing', name: 'Heal'},
  ];


  return {filterRegion, objType, isData, setData, filterName, order, isRegion};
}
