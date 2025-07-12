let recognition;
let finalText = '';



const interviewStart = document.querySelector('.interviewStart');
const interviewEnd = document.querySelector('.interviewEnd');

interviewStart.addEventListener("click", () => {
    // 이미 recognition이 있으면 그냥 시작
    if (recognition) {
        recognition.start();
        console.log("stt 켜짐");  
        return;
    }

    // 새 인식기 생성
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onresult = function (e) {
        let transcript = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
            transcript += e.results[i][0].transcript;
        }

        finalText = transcript;
        console.log("stt:", finalText);
    };

    recognition.onerror = function (e) {
        console.error('음성인식 오류', e.error);
    };

    recognition.onstart = function () {
        console.log("stt 켜짐");  
    };

    recognition.start();
});

interviewEnd.addEventListener("click", () => {
  if (recognition) {
    recognition.onend = function () {
      const trimmedText = finalText.trim();
      sttAnswers[currentQuestionIndex] = trimmedText;

      const data = {
        index: currentQuestionIndex,
        question: questions[currentQuestionIndex] || "질문 없음",
        stt: trimmedText || "음성 없음",
        expression: getMostFrequentExpression() || "표정 없음",
      };

      fetch("http://localhost:4001/save-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("✅ 백엔드 응답:", res);
          expressionResult.innerText =
            "가장 많이 지은 표정: " + data.expression;

          // ✅ 질문 넘기기
          nextQuestion();
        })
        .catch((err) => console.error("전송 실패:", err));
    };

    recognition.stop();
  }
});
  