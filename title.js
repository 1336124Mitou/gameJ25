// ゲームスタートボタンを取得
const startButton = document.getElementById("startButton");

// ゲームスタートボタンがクリックされた時の処理
startButton.addEventListener("click", () => {
    // ゲーム画面にリダイレクト
    window.location.href = "game02.html";
});
