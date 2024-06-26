import {useEffect, useState} from 'react';
import orderTable from '../../utils/orderTable';

export default function useRanking({regionData}) {
  const [isRegion, setRegion] = useState(1);
  const [isData, setData] = useState(false);

  useEffect(() => {
    if (regionData && isRegion) setData(regionData[isRegion]);
  }, [regionData, isRegion]);

  function filterRegion(region) {
    setRegion(region);
    setData(regionData[region]);
  }

  function filterName(e) {
    const useSave = regionData[isRegion];
    if (useSave) {
      const _save = useSave.filter((x) => x.profile.personaname.toUpperCase().includes(e.toUpperCase()));
      const sort = _save.sort((a, b) => {
        const fa = a.profile.personaname.length;
        const fb = b.profile.personaname.length;
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      const slice = sort.slice(0, 20);
      setData(slice);
    }
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
