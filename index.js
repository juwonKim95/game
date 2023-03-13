// 변수를 할당
// 남은시간,현재점수,최고점수,칸마다,강아지아이콘,게임시간,타이머,랜덤으로 뜨는 위치
const remainingTime = document.querySelector('#remainingTime');
let curScore = document.querySelector('#curScore');
let highScore = document.querySelector('#highScore');
const square = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
var gameTime = null;
var moleTimer = null;
var molePoisiton = null;

// 알림 메세지(최종점수와 최고스코어)
let finalScore = 0;
let newHighScore = 0;

// html파일에 정의된 게임 실행시간을 가져오기
let curTime = remainingTime.textContent;
// 게임이 끝났을때 타이머를 재설정할 수 있도록 시간을 별도의 변수에 저장
startTime = remainingTime.textContent;

// 강아지 아이콘 배치하기위해서 랜덤으로 사각형을 가져오기
function randomSquare() {
    // 아이콘 유무 확인을 위해 사각형 다 지움
    square.forEach(moleClass => {
        moleClass.classList.remove('mole')
    })
    // 계속 9미만인지 확인을 위해 math.floor를 사용해서 임의의 숫자를 확정
    let randomNum = square[Math.floor(Math.random() * 9)];
    randomNum.classList.add('mole');

    // 사용자가 강아지를 클릭했는지 확인할 수 있도록 두더지의 위치아이디를 저장
    molePoisiton = randomNum.id;
}

function startGame() {
    updateMolePos();
    // 게임타이머랑 강아지 움직이는 타이머 동기화
    gameTime = setInterval(gameTimer, 1000);
    gameTimer();
}

// 강아지 움직이기
function updateMolePos() {
    // 3/4초마다 랜덤 제곱 함수를 호출
    moleTimer = setInterval(randomSquare, 750);
}

// 남은 게임시간을 점점 줄여감
function gameTimer() {
    curTime--;
    remainingTime.textContent = curTime;

    // 게임시간 부족할때 확인&알림
    if (curTime === 0){
        // 게임반복간격 멈추기
        clearInterval(gameTime);
        clearInterval(moleTimer);

        // 그리고 새로운 점수가 설정됐는지 확인할려고 최고점수와 비교
        if (finalScore > newHighScore) {
            newHighScore = finalScore;
            highScore.textContent = newHighScore;
            alert('게임끝! 최고점수입니다! ' + newHighScore + ' 점 ');
        } else { // 아니면 
            alert('게임끝! 당신의 점수는 ' + finalScore + '! 최고점수는 ' + newHighScore + '! 다시하기');
        }
        // 타이머와 점수 재설정
        remainingTime.textContent = startTime;
        curTime = remainingTime.textContent;
        finalScore = 0;
        curScore.textContent = finalScore;
    }
}


// 사용자가 사각형을 클릭하는 위치와 시간
square.forEach(clickID => {
    // 마우스를 사용해서 사용자가 마우스를 놓는 사각형을 가져와 클릭 중 맘바뀔 수 있게
    clickID.addEventListener('mouseup', () =>{
        if (clickID.id === molePoisiton) {
            // 최종점수 추가하고 사용자가 볼 수 있게 점수 업데이트
            finalScore = finalScore + 1;
            curScore.textContent = finalScore;
        }
    })
})