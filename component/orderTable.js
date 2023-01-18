export default function orderTable(type, e, useData, setData) {
  e.target.parentElement.parentElement.parentElement.parentElement.scrollIntoView();
  const save = useData;
  const [name, filterDirection] = e.target.innerHTML.split(' ');
  const prop = type.split('.');
  if (prop.length === 1) {
    if (filterDirection === '↓') {
      const _sort = save.sort(function(a, b) {
        if (a[type] > b[type]) {
          return -1;
        }
        if (a[type] < b[type]) {
          return 1;
        }
        return 0;
      });
      e.target.innerHTML = `${name} ↑`;
      setData(save.slice(0, 20));
      setTimeout(() => {
        setData(_sort);
      }, 300);
    }
    if (filterDirection === '↑') {
      const _sort = save.sort(function(a, b) {
        if (a[type] < b[type]) {
          return -1;
        }
        if (a[type] > b[type]) {
          return 1;
        }
        return 0;
      });
      e.target.innerHTML = `${name} ↓`;
      setData(save.slice(0, 20));
      setTimeout(() => {
        setData(_sort);
      }, 300);
    }
  }

  if (prop.length === 2) {
    if (filterDirection === '↓') {
      const _sort = save.sort(function(a, b) {
        if (a[prop[0]][prop[1]] > b[prop[0]][prop[1]]) {
          return -1;
        }
        if (a[prop[0]][prop[1]] < b[prop[0]][prop[1]]) {
          return 1;
        }
        return 0;
      });
      e.target.innerHTML = `${name} ↑`;
      setData(save.slice(0, 20));
      setTimeout(() => {
        setData(_sort);
      }, 300);
    }
    if (filterDirection === '↑') {
      const _sort = save.sort(function(a, b) {
        if (a[prop[0]][prop[1]] < b[prop[0]][prop[1]]) {
          return -1;
        }
        if (a[prop[0]][prop[1]] > b[prop[0]][prop[1]]) {
          return 1;
        }
        return 0;
      });
      e.target.innerHTML = `${name} ↓`;
      setData(save.slice(0, 20));
      setTimeout(() => {
        setData(_sort);
      }, 300);
    }
  }
}
