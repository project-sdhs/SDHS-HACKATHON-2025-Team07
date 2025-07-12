// 피드백 리스트를 localStorage에서 불러오는 함수 (방어코드 포함)
function loadFeedbackFromStorage() {
  let data = localStorage.getItem("feedbackList");
  try {
    return data ? JSON.parse(data) : [];
  } catch {
    // 파싱 에러 발생 시 빈 배열 반환
    return [];
  }
}

// 피드백 리스트를 화면에 출력하는 함수
function renderFeedbackList() {
  // 최신 데이터 항상 로드
  feedbackList = loadFeedbackFromStorage();

  const listContent = document.querySelector(".list-content");
  if (!listContent) return;

  listContent.innerHTML = ""; // 기존 내용 초기화

  feedbackList.forEach((item, index) => {
    const container = document.createElement("div");

    container.style.width = "95%";
    container.style.height = "50px";
    container.style.backgroundColor = "rgba(255, 255, 255, 0.281)";
    container.style.border = "1px solid white";
    container.style.marginBottom = "10px";
    container.style.zIndex = "3";
    container.style.color = "#FFFFFF";
    container.style.borderRadius = "10px";
    container.style.margin = "15px";
    container.style.cursor = "pointer";
    container.style.lineHeight = "50px";
    container.style.paddingLeft = "10px";

    container.textContent = item.date || "날짜 없음";

    // 클릭 시 모달 열기
    container.addEventListener("click", () => {
      document.getElementById("feedbackListModal").style.display = "block";
      document.getElementById("feedbackListModalContent").innerText =
        item.content || "내용 없음";
    });

    listContent.appendChild(container);
  });
}

// 서버에서 피드백 받아와 로컬스토리지에 저장하는 함수 (피드백 받기 버튼 클릭 시 호출)
async function addList() {
  try {
    const response = await fetch("http://localhost:5002/get_feedback");
    if (!response.ok) throw new Error("서버 응답 오류");

    const text = await response.text();

    if (!text.trim()) {
      alert("받아온 피드백 내용이 없습니다.");
      return;
    }

    const now = new Date();
    const feedbackItem = {
      date: now.toLocaleString(),
      content: text,
    };

    // 최신 localStorage 데이터를 불러온 뒤 push
    const currentList = loadFeedbackFromStorage();

    currentList.push(feedbackItem);
    localStorage.setItem("feedbackList", JSON.stringify(currentList));

    // 리스트 갱신
    renderFeedbackList();
  } catch (err) {
    alert("피드백 로딩 실패: " + err.message);
  }
}

// 전역 변수 선언
let feedbackList = [];

// DOMContentLoaded 시 로컬스토리지에 저장된 피드백 렌더링 및 모달 닫기 이벤트 연결
document.addEventListener("DOMContentLoaded", () => {
  renderFeedbackList();

  const closeBtn = document.getElementById("feedbackListModalClose");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("feedbackListModal").style.display = "none";
    });
  }
});
