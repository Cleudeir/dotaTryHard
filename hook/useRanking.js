import {useEffect, useState} from 'react';
import orderTable from '../component/Math/orderTable';

export default function useRanking({regionData}) {
  const [isRegion, setRegion] = useState(1);
  const [isData, setData] = useState(false);

  useEffect(() => {
    setData(regionData[isRegion].slice(0, 300));
  }, []);

  function filterRegion(region) {
    setData(regionData[region].slice(0, 30).map((x, i) => ({...x, pos: i + 1})));
    setRegion(region);
    setTimeout(() => {
      setData(
          regionData[region].slice(0, 300).map((x, i) => ({...x, pos: i + 1})),
      );
    }, 1000);
  }

  function filterName(e) {
    const useSave = regionData[isRegion];
    if (useSave) setData(useSave.filter((x) => x.profile.personaname.toUpperCase().includes(e.toUpperCase())).slice(0, 300));
  }
  function order(type, e) {
    console.log('type, e: ', type, e);
    orderTable({type, e, isData, setData});
  }

  return {filterRegion, isData, setData, filterName, order, isRegion};
}
