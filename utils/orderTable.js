export default function orderTable(type, e, isData, setData) {
  setData([]);
  setTimeout(() => {
    const target = e.target.parentElement.parentElement.parentElement.parentElement;
    target.scrollIntoView();
    const save = [...isData];
    const text = e.target.innerHTML;
    const name = text.slice(0, text.length - 1);
    const filterDirection = text.slice(-1);

    const prop = type.split(".");
    if (prop.length === 1) {
      const _sort = save.sort((a, b) => {
        if (filterDirection === "↓") {
          return a[type] > b[type] ? -1 : a[type] < b[type] ? 1 : 0;
        } else {
          return a[type] < b[type] ? -1 : a[type] > b[type] ? 1 : 0;
        }
      });
      e.target.innerHTML = `${name} ${filterDirection === "↓" ? "↑" : "↓"}`;
      setData(_sort.slice(0, 20));
    }
    if (prop.length === 2) {
      const sortDirection = filterDirection === "↓" ? 1 : -1;
      const _sort = save.sort((a, b) => {
        if (a[prop[0]][prop[1]] > b[prop[0]][prop[1]]) {
          return sortDirection;
        }
        if (a[prop[0]][prop[1]] < b[prop[0]][prop[1]]) {
          return -sortDirection;
        }
        return 0;
      });

      e.target.innerHTML = `${name} ${filterDirection === "↓" ? "↑" : "↓"}`;
      setData(_sort.slice(0, 20));
    }
  }, 100);
}
