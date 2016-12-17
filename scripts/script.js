document.addEventListener( 'DOMContentLoaded', function()
{
    // 横のメニューを追加
    var wrapDiv = document.getElementsByClassName("wrapper")[0];
    var menu = document.createElement("div");
    menu.classList.add("side-menu");
    // コンテンツ
    var ul1 = document.createElement("ul");
    ul1.innerHTML = '<li><b>&lt;&lt; MENU &gt;&gt;</b>';
    ul1.innerHTML += '<hr style="margin: 0px 10px 20px 10px;">';
    ul1.innerHTML += '<li><a href="' + path + '../index.html">TOP</a></li>';
    ul1.innerHTML += '<li><a href="' + path + 'analysis.html">解析データ</a></li>';
    ul1.innerHTML += '<li><a href="' + path + 'creation.html">制作物</a></li>';
    ul1.innerHTML += '<li><a href="http://blogs.yahoo.co.jp/nazonootokoj" target="blank_">ブログ</a></li>'
    menu.appendChild(ul1);
    // 記事のリスト
    var ul2 = document.createElement("ul");
    if (pagetype == "creation") {
	ul2.innerHTML = '<li><b>&lt;&lt; 制作物リスト &gt;&gt;</b>';
	ul2.innerHTML += '<hr style="margin: 0px 10px 20px 10px;">';
	ul2.innerHTML += '<li><a href="' + path + 'creation/sandbag2.html">簡易サンドバッグの作り方</a></li>';
	ul2.innerHTML += '<li><a href="' + path + 'creation/sandbag.html">初代育成ギア用サンドバッグ</a></li>';
	ul2.innerHTML += '<li><a href="' + path + 'creation/irdigimon.html">初代育成ギア無線化回路</a></li>';
	ul2.innerHTML += '<li><a href="' + path + 'creation/taberumon.html">デスクトップアクセサリ</a></li>';
    } else if (pagetype == "analysis") {
	ul2.innerHTML = '<li><b>&lt;&lt; 解析データリスト &gt;&gt;</b>';
	ul2.innerHTML += '<hr style="margin: 0px 10px 20px 10px;">';
	ul2.innerHTML += '<li><a href="' + path + 'analysis/pendulum.html">デジモンペンデュラム</a></li>';
	ul2.innerHTML += '<li><a href="' + path + 'analysis/origin.html">初代デジタルモンスター</a></li>';
	ul2.innerHTML += '<li><a href="' + path + 'analysis/dlink.html">D-Link</a></li>';
    }
    menu.appendChild(ul2);

    var clr = document.createElement("div");
    clr.classList.add("clear");
    wrapDiv.appendChild(menu);
    wrapDiv.appendChild(clr);
    // 戻るリンクを追加
    var mainDiv = document.getElementsByClassName("main")[0];
    var retDiv = document.createElement("div");
    retDiv.style.textAlign = "center";
    if (pagetype == "creation") {
	retDiv.innerHTML = '&lt;&lt; <a href="../creation.html">戻る</a> &gt;&gt;';
    } else if (pagetype == "analysis") {
	retDiv.innerHTML = '&lt;&lt; <a href="../analysis.html">戻る</a> &gt;&gt;';
    }
    mainDiv.appendChild(retDiv);
}, false);
