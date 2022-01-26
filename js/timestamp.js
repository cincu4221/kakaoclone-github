const timestamp = document.querySelector(".chat__timestamp span");
const week = ["일", "월", "화", "수", "목", "금", "토"];

function getDate() {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());
    timestamp.innerText = `${year}년 ${month}월 ${day}일 ${week[(date.getDay())]}요일`
}

getDate();