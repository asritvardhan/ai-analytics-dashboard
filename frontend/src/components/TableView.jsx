import React from 'react';

const TableView = ({ data }) => {
  const headers = Object.keys(data[0]);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2>📄 Preview Data (Top Rows)</h2>
      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>{headers.map((head) => <th key={head}>{head}</th>)}</tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((row, i) => (
            <tr key={i}>
              {headers.map((col) => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;