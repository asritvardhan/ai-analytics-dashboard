import React from 'react';

const getNumericKPIs = (data) => {
  const numericFields = Object.keys(data[0]).filter((key) =>
    !isNaN(parseFloat(data[0][key]))
  );

  return numericFields.map((key) => {
    const values = data.map((row) => parseFloat(row[key])).filter((v) => !isNaN(v));
    const sum = values.reduce((a, b) => a + b, 0);
    return {
      field: key,
      count: values.length,
      mean: (sum / values.length).toFixed(2),
      min: Math.min(...values),
      max: Math.max(...values),
    };
  });
};

const KPICards = ({ data }) => {
  const kpis = getNumericKPIs(data);

  return (
    <div style={{ display: 'flex', gap: '1rem', margin: '2rem 0', flexWrap: 'wrap' }}>
      {kpis.map((kpi) => (
        <div
          key={kpi.field}
          style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '1rem',
            width: '200px',
          }}
        >
          <h3>{kpi.field}</h3>
          <p>📊 Count: {kpi.count}</p>
          <p>📉 Min: {kpi.min}</p>
          <p>📈 Max: {kpi.max}</p>
          <p>🔢 Mean: {kpi.mean}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
