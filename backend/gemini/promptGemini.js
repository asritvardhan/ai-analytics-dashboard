const axios = require('axios');

module.exports = async function getInsights(data) {
  const table = data.map((row, i) => `${i + 1}. ${JSON.stringify(row)}`).join('\n');

  const prompt = `
You are a professional data analyst.
Analyze the following dataset and give insights based on patterns, anomalies, trends.
Return your response in clear bullet points.

Dataset (Top 5 Rows):
${table}
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return res.data?.candidates?.[0]?.content?.parts?.[0]?.text || '⚠️ Gemini returned no insights.';
  } catch (err) {
    console.error('Gemini Error:', err.response?.data || err.message);
    return '⚠️ Failed to fetch insights from Gemini.';
  }
};
