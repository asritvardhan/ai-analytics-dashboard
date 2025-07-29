from flask import Flask, request, jsonify
from flask_cors import CORS
from google.generativeai import GenerativeModel, configure
from dotenv import load_dotenv
import pandas as pd
import os
import uuid

# Load .env variables
load_dotenv()
configure(api_key=os.getenv("GEMINI_API_KEY"))

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def generate_insights(sample_df):
    try:
        json_data = sample_df.to_dict(orient="records")
        prompt = (
            f"You are a data analyst. Here's a small sample of a CSV dataset:\n"
            f"{json_data}\n\n"
            "Generate useful, high-level insights, trends, or patterns in bullet points."
        )
        model = GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print("Gemini Error:", e)
        return "AI insight generation failed."

@app.route('/api/upload', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Save file temporarily
    file_path = os.path.join(UPLOAD_FOLDER, f"{uuid.uuid4()}.csv")
    file.save(file_path)

    try:
        df = pd.read_csv(file_path)
        os.remove(file_path)  # Clean up
        columns = df.columns.tolist()
        full_data = df.to_dict(orient='records')
        sample_data = df.head(5)
        insights = generate_insights(sample_data)

        return jsonify({
            'columns': columns,
            'data': full_data,
            'insights': insights
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
