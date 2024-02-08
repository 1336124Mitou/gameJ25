const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3;
let dy = -3;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

const brickRowCount = 6;
const brickColumnCount = 10;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

let rightPressed = false;
let leftPressed = false;

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const brick = bricks[c][r];
            if (brick.status == 1) {
                if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
                    dy = -dy;
                    brick.status = 0;
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FF4433";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#000000";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            gameOver(); // ゲームオーバー処理を呼び出す
            return; // ゲームオーバーなので以降の処理はスキップ
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;

    if (y + dy > canvas.height) { // ボールがキャンバスの下端に到達した場合
        gameOver(); // ゲームオーバー処理を呼び出す
        return; // ゲームオーバーなので以降の処理はスキップ
    }

    requestAnimationFrame(draw);
}

// ゲーム開始前のカウントダウン
function startCountdown() {
    let count = 3; // カウントダウンの初期値
    const countdownInterval = setInterval(function () {
        if (count > 0) {
            alert(count); // 現在のカウントを表示
            count--; // カウントを減らす
        } else {
            clearInterval(countdownInterval); // インターバルを停止
            draw(); // カウントダウンが終了したらゲームを開始
        }
    }, 1000); // インターバルは1秒ごとに
}



function gameOver() {
    alert("ゲームオーバー");
    document.location.reload();
}

startCountdown(); // ゲーム開始前にカウントダウンを開始
