export default function orderTable(type, e, isData, setData, listLength) {
  setData([]);
  setTimeout(() => {
    const target = e.target.parentElement.parentElement.parentElement.parentElement;
    target.scrollIntoView();
    const save = isData;
    const [name, filterDirection] = e.target.innerHTML.split(' ');
    const prop = type.split('.');
    if (prop.length === 1) {
      const _sort = save.sort((a, b) => {
        if (filterDirection === '↓') {
          return a[type] > b[type] ? -1 : a[type] < b[type] ? 1 : 0;
        } else {
          return a[type] < b[type] ? -1 : a[type] > b[type] ? 1 : 0;
        }
      });
      e.target.innerHTML = `${name} ${filterDirection === '↓' ? '↑' : '↓'}`;
      setData(_sort.slice(0, listLength));
    }
    if (prop.length === 2) {
      const sortDirection = filterDirection === '↓' ? 1 : -1;
      const _sort = save.sort((a, b) => {
        if (a[prop[0]][prop[1]] > b[prop[0]][prop[1]]) {
          return sortDirection;
        }
        if (a[prop[0]][prop[1]] < b[prop[0]][prop[1]]) {
          return -sortDirection;
        }
        return 0;
      });

      e.target.innerHTML = `${name} ${filterDirection === '↓' ? '↑' : '↓'}`;
      setData(_sort.slice(0, listLength));
    }
  }, 50);
}
