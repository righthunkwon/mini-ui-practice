// (1) 메인화면 페이지 새로고침
const refresh = () => {
    const header = document.querySelector("#header-link");
    header.addEventListener("click", function (e) {
        e.preventDefault(); // 기본 링크 동작 방지
        location.reload(); // 페이지 새로고침
    });
}
refresh(); // 함수 호출

// (2) intro -> game 화면 버튼 동작
const gameStart = () => {
    const intro = document.querySelector('.intro');
    const game = document.querySelector('.game');
    const startBtn = document.querySelector('#startBtn');

    intro.classList.add('hidden');
    game.style.display = "block";
}

// (3) 게임 기능 구현

// 사용변수
const GAME_TIME = 4;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

// 초기값 세팅
function init() {
    getWords();
    wordInput.addEventListener('input', checkMatch)
}
init();

// 게임 실행
function run() {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus(); // 마우스 포커스
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임 중...')
}

// 게임 상태 확인
function checkStatus() {
    if (!isPlaying && time === 0) {
        buttonChange("게임 시작");
        clearInterval(checkInterval);
        score = 0;
    }
}

// 단어 불러오기 & 게임 시작 & axios 라이브러리로 random word API 활용
function getWords() {
    axios.get('https://random-word-api.vercel.app/api?words=100')
        .then(function (response) {
            // handle success
            words = response.data;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    buttonChange('게임 시작');
}

// 단어 일치
function checkMatch() {
    if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
        wordInput.value = ""; // 점수가 올라갔을 때 input 창 초기화

        // 게임이 실행되지 않았을 때 단어를 입력할 경우 점수를 올리지 않고 함수 종료
        if (!isPlaying) {
            return;
        }

        // 점수 상승
        score++;
        scoreDisplay.innerText = score;

        // 시간 초기화
        time = GAME_TIME;

        // 새로운 단어 생성
        const randomIndex = Math.floor(Math.random() * words.length);
        wordDisplay.innerText = words[randomIndex];
    }
};

function countDown() {
    time > 0 ? time-- : isPlaying = false;
    if (!isPlaying) {
        clearInterval(timeInterval)
    }
    timeDisplay.innerText = time;
}

function buttonChange(text) {
    button.innerText = text;
    text === '게임 시작' ? button.classList.remove('loading') : button.classList.add('loading');
}