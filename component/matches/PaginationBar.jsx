/* eslint-disable react/react-in-jsx-scope */
import Pagination from 'react-bootstrap/Pagination';
function PaginationBar({page, setPage, data}) {
  return (
    <Pagination>
      <Pagination.First
        onClick={() => {
          setPage(0);
        }}
      />
      <Pagination.Prev
        onClick={() => {
          if (page > 0) {
            setPage((e) => e - 1);
          }
        }}
      />
      {[3, 2, 1].map((index) => {
        if (page - index >= 0) {
          return (
            <Pagination.Item
              key={index + 'page'}
              onClick={(e) => {
                setPage(Number(e.target.innerHTML) - 1);
              }}
            >
              {page - index + 1}
            </Pagination.Item>
          );
        }
      })}
      <Pagination.Item active>{page + 1}</Pagination.Item>
      {[1, 2, 3].map((index) => {
        if (index + page < data.matches.length) {
          return (
            <Pagination.Item
              key={index + 'page1'}
              onClick={(e) => {
                setPage(Number(e.target.innerHTML) - 1);
              }}
            >
              {index + page + 1}
            </Pagination.Item>
          );
        }
      })}
      <Pagination.Next
        onClick={() => {
          if (page + 1 < data.matches.length) {
            setPage((e) => e + 1);
          }
        }}
      />
      <Pagination.Last
        onClick={() => {
          setPage(data.matches.length - 1);
        }}
      />
    </Pagination>
  );
}

export default PaginationBar;
