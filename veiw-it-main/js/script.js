function camera() {
    const $camera = document.querySelector("video");
    const $interview = document.querySelector(".interviewStart");
    const $interviewEnd = document.querySelector(".interviewEnd");
    let stream = null;

    $interview.addEventListener("click", () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then((live) => {
                stream = live;
                $camera.srcObject = stream;
                $camera.play();
            });
        });
    $interviewEnd.addEventListener("click", ()=>{
        // console.log(canvas)
        const $canvass = [...document.querySelectorAll('canvas')]
        $canvass.forEach( $canvas => $canvas.remove() ) 
        


        stream.getTracks().forEach(t => t.stop());
        $camera.srcObject = null;
        handleSubmit();

    })
}





// function basicsAlert() {
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    Swal.fire({
      title: "안녕하세요!",
      text: "면접 시작 버튼을 누른 후, 자기소개를 해주시고 다음 질문 버튼을 눌러주세요.",
      icon: "info",
      confirmButtonText: "확인",
    });
  }, 1500);
});
// }

function start() {
  const $interviewStart = document.querySelector(".interviewStart");
  const $interviewEnd = document.querySelector(".interviewEnd");
  const $textContent = document.querySelector(".textBar")

//   $interviewEnd.addEventListener("click", () => {
//     if (
//       $textContent === "마지막으로 하고 싶은 질문이 있으신가요?" ||
//       "마지막으로 하고 싶은 질문이 있나요?"
//     ) {
//       allCompletedAlert();
//     } else {
//       showAlert();
//     }
//   });
}

start();
camera();
