// ← 여기에 실제 구글폼 entry 코드를 붙여넣으세요!
const entry = {
  name: "entry.1745387052",
  q1: "entry.455908783",
  q2: "entry.1619573470",
  q3: "entry.739288189",
  q4: "entry.110749565",
  q5: "entry.737712642",
  q6: "entry.495362900",
  q7: "entry.758596080",
  q8: "entry.103327156",
  q9: "entry.699264575"
};
const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfgi7ntpJg875Ln8QO9OnG1lQZiArtWdQHJ7TqQNAfJjcDP0Q/viewform?usp=header";

const questions = [
  { q: "이름을 입력하세요.", type: "text" },
  { q: "신 맛을 좋아하나요?", type: "choice", opts: ["예", "아니오"] },
  { q: "과일향보다는 콜라향, 음료향을 더 좋아하나요?", type: "choice", opts: ["예", "아니오", "둘 다 좋아!"] },
  { q: "감초맛을 좋아하나요? 한번도 안 먹어봤다면 도전해보고 싶나요?", type: "choice", opts: ["예", "아니오"] },
  { q: "딱딱한 식감을 좋아하나요?", type: "choice", opts: ["예", "아니오"] },
  { q: "폭신폭신한 마시멜로 같은 식감을 좋아하나요?", type: "choice", opts: ["예", "아니오"] },
  { q: "젤리 안에 필링이 들어 있는 걸 좋아하나요? (예: 과일 필링)", type: "choice", opts: ["예", "아니오"] },
  { q: "캐릭터 모양 젤리를 좋아하나요?", type: "choice", opts: ["예", "아니오"] },
  { q: "맛보다 귀여운 모양이 더 중요한가요?", type: "choice", opts: ["예", "아니오"] },
  { q: "특이한 젤리에 도전해 보고 싶나요?", type: "choice", opts: ["예", "아니오"] }
];

let idx = 0;
let answers = Array(questions.length).fill(null);

function render() {
  const box = document.getElementById("main-box");
  if (idx === 0) {
    box.innerHTML = `
      <label class="name-label">${questions[0].q}</label><br>
      <input type="text" id="nameInput" class="input-box" placeholder="이름">
      <br><button onclick="nextName()">다음</button>
    `;
  } else if (idx < questions.length) {
    const q = questions[idx];
    box.innerHTML = `<div class="question">${idx}. ${q.q}</div>`;
    q.opts.forEach((opt, i) => {
      box.innerHTML += `<button onclick="selectAnswer(${i})">${opt}</button>`;
    });
    if (idx > 1) box.innerHTML += `<button id="backBtn" onclick="back()">← 이전 질문</button>`;
  } else {
    showSubmit();
  }
}

function nextName() {
  const name = document.getElementById('nameInput').value.trim();
  if (!name) return alert("이름 입력하라고!");
  answers[0] = name;
  idx++;
  render();
}

function selectAnswer(i) {
  answers[idx] = questions[idx].opts[i];
  idx++; render();
}

function back() {
  if (idx > 1) idx--; render();
}

function showSubmit() {
  document.getElementById("main-box").innerHTML = `
    <h2>제출하시겠어요?</h2>
    <button onclick="submitNetlifyForm()">결과 확인</button>
    <br><button id="backBtn" onclick="back()">← 이전 질문</button>
  `;
}

function submitNetlifyForm() {
  // Netlify에서 인식하도록 form-name hidden 필드 추가
  const data = new FormData();
  data.append('form-name', 'haribo-survey');
  for (let i = 0; i < answers.length; i++) {
    data.append(`q${i}`, answers[i]);
  }

  // 1. 결과는...(로딩) 바로 띄우기
  document.getElementById("main-box").innerHTML = `
    <h2>결과는...</h2>
    <div class="loader"></div>
  `;

  // 2. Netlify에 비동기 POST (AJAX)
  fetch('/', {
    method: 'POST',
    body: data,
  });

  // 3. 기존처럼 안내문 띄우기
  setTimeout(() => {
    document.getElementById("main-box").innerHTML = `
      <h2>서영이가 한국 오면 확인! ㅎㅎ</h2>
      <div class="result-msg">선물 받을 준비하세요!! (꺄~🙈🎁)</div>
    `;
  }, 2500);
}

render();