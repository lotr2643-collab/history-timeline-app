const events = [
  {
    year: -221,
    title: "진의 중국 통일",
    region: "동아시아",
    summary: "진시황이 전국시대를 끝내고 중국을 통일하였다.",
    detail: "문자, 화폐, 도량형의 통일은 이후 중국 제국 체제의 기반이 되었다. 중앙집권적 통치 방식도 후대 왕조에 큰 영향을 주었다."
  },
  {
    year: 622,
    title: "히즈라와 이슬람 공동체 형성",
    region: "중동·이슬람권",
    summary: "무함마드가 메카에서 메디나로 이주하며 이슬람 공동체가 본격적으로 형성되었다.",
    detail: "622년은 이슬람력의 출발점이다. 종교 공동체가 정치 공동체로 발전하는 중요한 전환점이었다."
  },
  {
    year: 751,
    title: "탈라스 전투",
    region: "중동·이슬람권",
    summary: "아바스 왕조와 당이 중앙아시아에서 충돌한 전투이다.",
    detail: "이 전투는 중앙아시아의 세력 균형 변화와 종이 제작 기술의 전파 문제와 관련해 자주 언급된다."
  },
  {
    year: 1095,
    title: "제1차 십자군 선포",
    region: "유럽",
    summary: "교황 우르바누스 2세가 클레르몽 공의회에서 십자군 원정을 호소하였다.",
    detail: "종교적 열정, 봉건 사회의 팽창, 교황권 강화가 결합된 사건으로 볼 수 있다."
  },
  {
    year: 1206,
    title: "칭기즈 칸 즉위",
    region: "세계사",
    summary: "테무친이 몽골 부족을 통합하고 칭기즈 칸으로 추대되었다.",
    detail: "몽골 제국은 유라시아 교류를 확대했고, 팍스 몽골리카라고 불리는 장거리 교역과 이동의 조건을 만들었다."
  },
  {
    year: 1453,
    title: "콘스탄티노폴리스 함락",
    region: "중동·이슬람권",
    summary: "오스만 제국이 비잔티움 제국의 수도 콘스탄티노폴리스를 점령하였다.",
    detail: "이 사건은 동로마 제국의 종말이자 오스만 제국이 지중해 세계의 강대국으로 부상한 상징적 사건이다."
  },
  {
    year: 1517,
    title: "루터의 종교개혁",
    region: "유럽",
    summary: "마르틴 루터가 면벌부 문제를 비판하며 종교개혁의 계기를 만들었다.",
    detail: "종교개혁은 교회 권위, 개인의 신앙, 인쇄술, 정치 권력의 재편과 연결된다."
  },
  {
    year: 1789,
    title: "프랑스 혁명",
    region: "유럽",
    summary: "구체제에 대한 불만이 폭발하며 프랑스 혁명이 시작되었다.",
    detail: "자유, 평등, 국민주권의 언어가 근대 정치의 중심 개념으로 확산되는 계기가 되었다."
  },
  {
    year: 1876,
    title: "강화도조약",
    region: "동아시아",
    summary: "조선이 일본과 체결한 근대적 조약으로, 조선의 개항이 본격화되었다.",
    detail: "불평등조약의 성격을 지니며, 조선이 제국주의 질서 속으로 편입되는 중요한 장면이었다."
  },
  {
    year: 1914,
    title: "제1차 세계대전 발발",
    region: "세계사",
    summary: "유럽의 제국주의 경쟁과 동맹 체제가 충돌하며 세계대전이 시작되었다.",
    detail: "전쟁 이후 제국의 해체, 민족주의 확산, 국제질서 재편이 이어졌다."
  }
];

const timeline = document.getElementById("timeline");
const searchInput = document.getElementById("searchInput");
const regionFilter = document.getElementById("regionFilter");
const resetBtn = document.getElementById("resetBtn");
const eventCount = document.getElementById("eventCount");
const oldestYear = document.getElementById("oldestYear");
const latestYear = document.getElementById("latestYear");
const quizBtn = document.getElementById("quizBtn");
const answerBtn = document.getElementById("answerBtn");
const quizQuestion = document.getElementById("quizQuestion");
const quizAnswer = document.getElementById("quizAnswer");

let currentQuiz = null;

function yearText(year) {
  return year < 0 ? `기원전 ${Math.abs(year)}년` : `${year}년`;
}

function render() {
  const keyword = searchInput.value.trim().toLowerCase();
  const region = regionFilter.value;

  const filtered = events.filter(event => {
    const text = `${event.title} ${event.summary} ${event.detail} ${event.region}`.toLowerCase();
    const matchesKeyword = text.includes(keyword);
    const matchesRegion = region === "all" || event.region === region;
    return matchesKeyword && matchesRegion;
  });

  timeline.innerHTML = "";

  if (filtered.length === 0) {
    timeline.innerHTML = `<div class="event-card"><h3>검색 결과가 없습니다.</h3><p>다른 키워드나 지역을 선택해보세요.</p></div>`;
  }

  filtered.forEach(event => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML = `
      <div class="event-top">
        <span class="year">${yearText(event.year)}</span>
        <span class="region">${event.region}</span>
      </div>
      <h3>${event.title}</h3>
      <p>${event.summary}</p>
      <div class="more">${event.detail}</div>
    `;
    card.addEventListener("click", () => card.classList.toggle("open"));
    timeline.appendChild(card);
  });

  eventCount.textContent = filtered.length;
  oldestYear.textContent = filtered.length ? yearText(Math.min(...filtered.map(e => e.year))) : "-";
  latestYear.textContent = filtered.length ? yearText(Math.max(...filtered.map(e => e.year))) : "-";
}

function makeQuiz() {
  currentQuiz = events[Math.floor(Math.random() * events.length)];
  quizQuestion.textContent = `다음 설명에 해당하는 사건은? “${currentQuiz.summary}”`;
  quizAnswer.textContent = "";
}

function showAnswer() {
  if (!currentQuiz) {
    quizAnswer.textContent = "먼저 문제 내기 버튼을 눌러주세요.";
    return;
  }
  quizAnswer.textContent = `정답: ${currentQuiz.title} (${yearText(currentQuiz.year)})`;
}

searchInput.addEventListener("input", render);
regionFilter.addEventListener("change", render);
resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  regionFilter.value = "all";
  render();
});
quizBtn.addEventListener("click", makeQuiz);
answerBtn.addEventListener("click", showAnswer);

render();
