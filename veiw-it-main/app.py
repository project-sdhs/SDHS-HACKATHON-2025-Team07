from flask import Flask, jsonify, send_from_directory, send_file
from flask_cors import CORS
from gemini import get_questions, generate_feedback_from_log
import os

app = Flask(__name__, static_folder='.')
CORS(app)

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    file_path = os.path.join('.', filename)
    if os.path.isfile(file_path):
        return send_from_directory('.', filename)
    return '파일 없음', 404

@app.route('/questions')
def questions():
    try:
        return jsonify(get_questions())
    except Exception as e:
        return jsonify(["질문 생성 중 오류 발생: " + str(e)]), 500

@app.route('/generate_feedback')
def generate_feedback():
    try:
        return jsonify({"status": "ok", "message": "피드백 생성 완료"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/get_feedback')
def get_feedback():
    generate_feedback_from_log()
    feedback_path = "feedback.txt"

    with open('./interview_log.txt', "w", encoding="utf-8") as f:
        f.write('')
    

    if os.path.exists(feedback_path):
        return send_file(feedback_path, mimetype="text/plain")
    else:
        return "피드백 파일이 존재하지 않습니다.", 404

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5002, debug=True)