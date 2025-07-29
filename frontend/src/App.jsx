import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import TableView from './components/TableView';
import KPICards from './components/KPICards';
import Charts from './components/Charts';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [insights, setInsights] = useState('');

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📊 AI Analytics Dashboard</h1>
      <FileUpload setCsvData={setCsvData} setInsights={setInsights} />
      {csvData.length > 0 && (
        <>
          <KPICards data={csvData} />
          <TableView data={csvData} />
          <Charts data={csvData} />
          <h2>🤖 Gemini Insights</h2>
          <pre style={{ background: '#f5f5f5', padding: '1rem' }}>{insights}</pre>
        </>
      )}
    </div>
  );
}

export default App;
