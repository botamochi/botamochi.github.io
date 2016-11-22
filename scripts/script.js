// メニューを自動で追加
window.onload = function()
{
    var div = document.getElementsByClassName("wrapper")[0];
    var menu = document.createElement("div");
    menu.classList.add("side-menu");
    // コンテンツ
    var ul1 = document.createElement("ul");
    var li11 = document.createElement("li");
    var a11 = document.createElement("a");
    a11.setAttribute("href", path + "../index.html");
    a11.innerHTML = "HOME";
    li11.appendChild(a11);
    ul1.appendChild(li11);
    var li12 = document.createElement("li");
    var a12 = document.createElement("a");
    a12.setAttribute("href", path + "analysis.html");
    a12.innerHTML = "解析データ";
    li12.appendChild(a12);
    ul1.appendChild(li12);
    var li13 = document.createElement("li");
    var a13 = document.createElement("a");
    a13.setAttribute("href", path + "creation.html");
    a13.innerHTML = "制作物"
    li13.appendChild(a13);
    ul1.appendChild(li13);
    menu.appendChild(ul1);
    // 記事のリスト
    var ul2 = document.createElement("ul");
    if (pagetype == "creation") {
	var li21 = document.createElement("li");
	var a21 = document.createElement("a");
	a21.setAttribute("href", path + "#");
	a21.innerHTML = "初代ギア用サンドバッグ";
	li21.appendChild(a21);
	ul2.appendChild(li21);
	var li22 = document.createElement("li");
	var a22 = document.createElement("a");
	a22.setAttribute("href", path + "#");
	a22.innerHTML = "初代ギア無線化回路";
	li22.appendChild(a22);
	ul2.appendChild(li22);
	var li23 = document.createElement("li");
	var a23 = document.createElement("a");
	a23.setAttribute("href", path + "#");
	a23.innerHTML = "デジモンデスクトップアクセサリ";
	li23.appendChild(a23);
	ul2.appendChild(li23);
    } else if (pagetype == "analysis") {
	var li21 = document.createElement("li");
	var a21 = document.createElement("a");
	a21.setAttribute("href", path + "analysis/dlink.html");
	a21.innerHTML = "D-Link";
	li21.appendChild(a21);
	ul2.appendChild(li21);
    }
    menu.appendChild(ul2);

    var clr = document.createElement("div");
    clr.classList.add("clear");
    div.appendChild(menu);
    div.appendChild(clr);
}
