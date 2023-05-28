const refresh = () => {
    const header = document.querySelector("#header-link");
    header.addEventListener("click", function (e) {
        e.preventDefault(); // 기본 링크 동작 방지
        location.reload(); // 페이지 새로고침
    });
}

refresh(); // 함수 호출

const gameStart = () => {
    const intro = document.querySelector('.intro');
    const game = document.querySelector('.game');
    const startBtn = document.querySelector('#startBtn');

    intro.classList.add('hidden');
    game.style.display = "block";
}