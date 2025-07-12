const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 4001;

app.use(cors());
app.use(bodyParser.json());

app.post("/save-interview", (req, res) => {
  const { index, question, stt, expression } = req.body;

  // 백엔드에서 수신 내용 명확하게 로그 출력
  console.log("\n===== 면접 데이터 수신 =====");
  console.log("질문 인덱스:", index);
  console.log("질문 내용:", question);
  console.log("STT 답변:", stt);
  console.log("표정 분석:", expression);
  console.log("================================");

  // 저장 내용 구성
  const logEntry = {
    timestamp: new Date().toISOString(),
    index,
    question,
    stt,
    expression,
  };

  fs.appendFile("interview_log.txt", JSON.stringify(logEntry) + "\n", (err) => {
    if (err) {
      console.error("파일 저장 실패:", err);
      return res.status(500).json({ success: false });
    }
    console.log("데이터가 interview_log.txt에 저장되었습니다.");
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`서버 실행중: http://localhost:${PORT}`);
});
