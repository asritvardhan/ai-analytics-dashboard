const fs = require('fs');
const parseCSV = require('../utils/parseCSV');
const getInsights = require('../gemini/promptGemini');

exports.analyzeCSV = async (req, res) => {
  try {
    const filePath = req.file.path;
    const data = await parseCSV(filePath);
    fs.unlinkSync(filePath); // remove uploaded file

    console.log("✅ Parsed CSV top 5 rows:", data.slice(0, 5)); // 👈 Add this line

    if (!data || data.length === 0) {
      return res.status(400).json({ error: 'CSV is empty or invalid' });
    }

    const top5 = data.slice(0, 5);
    const insights = await getInsights(top5);
    res.json({ top5, insights });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to analyze CSV' });
  }
};
