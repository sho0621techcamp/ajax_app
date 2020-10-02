function check() {

  // 表示されているすべてのメモを取得
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) { 
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");

    // メモをクリックした場合に実行する処理を定義
    post.addEventListener("click", () => { 

      // どのメモをクリックしたのか。カスタムデータを利用して取得
      const postId = post.getAttribute("data-id");

      // Ajaxに必要なオブジェクトを生成
      const XHR = new XMLHttpRequest();

      // openでリクエストを初期化
      XHR.open("GET", `/posts/${postId}`, true);

      //レスポンスのタイプを指定
      XHR.responseType = "json";

      // sendでリクエストを送信
      XHR.send();

      // レスポンスの受け取り時の処理を記述
      XHR.onload = () => {
        if (XHR.status != 200) {

          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージ をアラートで表示
          alert(`Error ${XHR.status}: ${XHR.statusText}`);

          // 処理の終了
          return null;
        }

        // レスポンスされたデータを変数itemに代入
        const item = XHR.response.post;
        if (item.checked === true) {

          // 既読状態であれば、灰色に変わるCSSを適当するためのカスタムデータの追加
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {

          // 未読状態であれば、カスタムデータを削除
          post.removeAttribute("data-check");
        }
      };
     });
   });
}setInterval(check, 1000);