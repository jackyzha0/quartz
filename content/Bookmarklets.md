---
title: Bookmarklet Collection
compartir: true
---

You may drag the links underneath each heading to your bookmarks bar. This will create a new bookmark with the correct name and URL.

Alternatively, you may copy the code for a bookmarklet and create your own. If you find it easier, you may use this [Bookmarklet Maker](https://caiorss.github.io/bookmarklet-maker/).

## Utilities

### Calculator

<a href="javascript:(function()%7Bjavascript%3Avar%20evl%2Cem%2Cexpr%3Dprompt('Formula…%20(eg%3A%202*3%20%2B%207%2F8)'%2C'')%3Bwith(Math)try%7Bevl%3D%20%20parseFloat(eval(expr))%3Bif(isNaN(evl))%20%7Bthrow%20Error('Not%20a%20number!')%3B%7Dvoid(prompt%20('Result%3A'%20%20%2Cevl))%3B%7Dcatch(em)%7Balert(em)%3B%7D%7D)()%3B">Calculator</a>

```js
javascript: var evl,
  em,
  expr = prompt("Formula... (eg: 2*3 + 7/8)", "");
with (Math)
  try {
    evl = parseFloat(eval(expr));
    if (isNaN(evl)) {
      throw Error("Not a number!");
    }
    void prompt("Result:", evl);
  } catch (em) {
    alert(em);
  }
```

### Find Text and Highlight It

<a href="javascript:(function()%7Bjavascript%3A(function()%7Bvar%20count%3D0%2C%20text%2C%20dv%3Btext%3Dprompt(%22Search%20phrase%3A%22%2C%20%22%22)%3Bif(text%3D%3Dnull%20%7C%7C%20text.length%3D%3D0)return%3BhlColor%3Dprompt(%22Color%3A%22%2C%20%22yellow%22)%3Bdv%3Ddocument.defaultView%3Bfunction%20searchWithinNode(node%2C%20te%2C%20len)%7Bvar%20pos%2C%20skip%2C%20spannode%2C%20middlebit%2C%20endbit%2C%20middleclone%3Bskip%3D0%3Bif(%20node.nodeType%3D%3D3%20)%7Bpos%3Dnode.data.toUpperCase().indexOf(te)%3Bif(pos%3E%3D0)%7Bspannode%3Ddocument.createElement(%22SPAN%22)%3Bspannode.style.backgroundColor%3D%20hlColor%3Bmiddlebit%3Dnode.splitText(pos)%3Bendbit%3Dmiddlebit.splitText(len)%3Bmiddleclone%3Dmiddlebit.cloneNode(true)%3Bspannode.appendChild(middleclone)%3Bmiddlebit.parentNode.replaceChild(spannode%2Cmiddlebit)%3B%2B%2Bcount%3Bskip%3D1%3B%7D%7Delse%20if(%20node.nodeType%3D%3D1%26%26%20node.childNodes%20%26%26%20node.tagName.toUpperCase()!%3D%22SCRIPT%22%20%26%26%20node.tagName.toUpperCase!%3D%22STYLE%22)%7Bfor%20(var%20child%3D0%3B%20child%20%3C%20node.childNodes.length%3B%20%2B%2Bchild)%7Bchild%3Dchild%2BsearchWithinNode(node.childNodes%5Bchild%5D%2C%20te%2C%20len)%3B%7D%7Dreturn%20skip%3B%7Dwindow.status%3D%22Searching%20for%20'%22%2Btext%2B%22'…%22%3BsearchWithinNode(document.body%2C%20text.toUpperCase()%2C%20text.length)%3Bwindow.status%3D%22Found%20%22%2Bcount%2B%22%20occurrence%22%2B(count%3D%3D1%3F%22%22%3A%22s%22)%2B%22%20of%20%2527%22%2Btext%2B%22%2527.%22%3B%7D)()%3B%7D)()%3B">Find Text and Highlight It</a>

```js
javascript: (function () {
  var count = 0,
    text,
    dv;
  text = prompt("Search phrase:", "");
  if (text == null || text.length == 0) return;
  hlColor = prompt("Color:", "yellow");
  dv = document.defaultView;
  function searchWithinNode(node, te, len) {
    var pos, skip, spannode, middlebit, endbit, middleclone;
    skip = 0;
    if (node.nodeType == 3) {
      pos = node.data.toUpperCase().indexOf(te);
      if (pos >= 0) {
        spannode = document.createElement("SPAN");
        spannode.style.backgroundColor = hlColor;
        middlebit = node.splitText(pos);
        endbit = middlebit.splitText(len);
        middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spannode, middlebit);
        ++count;
        skip = 1;
      }
    } else if (
      node.nodeType == 1 &&
      node.childNodes &&
      node.tagName.toUpperCase() != "SCRIPT" &&
      node.tagName.toUpperCase != "STYLE"
    ) {
      for (var child = 0; child < node.childNodes.length; ++child) {
        child = child + searchWithinNode(node.childNodes[child], te, len);
      }
    }
    return skip;
  }
  window.status = "Searching for '" + text + "'...";
  searchWithinNode(document.body, text.toUpperCase(), text.length);
  window.status =
    "Found " +
    count +
    " occurrence" +
    (count == 1 ? "" : "s") +
    " of %27" +
    text +
    "%27.";
})();
```

### First Commit of Repository

<a href="javascript:(function()%7Bjavascript%3A(b%3D%3Efetch('https%3A%2F%2Fapi.github.com%2Frepos%2F'%2Bb%5B1%5D%2B'%2Fcommits%3Fsha%3D'%2B(b%5B2%5D%7C%7C'')).then(c%3D%3EPromise.all(%5Bc.headers.get('link')%2Cc.json()%5D)).then(c%3D%3E%7Bif(c%5B0%5D)%7Bvar%20d%3Dc%5B0%5D.split('%2C')%5B1%5D.split('%3B')%5B0%5D.slice(2%2C-1)%3Breturn%20fetch(d).then(e%3D%3Ee.json())%7Dreturn%20c%5B1%5D%7D).then(c%3D%3Ec.pop().html_url).then(c%3D%3Ewindow.location%3Dc))(window.location.pathname.match(%2F%5C%2F(%5B%5E%5C%2F%5D%2B%5C%2F%5B%5E%5C%2F%5D%2B)(%3F%3A%5C%2Ftree%5C%2F(%5B%5E%5C%2F%5D%2B))%3F%2F))%3B%7D)()%3B">First Commit of Repository</a>

```js
javascript: ((b) =>
  fetch("https://api.github.com/repos/" + b[1] + "/commits?sha=" + (b[2] || ""))
    .then((c) => Promise.all([c.headers.get("link"), c.json()]))
    .then((c) => {
      if (c[0]) {
        var d = c[0].split(",")[1].split(";")[0].slice(2, -1);
        return fetch(d).then((e) => e.json());
      }
      return c[1];
    })
    .then((c) => c.pop().html_url)
    .then((c) => (window.location = c)))(
  window.location.pathname.match(/\/([^\/]+\/[^\/]+)(?:\/tree\/([^\/]+))?/),
);
```

### Tab Title Editor

<a href="javascript:(function()%7Bjavascript%3Avoid(document.title%3Dprompt('Enter%20page%20title')%20%3F%3F%20document.title)%7D)()%3B">Tab Title Editor</a>

```js
javascript: void (document.title =
  prompt("Enter page title") ?? document.title);
```

### Tab Title and Icon Editor

<a href="javascript:(function()%7Bjavascript%3Adocument.title%3Dprompt('Welcome%20to%20the%20Tab%20Cloak%20setup!%5Cn%5CnEnter%20the%20title%20you%20want%20to%20set%20for%20this%20tab%3A%3A')%3Bvar%20icon%3Ddocument.querySelector(%60link%5Brel%3D'icon'%5D%60)%3Bif%20(!icon)%20%7Bicon%20%3D%20document.createElement('link')%3Bicon.rel%3D'icon'%3B%7D%3Bswitch(prompt('What%20icon%20would%20you%20like%20to%20use%3F%5Cn%5Cn%5B1%5D%20Google%20Search%5Cn%5B2%5D%20Google%20Drive%5Cn%5B3%5D%20Custom%20URL%5Cn%5CnPlease%20only%20enter%20a%20number!%2527))%7Bcase%25271%2527%3Aicon.setAttribute(%2527href%2527%2C%2527https%3A%2F%2Fwww.google.com%2Ffavicon.ico%2527)%3Bbreak%3Bcase%25272%2527%3Aicon.setAttribute(%2527href%2527%2C%2527https%3A%2F%2Fssl.gstatic.com%2Fimages%2Fbranding%2Fproduct%2F1x%2Fdrive_2020q4_32dp.png%2527)%3Bbreak%3Bcase%25273%2527%3Aicon.setAttribute(%2527href%2527%2Cprompt(%2527Please%20enter%20the%20URL%20for%20the%20icon%20you%20want%3A%2527))%3B%7D%20document.head.appendChild(icon)%3B%7D)()%3B">Tab Title and Icon Editor</a>

```js
javascript:document.title=prompt('Welcome to the Tab Cloak setup!\n\nEnter the title you want to set for this tab::');var icon=document.querySelector(`link[rel='icon']`);if (!icon) {icon = document.createElement('link');icon.rel='icon';};switch(prompt('What icon would you like to use?\n\n[1] Google Search\n[2] Google Drive\n[3] Custom URL\n\nPlease only enter a number!%27)){case%271%27:icon.setAttribute(%27href%27,%27https://www.google.com/favicon.ico%27);break;case%272%27:icon.setAttribute(%27href%27,%27https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png%27);break;case%273%27:icon.setAttribute(%27href%27,prompt(%27Please enter the URL for the icon you want:%27));} document.head.appendChild(icon);
```

### URL to QR Code

<a href="javascript:(function()%7Bjavascript%3A%20void(()%20%3D%3E%20%7B%20%20%20%20open('https%3A%2F%2Fchart.apis.google.com%2Fchart%3Fcht%3Dqr%26chs%3D300x300%26chld%3DL%7C2%26chl%3D%2527%20%2B%20(prompt(%2527Enter%20text%20for%20QR%20code%3A%2527)%20%3F%3F%20(function()%20%7B%20%20%20%20%20%20%20%20throw%20null%3B%20%20%20%20%7D()))%2C%20null%2C%20%2527location%3Dno%2Cstatus%3Dyes%2Cmenubar%3Dno%2Cscrollbars%3Dno%2Cresizable%3Dyes%2Cwidth%3D500%2Cheight%3D500%2Cmodal%3Dyes%2Cdependent%3Dyes%2527)%7D)()%3B%7D)()%3B">URL to QR Code</a>

```js
javascript: void(() => {    open('https://chart.apis.google.com/chart?cht=qr&chs=300x300&chld=L|2&chl=%27 + (prompt(%27Enter text for QR code:%27) ?? (function() {        throw null;    }())), null, %27location=no,status=yes,menubar=no,scrollbars=no,resizable=yes,width=500,height=500,modal=yes,dependent=yes%27)})();
```

### Open in Archive.is

<a href="javascript:(function()%7Bjavascript%3A(()%3D%3E%7Bvar%20url%3D%22https%3A%2F%2Farchive.is%2F%22%2BencodeURI(window.location.protocol%20%2B%20%22%2F%2F%22%20%2B%20window.location.hostname%20%2B%20window.location.pathname)%3B%20window.open(url%2C%20%22_blank%22)%3B%7D)()%3B%7D)()%3B">Open in Archive.is</a>

```js
javascript: (() => {
  var url =
    "https://archive.is/" +
    encodeURI(
      window.location.protocol +
        "//" +
        window.location.hostname +
        window.location.pathname,
    );
  window.open(url, "_blank");
})();
```

### Post to Hacker News

<a href="javascript:(function()%7Bjavascript%3Avoid%2520function()%7Bvar%2520a%3Ddocument.querySelector(%2522meta%5Bproperty%3D'og%3Atitle'%5D%2522)%253Fdocument.querySelector(%2522meta%5Bproperty%3D'og%3Atitle'%5D%2522).getAttribute(%2522content%2522)%3Adocument.title%2Cb%3Dwindow.getSelection%2526%25262%253Cwindow.getSelection().toString().length%253Fwindow.getSelection().toString()%3Aa%2Cc%3DencodeURIComponent%2Cd%3D%2522u%3D%2522%2Bc(document.location.href)%2B%2522%2526t%3D%2522%2Bc(b)%3BsetTimeout(function()%7Bwindow.location.assign(%2522https%3A%2F%2Fnews.ycombinator.com%2Fsubmitlink%253F%2522%2Bd)%7D%2C0)%7D()%3B%7D)()%3B">Post to Hacker News</a>

```js
javascript:void%20function(){var%20a=document.querySelector(%22meta[property='og:title']%22)%3Fdocument.querySelector(%22meta[property='og:title']%22).getAttribute(%22content%22):document.title,b=window.getSelection%26%262%3Cwindow.getSelection().toString().length%3Fwindow.getSelection().toString():a,c=encodeURIComponent,d=%22u=%22+c(document.location.href)+%22%26t=%22+c(b);setTimeout(function(){window.location.assign(%22https://news.ycombinator.com/submitlink%3F%22+d)},0)}();
```

### Add to Raindrop

<a href="javascript:(function()%7Bjavascript%3A(function()%257Bvar%20rspW%253D450%252CrspH%253D600%252CrspL%253DparseInt((screen.width%252F2)-(rspW%252F2))%252CrspT%253DparseInt((screen.height%252F2)-(rspH%252F2))%253Bwindow.open(%7D)()%3B">Add to Raindrop</a>

```js
javascript:(function()%7Bvar rspW%3D450%2CrspH%3D600%2CrspL%3DparseInt((screen.width%2F2)-(rspW%2F2))%2CrspT%3DparseInt((screen.height%2F2)-(rspH%2F2))%3Bwindow.open(
```

### Waterize Page

<a href="javascript:(function()%7Bjavascript%3A(function()%257B%252F%252F%2520Water.css%2520Bookmarklet%250A%252F%252F%2520---------------------%250A%250Aconst%2520%2524%2524%2520%253D%2520(selector)%2520%253D%253E%2520document.querySelectorAll(selector)%250Aconst%2520createElement%2520%253D%2520(tagName%252C%2520properties)%2520%253D%253E%2520Object.assign(document.createElement(tagName)%252C%2520properties)%250A%250A%252F%252F%2520Remove%2520all%2520CSS%2520stylesheets%252C%2520external%2520and%2520internal%250A%2524%2524('link%255Brel%253D%2522stylesheet%2522%255D%252Cstyle').forEach((el)%2520%253D%253E%2520el.remove())%250A%250A%252F%252F%2520Remove%2520all%2520inline%2520styles%250A%2524%2524('*').forEach((el)%2520%253D%253E%2520(el.style%2520%253D%2520''))%250A%250Aconst%2520linkElm%2520%253D%2520createElement('link'%252C%2520%257B%250A%2520%2520rel%253A%2520'stylesheet'%252C%250A%2520%2520href%253A%2520'https%253A%252F%252Fcdn.jsdelivr.net%252Fnpm%252Fwater.css%25402%252Fout%252Flight.css'%250A%257D)%250A%250A%252F%252F%2520Add%2520water.css%2520and%2520responsive%2520viewport%2520(if%2520necessary)%250Adocument.head.append(%250A%2520%2520linkElm%252C%250A%2520%2520!%2524%2524('meta%255Bname%253D%2522viewport%2522%255D').length%2520%2526%2526%2520createElement('meta'%252C%2520%257B%250A%2520%2520%2520%2520name%253A%2520'viewport'%252C%250A%2520%2520%2520%2520content%253A%2520'width%253Ddevice-width%252Cinitial-scale%253D1.0'%250A%2520%2520%257D)%250A)%250A%250A%252F%252F%2520Theme%2520switching%2520icons%250Aconst%2520moonSVG%2520%253D%2520'%253Csvg%2520xmlns%253D%2522http%253A%252F%252Fwww.w3.org%252F2000%252Fsvg%2522%2520width%253D%252224%2522%2520height%253D%252224%2522%2520viewBox%253D%25220%25200%252024%252024%2522%2520fill%253D%2522none%2522%2520stroke%253D%2522currentColor%2522%2520stroke-width%253D%25222%2522%2520stroke-linecap%253D%2522round%2522%2520stroke-linejoin%253D%2522round%2522%2520class%253D%2522feather%2520feather-moon%2522%253E%253Cpath%2520d%253D%2522M21%252012.79A9%25209%25200%25201%25201%252011.21%25203%25207%25207%25200%25200%25200%252021%252012.79z%2522%253E%253C%252Fpath%253E%253C%252Fsvg%253E'%250Aconst%2520sunSVG%2520%253D%2520'%253Csvg%2520xmlns%253D%2522http%253A%252F%252Fwww.w3.org%252F2000%252Fsvg%2522%2520width%253D%252224%2522%2520height%253D%252224%2522%2520viewBox%253D%25220%25200%252024%252024%2522%2520fill%253D%2522none%2522%2520stroke%253D%2522currentColor%2522%2520stroke-width%253D%25222%2522%2520stroke-linecap%253D%2522round%2522%2520stroke-linejoin%253D%2522round%2522%2520class%253D%2522feather%2520feather-sun%2522%253E%253Ccircle%2520cx%253D%252212%2522%2520cy%253D%252212%2522%2520r%253D%25225%2522%253E%253C%252Fcircle%253E%253Cline%2520x1%253D%252212%2522%2520y1%253D%25221%2522%2520x2%253D%252212%2522%2520y2%253D%25223%2522%253E%253C%252Fline%253E%253Cline%2520x1%253D%252212%2522%2520y1%253D%252221%2522%2520x2%253D%252212%2522%2520y2%253D%252223%2522%253E%253C%252Fline%253E%253Cline%2520x1%253D%25224.22%2522%2520y1%253D%25224.22%2522%2520x2%253D%25225.64%2522%2520y2%253D%25225.64%2522%253E%253C%252Fline%253E%253Cline%2520x1%253D%252218.36%2522%2520y1%253D%252218.36%2522%2520x2%253D%252219.78%2522%2520y2%253D%252219.78%2522%253E%253C%252Fline%253E%253Cline%2520x1%253D%25221%2522%2520y1%253D%252212%2522%2520x2%253D%25223%2522%2520y2%253D%252212%2522%253E%253C%252Fline%253E%253Cline%2520x1%253D%252221%2522%2520y1%253D%252212%2522%2520x2%253D%252223%2522%2520y2%253D%252212%2522%253E%253C%252Fline%253E%253Cline%2520x1%253D%25224.22%2522%2520y1%253D%252219.78%2522%2520x2%253D%25225.64%2522%2520y2%253D%252218.36%2522%253E%253C%252Fline%253E%253Cline%2520x1%253D%252218.36%2522%2520y1%253D%25225.64%2522%2520x2%253D%252219.78%2522%2520y2%253D%25224.22%2522%253E%253C%252Fline%253E%253C%252Fsvg%253E'%250A%250A%252F%252F%2520Theme%2520toggling%2520logic%250Aconst%2520toggleBtn%2520%253D%2520createElement('button'%252C%2520%257B%250A%2520%2520innerHTML%253A%2520sunSVG%252C%250A%2520%2520ariaLabel%253A%2520'Switch%2520theme'%252C%250A%2520%2520style%253A%2520%2560%250A%2520%2520%2520%2520position%253A%2520fixed%253B%250A%2520%2520%2520%2520top%253A%252050px%253B%250A%2520%2520%2520%2520right%253A%252050px%253B%250A%2520%2520%2520%2520margin%253A%25200%253B%250A%2520%2520%2520%2520padding%253A%252010px%253B%250A%2520%2520%2520%2520line-height%253A%25201%253B%250A%2520%2520%2560%250A%257D)%250A%250Alet%2520theme%2520%253D%2520'light'%250Aconst%2520toggleTheme%2520%253D%2520()%2520%253D%253E%2520%257B%250A%2520%2520if%2520(theme%2520%253D%253D%253D%2520'light')%2520%257B%250A%2520%2520%2520%2520theme%2520%253D%2520'dark'%250A%2520%2520%2520%2520toggleBtn.innerHTML%2520%253D%2520moonSVG%250A%2520%2520%2520%2520linkElm.href%2520%253D%2520'https%253A%252F%252Fcdn.jsdelivr.net%252Fnpm%252Fwater.css%25402%252Fout%252Fdark.css'%250A%2520%2520%257D%2520else%2520%257B%250A%2520%2520%2520%2520theme%2520%253D%2520'light'%250A%2520%2520%2520%2520linkElm.href%2520%253D%2520'https%253A%252F%252Fcdn.jsdelivr.net%252Fnpm%252Fwater.css%25402%252Fout%252Flight.css'%250A%2520%2520%2520%2520toggleBtn.innerHTML%2520%253D%2520sunSVG%250A%2520%2520%257D%250A%257D%250A%250AtoggleBtn.addEventListener('click'%252C%2520toggleTheme)%250Adocument.body.append(toggleBtn)%257D)()%253B%7D)()%3B">Waterize Page</a>

```js
javascript:(function()%7B%2F%2F%20Water.css%20Bookmarklet%0A%2F%2F%20---------------------%0A%0Aconst%20%24%24%20%3D%20(selector)%20%3D%3E%20document.querySelectorAll(selector)%0Aconst%20createElement%20%3D%20(tagName%2C%20properties)%20%3D%3E%20Object.assign(document.createElement(tagName)%2C%20properties)%0A%0A%2F%2F%20Remove%20all%20CSS%20stylesheets%2C%20external%20and%20internal%0A%24%24('link%5Brel%3D%22stylesheet%22%5D%2Cstyle').forEach((el)%20%3D%3E%20el.remove())%0A%0A%2F%2F%20Remove%20all%20inline%20styles%0A%24%24('*').forEach((el)%20%3D%3E%20(el.style%20%3D%20''))%0A%0Aconst%20linkElm%20%3D%20createElement('link'%2C%20%7B%0A%20%20rel%3A%20'stylesheet'%2C%0A%20%20href%3A%20'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fwater.css%402%2Fout%2Flight.css'%0A%7D)%0A%0A%2F%2F%20Add%20water.css%20and%20responsive%20viewport%20(if%20necessary)%0Adocument.head.append(%0A%20%20linkElm%2C%0A%20%20!%24%24('meta%5Bname%3D%22viewport%22%5D').length%20%26%26%20createElement('meta'%2C%20%7B%0A%20%20%20%20name%3A%20'viewport'%2C%0A%20%20%20%20content%3A%20'width%3Ddevice-width%2Cinitial-scale%3D1.0'%0A%20%20%7D)%0A)%0A%0A%2F%2F%20Theme%20switching%20icons%0Aconst%20moonSVG%20%3D%20'%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-moon%22%3E%3Cpath%20d%3D%22M21%2012.79A9%209%200%201%201%2011.21%203%207%207%200%200%200%2021%2012.79z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E'%0Aconst%20sunSVG%20%3D%20'%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22feather%20feather-sun%22%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%2212%22%20r%3D%225%22%3E%3C%2Fcircle%3E%3Cline%20x1%3D%2212%22%20y1%3D%221%22%20x2%3D%2212%22%20y2%3D%223%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2212%22%20y1%3D%2221%22%20x2%3D%2212%22%20y2%3D%2223%22%3E%3C%2Fline%3E%3Cline%20x1%3D%224.22%22%20y1%3D%224.22%22%20x2%3D%225.64%22%20y2%3D%225.64%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2218.36%22%20y1%3D%2218.36%22%20x2%3D%2219.78%22%20y2%3D%2219.78%22%3E%3C%2Fline%3E%3Cline%20x1%3D%221%22%20y1%3D%2212%22%20x2%3D%223%22%20y2%3D%2212%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2221%22%20y1%3D%2212%22%20x2%3D%2223%22%20y2%3D%2212%22%3E%3C%2Fline%3E%3Cline%20x1%3D%224.22%22%20y1%3D%2219.78%22%20x2%3D%225.64%22%20y2%3D%2218.36%22%3E%3C%2Fline%3E%3Cline%20x1%3D%2218.36%22%20y1%3D%225.64%22%20x2%3D%2219.78%22%20y2%3D%224.22%22%3E%3C%2Fline%3E%3C%2Fsvg%3E'%0A%0A%2F%2F%20Theme%20toggling%20logic%0Aconst%20toggleBtn%20%3D%20createElement('button'%2C%20%7B%0A%20%20innerHTML%3A%20sunSVG%2C%0A%20%20ariaLabel%3A%20'Switch%20theme'%2C%0A%20%20style%3A%20%60%0A%20%20%20%20position%3A%20fixed%3B%0A%20%20%20%20top%3A%2050px%3B%0A%20%20%20%20right%3A%2050px%3B%0A%20%20%20%20margin%3A%200%3B%0A%20%20%20%20padding%3A%2010px%3B%0A%20%20%20%20line-height%3A%201%3B%0A%20%20%60%0A%7D)%0A%0Alet%20theme%20%3D%20'light'%0Aconst%20toggleTheme%20%3D%20()%20%3D%3E%20%7B%0A%20%20if%20(theme%20%3D%3D%3D%20'light')%20%7B%0A%20%20%20%20theme%20%3D%20'dark'%0A%20%20%20%20toggleBtn.innerHTML%20%3D%20moonSVG%0A%20%20%20%20linkElm.href%20%3D%20'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fwater.css%402%2Fout%2Fdark.css'%0A%20%20%7D%20else%20%7B%0A%20%20%20%20theme%20%3D%20'light'%0A%20%20%20%20linkElm.href%20%3D%20'https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2Fwater.css%402%2Fout%2Flight.css'%0A%20%20%20%20toggleBtn.innerHTML%20%3D%20sunSVG%0A%20%20%7D%0A%7D%0A%0AtoggleBtn.addEventListener('click'%2C%20toggleTheme)%0Adocument.body.append(toggleBtn)%7D)()%3B
```

## Web Development

### New CSS Goggles

```js
javascript: (function () {
  let domStyle = document.getElementById("domStylee");
  if (domStyle) {
    document.body.removeChild(domStyle);
    return;
  }
  domStyle = document.createElement("style");
  domStyle.setAttribute("id", "domStylee");
  domStyle.append(
    [
      "* { color:#0f0!important;outline:solid #f00 1px!important; background-color: rgba(255,0,0,.2) !important; }",
    ],
    ["* * { background-color: rgba(0,255,0,.2) !important; }"],
    ["* * * { background-color: rgba(0,0,255,.2) !important; }"],
    ["* * * * { background-color: rgba(255,0,255,.2) !important; }"],
    ["* * * * * { background-color: rgba(0,255,255,.2) !important; }"],
    ["* * * * * * { background-color: rgba(255,255,0,.2) !important; }"],
    ["* * * * * * * { background-color: rgba(255,0,0,.2) !important; }"],
    ["* * * * * * * * { background-color: rgba(0,255,0,.2) !important; }"],
    [
      "* * * * * * * * * { background-color: rgba(0,0,255,.2) !important; }",
    ].join(),
  );
  document.body.appendChild(domStyle);
})();
```

```js
javascript:(function()%7Bjavascript%3A%20(function%20()%20%7B%0A%20%20let%20domStyle%20%3D%20document.getElementById(%22domStylee%22)%3B%0A%20%20if%20(domStyle)%20%7B%0A%20%20%20%20document.body.removeChild(domStyle)%3B%0A%20%20%20%20return%3B%0A%20%20%7D%0A%20%20domStyle%20%3D%20document.createElement(%22style%22)%3B%0A%20%20domStyle.setAttribute(%22id%22%2C%20%22domStylee%22)%3B%0A%20%20domStyle.append(%0A%20%20%20%20%5B%0A%20%20%20%20%20%20%22*%20%7B%20color%3A%230f0!important%3Boutline%3Asolid%20%23f00%201px!important%3B%20background-color%3A%20rgba(255%2C0%2C0%2C.2)%20!important%3B%20%7D%22%2C%0A%20%20%20%20%5D%2C%0A%20%20%20%20%5B%22*%20*%20%7B%20background-color%3A%20rgba(0%2C255%2C0%2C.2)%20!important%3B%20%7D%22%5D%2C%0A%20%20%20%20%5B%22*%20*%20*%20%7B%20background-color%3A%20rgba(0%2C0%2C255%2C.2)%20!important%3B%20%7D%22%5D%2C%0A%20%20%20%20%5B%22*%20*%20*%20*%20%7B%20background-color%3A%20rgba(255%2C0%2C255%2C.2)%20!important%3B%20%7D%22%5D%2C%0A%20%20%20%20%5B%22*%20*%20*%20*%20*%20%7B%20background-color%3A%20rgba(0%2C255%2C255%2C.2)%20!important%3B%20%7D%22%5D%2C%0A%20%20%20%20%5B%22*%20*%20*%20*%20*%20*%20%7B%20background-color%3A%20rgba(255%2C255%2C0%2C.2)%20!important%3B%20%7D%22%5D%2C%0A%20%20%20%20%5B%22*%20*%20*%20*%20*%20*%20*%20%7B%20background-color%3A%20rgba(255%2C0%2C0%2C.2)%20!important%3B%20%7D%22%5D%2C%0A%20%20%20%20%5B%22*%20*%20*%20*%20*%20*%20*%20*%20%7B%20background-color%3A%20rgba(0%2C255%2C0%2C.2)%20!important%3B%20%7D%22%5D%2C%0A%20%20%20%20%5B%0A%20%20%20%20%20%20%22*%20*%20*%20*%20*%20*%20*%20*%20*%20%7B%20background-color%3A%20rgba(0%2C0%2C255%2C.2)%20!important%3B%20%7D%22%2C%0A%20%20%20%20%5D.join()%0A%20%20)%3B%0A%20%20document.body.appendChild(domStyle)%3B%0A%7D)()%3B%7D)()%3B
```

### CSS Goggles

<a href="javascript: (function() { let domStyle = document.getElementById('domStylee'); if (domStyle) { document.body.removeChild(domStyle); return; } domStyle = document.createElement("style"); domStyle.setAttribute('id', 'domStylee'); domStyle.append( ['* { color:#0f0!important;outline:solid%20#f00%201px!important;%20background-color:%20rgba(255,0,0,.2)%20!important;%20}'],%20%20%20%20['_%20_%20{%20background-color:%20rgba(0,255,0,.2)%20!important;%20}'],%20%20%20%20['_%20_%20*%20{%20background-color:%20rgba(0,0,255,.2)%20!important;%20}'],%20%20%20%20['_%20_%20*%20*%20{%20background-color:%20rgba(255,0,255,.2)%20!important;%20}'],%20%20%20%20['_%20_%20*%20*%20*%20{%20background-color:%20rgba(0,255,255,.2)%20!important;%20}'],%20%20%20%20['_%20_%20*%20*%20*%20*%20{%20background-color:%20rgba(255,255,0,.2)%20!important;%20}'],%20%20%20%20['_%20_%20*%20*%20*%20*%20*%20{%20background-color:%20rgba(255,0,0,.2)%20!important;%20}'],%20%20%20%20['_%20_%20*%20*%20*%20*%20*%20*%20{%20background-color:%20rgba(0,255,0,.2)%20!important;%20}'],%20%20%20%20['_%20_%20*%20*%20*%20*%20*%20*%20*%20{%20background-color:%20rgba(0,0,255,.2)%20!important;%20}'].join()%20%20);%20%20document.body.appendChild(domStyle);})();">CSS Goggles</a>

```javascript
javascript: (function() {  let domStyle = document.getElementById('domStylee');  if (domStyle) {    document.body.removeChild(domStyle);    return;  }  domStyle = document.createElement("style");  domStyle.setAttribute('id', 'domStylee');  domStyle.append(    ['* { color:#0f0!important;outline:solid%20#f00%201px!important;%20background-color:%20rgba(255,0,0,.2)%20!important;%20}'],%20%20%20%20['*%20*%20{%20background-color:%20rgba(0,255,0,.2)%20!important;%20}'],%20%20%20%20['*%20*%20*%20{%20background-color:%20rgba(0,0,255,.2)%20!important;%20}'],%20%20%20%20['*%20*%20*%20*%20{%20background-color:%20rgba(255,0,255,.2)%20!important;%20}'],%20%20%20%20['*%20*%20*%20*%20*%20{%20background-color:%20rgba(0,255,255,.2)%20!important;%20}'],%20%20%20%20['*%20*%20*%20*%20*%20*%20{%20background-color:%20rgba(255,255,0,.2)%20!important;%20}'],%20%20%20%20['*%20*%20*%20*%20*%20*%20*%20{%20background-color:%20rgba(255,0,0,.2)%20!important;%20}'],%20%20%20%20['*%20*%20*%20*%20*%20*%20*%20*%20{%20background-color:%20rgba(0,255,0,.2)%20!important;%20}'],%20%20%20%20['*%20*%20*%20*%20*%20*%20*%20*%20*%20{%20background-color:%20rgba(0,0,255,.2)%20!important;%20}'].join()%20%20);%20%20document.body.appendChild(domStyle);})();
```

### Contrast Cheker

<a href="javascript:(function()%7Bjavascript%3A(function()%7Bvar%20constrastletelem%20%3D%20document.getElementById(%22contrastletdragable%22)%3Bif%20(constrastletelem%20%3D%3D%20null)%20%7Bvar%20contrastletdragable%20%3D%20document.createElement(%22div%22)%3Bcontrastletdragable.id%20%3D%20%22contrastletdragable%22%3Bcontrastletdragable.style.width%20%3D%20%22384px%22%3Bcontrastletdragable.style.position%20%3D%20%22absolute%22%3Bcontrastletdragable.style.right%20%3D%20%2220px%22%3Bcontrastletdragable.style.top%20%3D%20window.pageYOffset%2B20%2B%22px%22%3Bcontrastletdragable.style.zIndex%20%3D%20%2210000%22%3Bcontrastletdragable.style.boxSizing%20%3D%20%22content-box%22%3Bvar%20contrastletdragzone%20%3D%20document.createElement(%22div%22)%3Bcontrastletdragzone.id%20%3D%20%22contrastletdragzone%22%3Bcontrastletdragzone.style.width%20%3D%20%22100%25%22%3Bcontrastletdragzone.style.height%20%3D%20%2215px%22%3Bcontrastletdragzone.style.cursor%20%3D%20%22move%22%3Bcontrastletdragzone.style.backgroundColor%20%3D%20%22%230f2c65%22%3Bcontrastletdragzone.style.boxSizing%20%3D%20%22content-box%22%3Bcontrastletdragable.appendChild(contrastletdragzone)%3Bdocument.body.appendChild(contrastletdragable)%3Bvar%20contrastletclose%20%3D%20document.createElement(%22button%22)%3Bcontrastletclose.id%20%3D%20%22contrastletclose%22%3Bcontrastletclose.style.width%20%3D%20%2215px%22%3Bcontrastletclose.style.height%20%3D%20%2215px%22%3Bcontrastletclose.style.float%20%3D%20%22right%22%3Bcontrastletclose.style.padding%20%3D%20%220%22%3Bcontrastletclose.style.border%20%3D%20%220%22%3Bcontrastletclose.style.borderTop%20%3D%20%221px%20solid%20%230f2c65%22%3Bcontrastletclose.style.borderRight%20%3D%20%221px%20solid%20%230f2c65%22%3Bcontrastletclose.setAttribute(%22aria-label%22%2C%20%22Close%20Contrast%20Checker%22)%3Bcontrastletclose.addEventListener(%20%20%22click%22%2C%20%20function%20()%20%7Bcontrastletdragable.remove()%3B%20%20%7D%2C%20%20false%2C)%3Bvar%20contrastletclosetext%20%3D%20document.createTextNode(%22X%22)%3Bcontrastletclose.appendChild(contrastletclosetext)%3Bcontrastletdragzone.appendChild(contrastletclose)%3Bvar%20contrastlet%20%3D%20document.createElement(%22iframe%22)%3Bcontrastlet.src%20%3D%20%22https%3A%2F%2Fwebaim.org%2Fresources%2Fcontrastchecker%2Fmini%3Fver%3D1%26a%3D%22%2BMath.random()%3Bcontrastlet.style.width%20%3D%20%22380px%22%3Bcontrastlet.style.height%20%3D%20%22368px%22%3Bcontrastlet.style.margin%20%3D%20%220px%22%3Bcontrastlet.style.borderStyle%20%3D%20%22solid%22%3Bcontrastlet.style.borderColor%20%3D%20%22%230f2c65%22%3Bcontrastlet.style.boxSizing%20%3D%20%22content-box%22%3Bcontrastletdragable.appendChild(contrastlet)%3Blet%20x%20%3D%200%3Blet%20y%20%3D%200%3Bconst%20mouseDownHandler%20%3D%20function%20(e)%20%7Bx%20%3D%20e.clientX%3By%20%3D%20e.clientY%3Bdocument.addEventListener(%22mousemove%22%2C%20mouseMoveHandler)%3Bdocument.addEventListener(%22mouseup%22%2C%20mouseUpHandler)%3B%7D%3Bconst%20mouseMoveHandler%20%3D%20function%20(e)%20%7Bconst%20dx%20%3D%20e.clientX%20-%20x%3Bconst%20dy%20%3D%20e.clientY%20-%20y%3Bcontrastletdragable.style.top%20%3D%20%2560%24%7Bcontrastletdragable.offsetTop%20%2B%20dy%7Dpx%2560%3Bcontrastletdragable.style.left%20%3D%20%2560%24%7Bcontrastletdragable.offsetLeft%20%2B%20dx%7Dpx%2560%3Bx%20%3D%20e.clientX%3By%20%3D%20e.clientY%3B%7D%3Bconst%20mouseUpHandler%20%3D%20function%20()%20%7Bdocument.removeEventListener(%22mousemove%22%2C%20mouseMoveHandler)%3Bdocument.removeEventListener(%22mouseup%22%2C%20mouseUpHandler)%3B%7D%3Bcontrastletdragable.addEventListener(%22mousedown%22%2C%20mouseDownHandler)%3Bdocument.addEventListener(%22keyup%22%2C%20function(event)%20%7Bif%20(event.keyCode%20%3D%3D%3D%2027)%20%7Bcontrastletdragable.remove()%3B%7D%7D)%3Bcontrastlet.addEventListener(%22keyup%22%2C%20function(event)%20%7Bif%20(event.keyCode%20%3D%3D%3D%2027)%20%7Bcontrastletdragable.remove()%3B%7D%7D)%3Bdocument.addEventListener(%22securitypolicyviolation%22%2C%20(e)%20%3D%3E%20%7Bcontrastlet.remove()%3Bvar%20contrastleterrortext%20%3D%20document.createTextNode(%22The%20Content%20Security%20Policy%20on%20this%20page%20does%20not%20allow%20embedded%20iframes.%20The%20Contrast%20Checker%20Bookmarklet%20cannot%20run%20on%20this%20page.%20Press%20Esc%20to%20dismiss%20this%20message.%22)%3Bcontrastletdragable.style.backgroundColor%3D%22%23fff%22%3Bcontrastletdragable.appendChild(contrastleterrortext)%3B%7D)%3B%7D%7D)()%3B%7D)()%3B">Contrast Checker</a>

```js
javascript:(function(){var constrastletelem = document.getElementById("contrastletdragable");if (constrastletelem == null) {var contrastletdragable = document.createElement("div");contrastletdragable.id = "contrastletdragable";contrastletdragable.style.width = "384px";contrastletdragable.style.position = "absolute";contrastletdragable.style.right = "20px";contrastletdragable.style.top = window.pageYOffset+20+"px";contrastletdragable.style.zIndex = "10000";contrastletdragable.style.boxSizing = "content-box";var contrastletdragzone = document.createElement("div");contrastletdragzone.id = "contrastletdragzone";contrastletdragzone.style.width = "100%";contrastletdragzone.style.height = "15px";contrastletdragzone.style.cursor = "move";contrastletdragzone.style.backgroundColor = "#0f2c65";contrastletdragzone.style.boxSizing = "content-box";contrastletdragable.appendChild(contrastletdragzone);document.body.appendChild(contrastletdragable);var contrastletclose = document.createElement("button");contrastletclose.id = "contrastletclose";contrastletclose.style.width = "15px";contrastletclose.style.height = "15px";contrastletclose.style.float = "right";contrastletclose.style.padding = "0";contrastletclose.style.border = "0";contrastletclose.style.borderTop = "1px solid #0f2c65";contrastletclose.style.borderRight = "1px solid #0f2c65";contrastletclose.setAttribute("aria-label", "Close Contrast Checker");contrastletclose.addEventListener(  "click",  function () {contrastletdragable.remove();  },  false,);var contrastletclosetext = document.createTextNode("X");contrastletclose.appendChild(contrastletclosetext);contrastletdragzone.appendChild(contrastletclose);var contrastlet = document.createElement("iframe");contrastlet.src = "https://webaim.org/resources/contrastchecker/mini?ver=1&a="+Math.random();contrastlet.style.width = "380px";contrastlet.style.height = "368px";contrastlet.style.margin = "0px";contrastlet.style.borderStyle = "solid";contrastlet.style.borderColor = "#0f2c65";contrastlet.style.boxSizing = "content-box";contrastletdragable.appendChild(contrastlet);let x = 0;let y = 0;const mouseDownHandler = function (e) {x = e.clientX;y = e.clientY;document.addEventListener("mousemove", mouseMoveHandler);document.addEventListener("mouseup", mouseUpHandler);};const mouseMoveHandler = function (e) {const dx = e.clientX - x;const dy = e.clientY - y;contrastletdragable.style.top = %60${contrastletdragable.offsetTop + dy}px%60;contrastletdragable.style.left = %60${contrastletdragable.offsetLeft + dx}px%60;x = e.clientX;y = e.clientY;};const mouseUpHandler = function () {document.removeEventListener("mousemove", mouseMoveHandler);document.removeEventListener("mouseup", mouseUpHandler);};contrastletdragable.addEventListener("mousedown", mouseDownHandler);document.addEventListener("keyup", function(event) {if (event.keyCode === 27) {contrastletdragable.remove();}});contrastlet.addEventListener("keyup", function(event) {if (event.keyCode === 27) {contrastletdragable.remove();}});document.addEventListener("securitypolicyviolation", (e) => {contrastlet.remove();var contrastleterrortext = document.createTextNode("The Content Security Policy on this page does not allow embedded iframes. The Contrast Checker Bookmarklet cannot run on this page. Press Esc to dismiss this message.");contrastletdragable.style.backgroundColor="#fff";contrastletdragable.appendChild(contrastleterrortext);});}})();
```

### CSS Switch

<a href="javascript:(function()%7Bjavascript%3A(function()%257Bvar%2520body%2520%253D%2520document.getElementsByTagName('body')%255B0%255D%253Bscript%2520%253D%2520document.createElement('script')%253Bscript.type%253D%2520'text%252Fjavascript'%253Bscript.src%253D%2520'https%253A%252F%252Fdohliam.github.io%252Fdropin-minimal-css%252Fswitcher.js'%253Bbody.appendChild(script)%257D)()%7D)()%3B">CSS Switch</a>

```js
javascript:(function()%7Bvar%20body%20%3D%20document.getElementsByTagName('body')%5B0%5D%3Bscript%20%3D%20document.createElement('script')%3Bscript.type%3D%20'text%2Fjavascript'%3Bscript.src%3D%20'https%3A%2F%2Fdohliam.github.io%2Fdropin-minimal-css%2Fswitcher.js'%3Bbody.appendChild(script)%7D)()
```

### Show Stylesheets

<a href="javascript:(function()%7Bjavascript%3A%20s%20%3D%20document.getElementsByTagName('STYLE')%3B%20ex%20%3D%20document.getElementsByTagName('LINK')%3B%20d%20%3D%20window.open().document%3B%20%2F*set%20base%20href*%2F%20d.open()%3B%20d.close()%3B%20b%20%3D%20d.body%3B%20%20function%20trim(s)%20%7B%20return%20s.replace(%2F%5E%5Cs*%5Cn%2F%2C%20'').replace(%2F%5Cs*%24%2F%2C%20'')%3B%20%7D%3B%20%20function%20iff(a%2C%20b%2C%20c)%20%7B%20return%20b%20%3F%20a%20%2B%20b%20%2B%20c%20%3A%20''%3B%20%7D%20%20function%20add(h)%20%7B%20b.appendChild(h)%3B%20%7D%20%20function%20makeTag(t)%20%7B%20return%20d.createElement(t)%3B%20%7D%20%20function%20makeText(tag%2C%20text)%20%7B%20t%20%3D%20makeTag(tag)%3B%20t.appendChild(d.createTextNode(text))%3B%20return%20t%3B%20%7D%20add(makeText('style'%2C%20'iframe%7Bwidth%3A100%25%3Bheight%3A18em%3Bborder%3A1px%20solid%3B'))%3B%20add(makeText('h3'%2C%20d.title%20%3D%20'Style%20sheets%20in%20'%20%2B%20location.href))%3B%20for%20(i%20%3D%200%3B%20i%20%3C%20s.length%3B%20%2B%2Bi)%20%7B%20add(makeText('h4'%2C%20'Inline%20style%20sheet'%20%2B%20iff('%20title%3D%22'%2C%20s%5Bi%5D.title%2C%20'%22')))%3B%20add(makeText('pre'%2C%20trim(s%5Bi%5D.innerHTML)))%3B%20%7D%20for%20(i%20%3D%200%3B%20i%20%3C%20ex.length%3B%20%2B%2Bi)%20%7B%20rs%20%3D%20ex%5Bi%5D.rel.split('%20')%3B%20for%20(j%20%3D%200%3B%20j%20%3C%20rs.length%3B%20%2B%2Bj)%20if%20(rs%5Bj%5D.toLowerCase()%20%3D%3D%20'stylesheet')%20%7B%20add(makeText('h4'%2C%20'link%20rel%3D%22'%20%2B%20ex%5Bi%5D.rel%20%2B%20'%22%20href%3D%22'%20%2B%20ex%5Bi%5D.href%20%2B%20'%22'%20%2B%20iff('%20title%3D%22'%2C%20ex%5Bi%5D.title%2C%20'%22')))%3B%20iframe%20%3D%20makeTag('iframe')%3B%20iframe.src%20%3D%20ex%5Bi%5D.href%3B%20add(iframe)%3B%20break%3B%20%7D%20%7D%20void%200%7D)()%3B">Show Stylesheets</a>

```js
javascript: s = document.getElementsByTagName("STYLE");
ex = document.getElementsByTagName("LINK");
d = window.open().document;
/*set base href*/ d.open();
d.close();
b = d.body;
function trim(s) {
  return s.replace(/^\s*\n/, "").replace(/\s*$/, "");
}
function iff(a, b, c) {
  return b ? a + b + c : "";
}
function add(h) {
  b.appendChild(h);
}
function makeTag(t) {
  return d.createElement(t);
}
function makeText(tag, text) {
  t = makeTag(tag);
  t.appendChild(d.createTextNode(text));
  return t;
}
add(makeText("style", "iframe{width:100%;height:18em;border:1px solid;"));
add(makeText("h3", (d.title = "Style sheets in " + location.href)));
for (i = 0; i < s.length; ++i) {
  add(makeText("h4", "Inline style sheet" + iff(' title="', s[i].title, '"')));
  add(makeText("pre", trim(s[i].innerHTML)));
}
for (i = 0; i < ex.length; ++i) {
  rs = ex[i].rel.split(" ");
  for (j = 0; j < rs.length; ++j)
    if (rs[j].toLowerCase() == "stylesheet") {
      add(
        makeText(
          "h4",
          'link rel="' +
            ex[i].rel +
            '" href="' +
            ex[i].href +
            '"' +
            iff(' title="', ex[i].title, '"'),
        ),
      );
      iframe = makeTag("iframe");
      iframe.src = ex[i].href;
      add(iframe);
      break;
    }
}
void 0;
```

### CSS Stats

<a href="javascript:(function()%7Bjavascript%3Alocation.href%3D'http%3A%2F%2Fcssstats.com%2Fstats%3Furl%3D%2527%2Bwindow.location.href%7D)()%3B">Stats</a>

```js
javascript:location.href='http://cssstats.com/stats?url=%27+window.location.href
```

### Performance Analyzer

<a href="javascript:(function()%7Bjavascript%3A%20(function()%20%7B%20var%20el%20%3D%20document.createElement('script')%3B%20el.type%20%3D%20'text%2Fjavascript'%3B%20el.src%20%3D%20'https%3A%2F%2Fmicmro.github.io%2Fperformance-bookmarklet%2Fdist%2FperformanceBookmarklet.min.js'%3B%20el.onerror%20%3D%20function()%20%7B%20alert(%22Looks%20like%20the%20Content%20Security%20Policy%20directive%20is%20blocking%20the%20use%20of%20bookmarklets%5Cn%5CnYou%20can%20copy%20and%20paste%20the%20content%20of%3A%5Cn%5Cn%5C%22https%3A%2F%2Fmicmro.github.io%2Fperformance-bookmarklet%2Fdist%2FperformanceBookmarklet.min.js%5C%22%5Cn%5Cninto%20your%20console%20instead%5Cn%5Cn(link%20is%20in%20console%20already)%22)%3B%20console.log(%22https%3A%2F%2Fmicmro.github.io%2Fperformance-bookmarklet%2Fdist%2FperformanceBookmarklet.min.js%22)%3B%20%7D%3B%20document.getElementsByTagName('body')%5B0%5D.appendChild(el)%3B%20%7D)()%3B%7D)()%3B">Performance Analyzer</a>

```js
javascript: (function () {
  var el = document.createElement("script");
  el.type = "text/javascript";
  el.src =
    "https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js";
  el.onerror = function () {
    alert(
      'Looks like the Content Security Policy directive is blocking the use of bookmarklets\n\nYou can copy and paste the content of:\n\n"https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js"\n\ninto your console instead\n\n(link is in console already)',
    );
    console.log(
      "https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js",
    );
  };
  document.getElementsByTagName("body")[0].appendChild(el);
})();
```

### Font Finder

<a href="javascript:(function()%7Bjavascript%3A(function()%7Bfunction%20getSelectedNode()%7Bif(window.getSelection().focusNode%3D%3D%3Dnull)return%20null%3Breturn%20window.getSelection().focusNode.parentNode%7Dfunction%20getNodeFontStack(node)%7Breturn%20window.getComputedStyle(node).fontFamily%7Dfunction%20getFirstAvailableFont(fonts)%7Bfor(let%20font%20of%20fonts)%7Blet%20fontName%3Dfont.trim().replace(%2F%22%2Fg%2C'')%3Blet%20isAvailable%3Ddocument.fonts.check(%6016px%20%24%7BfontName%7D%60)%3Bif(!isAvailable)continue%3Breturn%20fontName%7D%7Dlet%20node%3DgetSelectedNode()%3Bif(!node)%7Bwindow.alert('Please%20select%20a%20string%20of%20text%20and%20try%20again.')%3Breturn%7Dlet%20fonts%3DgetNodeFontStack(node).split('%2C')%3Blet%20firstAvailableFont%3DgetFirstAvailableFont(fonts)%3Bwindow.alert(%60Font%3A%20%24%7BfirstAvailableFont%7D%60)%7D())%7D)()%3B">Font Finder</a>

```js
javascript: (function () {
  function getSelectedNode() {
    if (window.getSelection().focusNode === null) return null;
    return window.getSelection().focusNode.parentNode;
  }
  function getNodeFontStack(node) {
    return window.getComputedStyle(node).fontFamily;
  }
  function getFirstAvailableFont(fonts) {
    for (let font of fonts) {
      let fontName = font.trim().replace(/"/g, "");
      let isAvailable = document.fonts.check(`16px ${fontName}`);
      if (!isAvailable) continue;
      return fontName;
    }
  }
  let node = getSelectedNode();
  if (!node) {
    window.alert("Please select a string of text and try again.");
    return;
  }
  let fonts = getNodeFontStack(node).split(",");
  let firstAvailableFont = getFirstAvailableFont(fonts);
  window.alert(`Font: ${firstAvailableFont}`);
})();
```

### View Fonts

<a href="javascript:(function()%7Bjavascript%3A%20void((function(d)%20%7B%20%20%20%20%20var%20e%20%3D%20d.createElement('script')%3B%20%20%20%20%20e.setAttribute('type'%2C%20'text%2Fjavascript')%3B%20%20%20%20%20e.setAttribute('charset'%2C%20'UTF-8')%3B%20%20%20%20%20e.setAttribute('src'%2C%20'%2F%2Fwww.typesample.com%2Fassets%2Ftypesample.js%3Fr%3D'%20%2B%20Math.random()%20*%2099999999)%3B%20%20%20%20%20d.body.appendChild(e)%20%7D)(document))%3B%7D)()%3B">View Fonts</a>

```js
javascript: void (function (d) {
  var e = d.createElement("script");
  e.setAttribute("type", "text/javascript");
  e.setAttribute("charset", "UTF-8");
  e.setAttribute(
    "src",
    "//www.typesample.com/assets/typesample.js?r=" + Math.random() * 99999999,
  );
  d.body.appendChild(e);
})(document);
```

### Indentify Fonts

<a href="javascript:(function()%7Bjavascript%3A%20void((function(d)%20%7B%20%20%20%20%20var%20e%20%3D%20d.createElement('script')%3B%20%20%20%20%20e.setAttribute('type'%2C%20'text%2Fjavascript')%3B%20%20%20%20%20e.setAttribute('charset'%2C%20'UTF-8')%3B%20%20%20%20%20e.setAttribute('src'%2C%20'%2F%2Fwww.typesample.com%2Fassets%2Ftypesample.js%3Fr%3D'%20%2B%20Math.random()%20*%2099999999)%3B%20%20%20%20%20d.body.appendChild(e)%20%7D)(document))%3B%7D)()%3B">Identify Fotns</a>

```js
javascript: void (function (d) {
  var e = d.createElement("script");
  e.setAttribute("type", "text/javascript");
  e.setAttribute("charset", "UTF-8");
  e.setAttribute(
    "src",
    "//www.typesample.com/assets/typesample.js?r=" + Math.random() * 99999999,
  );
  d.body.appendChild(e);
})(document);
```

### Stress Test

<a href="javascript:(function()%7Bjavascript%3A(function()%257Bvar%2520d%3Ddocument%2Cs%3Dd.createElement('script')%2Cdoit%3Dfunction()%257Bif(window.stressTest)%257BstressTest.bookmarklet()%3B%257Delse%257BsetTimeout(doit%2C100)%3B%257D%257D%3Bs.src%3D'https%3A%2F%2Frawgithub.com%2Fandyedinborough%2Fstress-css%2Fmaster%2FstressTest.js%3F_%3D'%252BMath.random()%3B(d.body%257C%257Cd.getElementsByTagName('head')%255B0%255D).appendChild(s)%3Bdoit()%3B%257D)()%3B%7D)()%3B">Stress Test</a>

```js
javascript:(function()%7Bvar%20d=document,s=d.createElement('script'),doit=function()%7Bif(window.stressTest)%7BstressTest.bookmarklet();%7Delse%7BsetTimeout(doit,100);%7D%7D;s.src='https://rawgithub.com/andyedinborough/stress-css/master/stressTest.js?_='%2BMath.random();(d.body%7C%7Cd.getElementsByTagName('head')%5B0%5D).appendChild(s);doit();%7D)();
```

### Quick Edit

<a href="javascript:(function()%7Bjavascript%3A(function()%7B%20%20document.designMode%3D'on'%3B%20%20const%20s%3Ddocument.createElement('style')%3B%20%20s.innerHTML%3D%60body%3A%3Abefore%7Bcontent%3A'%25E2%259C%258F%25EF%25B8%258F%20Edit%20Mode%20(ESC%20to%20end)'%3Bz-index%3A64%3Bpadding%3A1em%3Bbackground%3Awhite%3Bcolor%3Ablack%3Bdisplay%3Ablock%3Bmargin%3A1em%3Bfont-size%3A30px%3Bborder%3A5px%20solid%20green%3B%7D%60%3B%20%20document.body.appendChild(s)%3B%20%20window.scrollTo(0%2C0)%3B%20%20document.addEventListener('keyup'%2Ce%20%3D%3E%20%7B%20%20%20%20if(e.key%3D%3D%3D'Escape')%7B%20%20%20%20%20%20document.designMode%3D'off'%3B%20%20%20%20%20%20s.remove()%3B%20%20%20%20%20%20document.removeEventListener('keyup'%2Ce)%3B%20%20%20%20%7D%20%20%7D)%3B%7D)()%3B%7D)()%3B">Quick Edit</a>

```js
javascript: (function () {
  document.designMode = "on";
  const s = document.createElement("style");
  s.innerHTML = `body::before{content:'%E2%9C%8F%EF%B8%8F Edit Mode (ESC to end)';z-index:64;padding:1em;background:white;color:black;display:block;margin:1em;font-size:30px;border:5px solid green;}`;
  document.body.appendChild(s);
  window.scrollTo(0, 0);
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      document.designMode = "off";
      s.remove();
      document.removeEventListener("keyup", e);
    }
  });
})();
```

### Edit Current Page

<a href="javascript:(function()%7Bjavascript%3A%20document.body.contentEditable%20%3D%20'true'%3B%20document.designMode%20%3D%20'on'%3B%20void%200%7D)()%3B">Edit Current Page</a>

```js
javascript: document.body.contentEditable = "true";
document.designMode = "on";
void 0;
```

### User Agent Stats

<a href="javascript:(function()%7Bjavascript%3A%20void(()%20%3D%3E%20%7Bprompt('User%20agent%3A'%2C%20navigator.userAgent)%7D)()%7D)()%3B">User Agent Stats</a>

```js
javascript: void (() => {
  prompt("User agent:", navigator.userAgent);
})();
```

### WebDev Multi Tools

<a href="javascript:(function()%7Bjavascript%3A(function%20()%20%257Bvar%20v%20%253D%20document.createElement(%2527script%2527)%253Bv.src%20%253D%20%2527https%253A%252F%252Fcdn.jsdelivr.net%252Fgh%252FBrowncha023%252FVengeance%2540v1.2.0%252Fscript.min.js%2527%253Bdocument.body.appendChild(v)%253B%257D())%7D)()%3B">WebDev Multi Tools</a>

```js
javascript:(function () %7Bvar v %3D document.createElement(%27script%27)%3Bv.src %3D %27https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FBrowncha023%2FVengeance%40v1.2.0%2Fscript.min.js%27%3Bdocument.body.appendChild(v)%3B%7D())
```

### Website Stack

<a href="javascript:(function()%7Bjavascript%3A(function()%7Bvar%20el%3Ddocument.createElement('script')%3Bel.type%3D'text%2Fjavascript'%3Bel.src%3D'https%3A%2F%2Fmicmro.github.io%2Fperformance-bookmarklet%2Fdist%2FperformanceBookmarklet.min.js'%3Bel.onerror%3Dfunction()%7Balert(%22Looks%20like%20the%20Content%20Security%20Policy%20directive%20is%20blocking%20the%20use%20of%20bookmarklets%5Cn%5CnYou%20can%20copy%20and%20paste%20the%20content%20of%3A%5Cn%5Cn%5C%22https%3A%2F%2Fmicmro.github.io%2Fperformance-bookmarklet%2Fdist%2FperformanceBookmarklet.min.js%5C%22%5Cn%5Cninto%20your%20console%20instead%5Cn%5Cn(link%20is%20in%20console%20already)%22)%3Bconsole.log(%22https%3A%2F%2Fmicmro.github.io%2Fperformance-bookmarklet%2Fdist%2FperformanceBookmarklet.min.js%22)%3B%7D%3Bdocument.getElementsByTagName('body')%5B0%5D.appendChild(el)%3B%7D)()%3B%7D)()%3B">Website Stack</a>

```js
javascript: (function () {
  var el = document.createElement("script");
  el.type = "text/javascript";
  el.src =
    "https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js";
  el.onerror = function () {
    alert(
      'Looks like the Content Security Policy directive is blocking the use of bookmarklets\n\nYou can copy and paste the content of:\n\n"https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js"\n\ninto your console instead\n\n(link is in console already)',
    );
    console.log(
      "https://micmro.github.io/performance-bookmarklet/dist/performanceBookmarklet.min.js",
    );
  };
  document.getElementsByTagName("body")[0].appendChild(el);
})();
```

### Website Dev Stack

<a href="javascript:(function()%7Bjavascript%3A%20(function()%20%7B%20var%20d%20%3D%20document%2C%20e%20%3D%20d.getElementById('wappalyzer-container')%3B%20if%20(e%20!%3D%3D%20null)%20%7B%20d.body.removeChild(e)%3B%20%7D%20var%20u%20%3D%20'https%3A%2F%2Fwww.wappalyzer.com%2F'%2C%20t%20%3D%20new%20Date().getTime()%2C%20c%20%3D%20d.createElement('div')%2C%20p%20%3D%20d.createElement('div')%2C%20l%20%3D%20d.createElement('link')%2C%20s%20%3D%20d.createElement('script')%3B%20c.setAttribute('id'%2C%20'wappalyzer-container')%3B%20l.setAttribute('rel'%2C%20'stylesheet')%3B%20l.setAttribute('href'%2C%20u%20%2B%20'css%2Fbookmarklet.css')%3B%20d.head.appendChild(l)%3B%20p.setAttribute('id'%2C%20'wappalyzer-pending')%3B%20p.setAttribute('style'%2C%20'background-image%3A%20url('%20%2B%20u%20%2B%20'images%2Fspinner.gif)%20!important')%3B%20c.appendChild(p)%3B%20s.setAttribute('src'%2C%20u%20%2B%20'bookmarklet%2Fwappalyzer.js')%3B%20s.onload%20%3D%20function()%20%7B%20window.wappalyzer%20%3D%20new%20Wappalyzer()%3B%20s%20%3D%20d.createElement('script')%3B%20s.setAttribute('src'%2C%20u%20%2B%20'bookmarklet%2Fapps.js')%3B%20s.onload%20%3D%20function()%20%7B%20s%20%3D%20d.createElement('script')%3B%20s.setAttribute('src'%2C%20u%20%2B%20'bookmarklet%2Fdriver.js')%3B%20c.appendChild(s)%3B%20%7D%3B%20c.appendChild(s)%3B%20%7D%3B%20c.appendChild(s)%3B%20d.body.appendChild(c)%3B%20%7D)()%3B%7D)()%3B">Website Dev Stack</a>

```js
javascript: (function () {
  var d = document,
    e = d.getElementById("wappalyzer-container");
  if (e !== null) {
    d.body.removeChild(e);
  }
  var u = "https://www.wappalyzer.com/",
    t = new Date().getTime(),
    c = d.createElement("div"),
    p = d.createElement("div"),
    l = d.createElement("link"),
    s = d.createElement("script");
  c.setAttribute("id", "wappalyzer-container");
  l.setAttribute("rel", "stylesheet");
  l.setAttribute("href", u + "css/bookmarklet.css");
  d.head.appendChild(l);
  p.setAttribute("id", "wappalyzer-pending");
  p.setAttribute(
    "style",
    "background-image: url(" + u + "images/spinner.gif) !important",
  );
  c.appendChild(p);
  s.setAttribute("src", u + "bookmarklet/wappalyzer.js");
  s.onload = function () {
    window.wappalyzer = new Wappalyzer();
    s = d.createElement("script");
    s.setAttribute("src", u + "bookmarklet/apps.js");
    s.onload = function () {
      s = d.createElement("script");
      s.setAttribute("src", u + "bookmarklet/driver.js");
      c.appendChild(s);
    };
    c.appendChild(s);
  };
  c.appendChild(s);
  d.body.appendChild(c);
})();
```

### Website Stack - Built With

<a href="javascript:(function()%7Bjavascript%3Avoid(open('https%3A%2F%2Fbuiltwith.com%2F%3F'%2BencodeURIComponent(location.href)))%3B%7D)()%3B">Website Stack - Built With</a>

```js
javascript: void open(
  "https://builtwith.com/?" + encodeURIComponent(location.href),
);
```

### Heatmap - Web Loading Time

<a href="javascript:(function()%7Bjavascript%3A%20(function()%20%7B%20var%20el%20%3D%20document.createElement('script')%3B%20el.src%20%3D%20'https%3A%2F%2Fzeman.github.io%2Fperfmap%2Fperfmap.js'%3B%20document.body.appendChild(el)%3B%20%7D)()%3B%7D)()%3B">Heatmap - Web Loading Time</a>

```js
javascript: (function () {
  var el = document.createElement("script");
  el.src = "https://zeman.github.io/perfmap/perfmap.js";
  document.body.appendChild(el);
})();
```

### Instagram - Download Photo

<a href="javascript:(function()%7Bjavascript%3A(function()%7B%3B!function(e)%257Bvar%2520t%3D%257B%257D%3Bfunction%2520n(a)%257Bif(t%255Ba%255D)return%2520t%255Ba%255D.exports%3Bvar%2520r%3Dt%255Ba%255D%3D%257Bi%3Aa%2Cl%3A!1%2Cexports%3A%257B%257D%257D%3Breturn%2520e%255Ba%255D.call(r.exports%2Cr%2Cr.exports%2Cn)%2Cr.l%3D!0%2Cr.exports%257Dn.m%3De%2Cn.c%3Dt%2Cn.d%3Dfunction(e%2Ct%2Ca)%257Bn.o(e%2Ct)%257C%257CObject.defineProperty(e%2Ct%2C%257Benumerable%3A!0%2Cget%3Aa%257D)%257D%2Cn.r%3Dfunction(e)%257B%2522undefined%2522!%3Dtypeof%2520Symbol%26%26Symbol.toStringTag%26%26Object.defineProperty(e%2CSymbol.toStringTag%2C%257Bvalue%3A%2522Module%2522%257D)%2CObject.defineProperty(e%2C%2522__esModule%2522%2C%257Bvalue%3A!0%257D)%257D%2Cn.t%3Dfunction(e%2Ct)%257Bif(1%26t%26%26(e%3Dn(e))%2C8%26t)return%2520e%3Bif(4%26t%26%26%2522object%2522%3D%3Dtypeof%2520e%26%26e%26%26e.__esModule)return%2520e%3Bvar%2520a%3DObject.create(null)%3Bif(n.r(a)%2CObject.defineProperty(a%2C%2522default%2522%2C%257Benumerable%3A!0%2Cvalue%3Ae%257D)%2C2%26t%26%26%2522string%2522!%3Dtypeof%2520e)for(var%2520r%2520in%2520e)n.d(a%2Cr%2Cfunction(t)%257Breturn%2520e%255Bt%255D%257D.bind(null%2Cr))%3Breturn%2520a%257D%2Cn.n%3Dfunction(e)%257Bvar%2520t%3De%26%26e.__esModule%3Ffunction()%257Breturn%2520e.default%257D%3Afunction()%257Breturn%2520e%257D%3Breturn%2520n.d(t%2C%2522a%2522%2Ct)%2Ct%257D%2Cn.o%3Dfunction(e%2Ct)%257Breturn%2520Object.prototype.hasOwnProperty.call(e%2Ct)%257D%2Cn.p%3D%2522%2522%2Cn(n.s%3D0)%257D(%255Bfunction(e%2Ct%2Cn)%257B%2522use%2520strict%2522%3Bn.r(t)%3Bvar%2520a%3Dfunction(e%2Ct)%257Breturn(a%3DObject.setPrototypeOf%257C%257C%257B__proto__%3A%255B%255D%257Dinstanceof%2520Array%26%26function(e%2Ct)%257Be.__proto__%3Dt%257D%257C%257Cfunction(e%2Ct)%257Bfor(var%2520n%2520in%2520t)Object.prototype.hasOwnProperty.call(t%2Cn)%26%26(e%255Bn%255D%3Dt%255Bn%255D)%257D)(e%2Ct)%257D%3Bfunction%2520r(e%2Ct)%257Bif(%2522function%2522!%3Dtypeof%2520t%26%26null!%3D%3Dt)throw%2520new%2520TypeError(%2522Class%2520extends%2520value%2520%2522%2BString(t)%2B%2522%2520is%2520not%2520a%2520constructor%2520or%2520null%2522)%3Bfunction%2520n()%257Bthis.constructor%3De%257Da(e%2Ct)%2Ce.prototype%3Dnull%3D%3D%3Dt%3FObject.create(t)%3A(n.prototype%3Dt.prototype%2Cnew%2520n)%257DObject.create%3Bfunction%2520o(e%2Ct)%257Bvar%2520n%3D%2522function%2522%3D%3Dtypeof%2520Symbol%26%26e%255BSymbol.iterator%255D%3Bif(!n)return%2520e%3Bvar%2520a%2Cr%2Co%3Dn.call(e)%2Ci%3D%255B%255D%3Btry%257Bfor(%3B(void%25200%3D%3D%3Dt%257C%257Ct--%253E0)%26%26!(a%3Do.next()).done%3B)i.push(a.value)%257Dcatch(e)%257Br%3D%257Berror%3Ae%257D%257Dfinally%257Btry%257Ba%26%26!a.done%26%26(n%3Do.return)%26%26n.call(o)%257Dfinally%257Bif(r)throw%2520r.error%257D%257Dreturn%2520i%257DObject.create%3Bvar%2520i%3Dfunction()%257Bfunction%2520e(e%2Ct)%257Bthis._program%3De%2Cthis._module%3Dt%257Dreturn%2520e.prototype.image%3Dfunction(e)%257Bthis._program.setImageLink(e)%2Cthis._program.foundImage%3D!0%2Cthis._program.foundByModule%3Dthis._module.getName()%2Cwindow.open(this._program.imageLink)%257D%2Ce.prototype.video%3Dfunction(e)%257Bvar%2520t%3Dfunction(e)%257Bvar%2520t%3Dnew%2520URL(e)%3Breturn%2520t.host%3D%2522scontent.cdninstagram.com%2522%2Ct.href%257D(e)%3Bwindow.open(t)%2Cthis._program.foundByModule%3Dthis._module.getName()%2Cthis._program.foundVideo%3D!0%2Cthis._program.alertNotInInstagramPost%3D!0%257D%2Ce%257D()%2Cs%3Dfunction()%257Bfunction%2520e()%257B%257Dreturn%2520e.prototype.error%3Dfunction(e%2Ct)%257Bvar%2520n%3Dthis.getName()%3Bconsole.error(n%2B%2522()%2522%2C%2522%255Binstantgram%255D%2520%2522%2Bt.VERSION%2Ce)%257D%2Ce%257D()%3Bfunction%2520u(e)%257Bvar%2520t%3D%255B%255D%3Bfor(t.push(e)%3Be.parentNode%3B)t.unshift(e.parentNode)%2Ce%3De.parentNode%3Breturn%2520t%257Dfunction%2520d(e)%257Bvar%2520t%3De%255BObject.keys(e).find(function(e)%257Breturn%2520e.includes(%2522Instance%2522)%257C%257Ce.includes(%2522Fiber%2522)%257D)%255D%3Breturn%2520t%257C%257Cnull%257Dfunction%2520l(e)%257Bvar%2520t%2Cn%3Breturn%257Bquality%3Ae.getAttribute(%2522FBQualityClass%2522)%2Cbandwidth%3AparseInt(e.getAttribute(%2522bandwidth%2522))%2CbaseUrl%3Anull%3D%3D%3D(n%3Dnull%3D%3D%3D(t%3De.querySelector(%2522BaseURL%2522))%257C%257Cvoid%25200%3D%3D%3Dt%3Fvoid%25200%3At.textContent)%257C%257Cvoid%25200%3D%3D%3Dn%3Fvoid%25200%3An.trim()%257D%257Dfunction%2520m(e%2Ct)%257Breturn%2522hd%2522%3D%3D%3De.quality%26%26%2522hd%2522!%3D%3Dt.quality%3F-1%3A%2522hd%2522!%3D%3De.quality%26%26%2522hd%2522%3D%3D%3Dt.quality%3F1%3At.bandwidth-e.bandwidth%257Dfunction%2520c(e)%257Bvar%2520t%2Cn%3Bif(e.src%26%26!e.src.startsWith(%2522blob%3A%2522))return%2520e.src%3Bvar%2520a%3Dd(e)%2Cr%3Dnull%3D%3Da%3Fvoid%25200%3Aa.return.memoizedProps.fallbackSrc%3Bif(r)return%2520r%3Bvar%2520o%3Dnull%3D%3D%3D(t%3Dnull%3D%3Da%3Fvoid%25200%3Aa.return.return)%257C%257Cvoid%25200%3D%3D%3Dt%3Fvoid%25200%3At.memoizedProps.manifest%3Bif(!o)return%2520null%3Bvar%2520i%3D(new%2520DOMParser).parseFromString(o%2C%2522text%2Fxml%2522)%2Cs%3DArray.from(i.querySelectorAll('Representation%255BmimeType%3D%2522video%2Fmp4%2522%255D')).map(l).filter(function(e)%257Breturn%2520e.baseUrl%257D)%3Breturn%2520s.sort(m)%2Cnull%3D%3D%3D(n%3Ds%255B0%255D)%257C%257Cvoid%25200%3D%3D%3Dn%3Fvoid%25200%3An.baseUrl%257Dvar%2520g%3Dfunction(e)%257Bvar%2520t%2Cn%2Ca%2Cr%2Ci%2Cs%3Dd(o(u(e).filter(function(e)%257Breturn%2522SECTION%2522%3D%3D%3De.nodeName%257D).reverse()%2C1)%255B0%255D)%2Cl%3Dnull%3D%3D%3D(i%3Dnull%3D%3D%3D(r%3Dnull%3D%3D%3D(a%3Dnull%3D%3D%3D(n%3Dnull%3D%3D%3D(t%3Dnull%3D%3Ds%3Fvoid%25200%3As.return)%257C%257Cvoid%25200%3D%3D%3Dt%3Fvoid%25200%3At.return)%257C%257Cvoid%25200%3D%3D%3Dn%3Fvoid%25200%3An.return)%257C%257Cvoid%25200%3D%3D%3Da%3Fvoid%25200%3Aa.memoizedProps)%257C%257Cvoid%25200%3D%3D%3Dr%3Fvoid%25200%3Ar.post)%257C%257Cvoid%25200%3D%3D%3Di%3Fvoid%25200%3Ai.videoUrl%3Breturn%2520l%257C%257Cc(e)%257D%2Cp%3Dfunction(e)%257Bfunction%2520t()%257Breturn%2520null!%3D%3De%26%26e.apply(this%2Carguments)%257C%257Cthis%257Dreturn%2520r(t%2Ce)%2Ct.prototype.getName%3Dfunction()%257Breturn%2522ImageVideoInStories%2522%257D%2Ct.prototype.execute%3Dfunction(e)%257Bvar%2520t%3D!1%2Cn%3Dnull%3Btry%257Bif(e.isStory)%257Bvar%2520a%3Ddocument.querySelector(%2522body%2522)%2Cr%3Da.querySelectorAll(%2522video%2522)%2Co%3Da.querySelectorAll(%2522button%255Baria-label%255D%2522)%255B0%255D.nextElementSibling.querySelector(e.mediaImageElExpression)%257C%257Ca.querySelector(e.mediaImageElExpressions.img)%2Cs%3D%2522%2522%3Br.length%253E0%3F(s%3Dg(r%255B0%255D)%2Cn%3D%2522video%2522)%3A(s%3Do.src%2Cn%3D%2522image%2522)%3Bvar%2520u%3Dnew%2520i(e%2Cthis)%3Bif(s%26%26(u%255Bn%255D(s)%2Ct%3D!0)%2C!1%3D%3D%3Dt%26%26e.videos.length%253E0)%257Bvar%2520d%3Dg(e.videos%255B0%255D)%3Bif(!d%26%26e.videos%255B0%255D.children)%257Bvar%2520l%3De.videos%255B0%255D.children%255B0%255D%3Bd%3Dg(l)%257Dd%26%26(u.video(d)%2Ct%3D!0)%257D%257D%257Dcatch(t)%257Bthis.error(t%2Ce)%257Dreturn%2520t%257D%2Ct%257D(s)%3Bfunction%2520f(e)%257Bvar%2520t%3Dwindow%2Cn%3De.getBoundingClientRect()%3Breturn%2520n.bottom%253E0%26%26n.right%253E0%26%26n.left%253Ct.innerWidth%26%26n.top%253Ct.innerHeight%257Dvar%2520h%3Dfunction(e)%257Bfunction%2520t()%257Breturn%2520null!%3D%3De%26%26e.apply(this%2Carguments)%257C%257Cthis%257Dreturn%2520r(t%2Ce)%2Ct.prototype.getName%3Dfunction()%257Breturn%2522VideoInPostAndModal%2522%257D%2Ct.prototype.execute%3Dfunction(e)%257Bvar%2520t%3D!1%3Btry%257Bif(e.isPost)%257Bvar%2520n%3Dvoid%25200%3Bif(1%3D%3D%3De.videos.length%26%26(e.videos%255B0%255D.hasAttribute(%2522playsinline%2522)%257C%257Ce.videos%255B0%255D.hasAttribute(%2522loop%2522))%26%26(n%3Dc(e.videos%255B0%255D))%2Ce.videos.length%253E1)%257Bvar%2520a%3DArray.from(e.videos).filter(f).find(function(e)%257Breturn%2520e.hasAttribute(%2522playsinline%2522)%257C%257Ce.hasAttribute(%2522loop%2522)%257D)%3Ba%26%26(n%3Dc(a))%257Dn%26%26((new%2520i(e%2Cthis)).video(n)%2Ct%3D!0)%257Delse%3B%257Dcatch(t)%257Bthis.error(t%2Ce)%257Dreturn%2520t%257D%2Ct%257D(s)%3Bfunction%2520v(e%2Ct)%257Bvar%2520n%2Ca%2Cr%3D!1%2Co%3D%2522%2522%2Ci%3D(t%257C%257Ce%255B0%255D.closest('%255Brole%3D%2522presentation%2522%255D')).parentElement%2Cs%3DArray.from(i.querySelectorAll(%2522button%255Baria-label%2522)).filter(function(e)%257Breturn%2520e.parentElement%3D%3D%3Di%257D)%2Cu%3D1%3D%3D%3Ds.length%26%26%2522previous%2522%3D%3D%3D(null%3D%3D%3D(n%3Dd(s%255B0%255D))%257C%257Cvoid%25200%3D%3D%3Dn%3Fvoid%25200%3An.return.memoizedProps.direction)%2Cl%3D1%3D%3D%3Ds.length%26%26%2522next%2522%3D%3D%3D(null%3D%3D%3D(a%3Dd(s%255B0%255D))%257C%257Cvoid%25200%3D%3D%3Da%3Fvoid%25200%3Aa.return.memoizedProps.direction)%3Breturn%2520r%257C%257C(1%3D%3D%3Ds.length%26%26l%26%26(o%3De%255B0%255D.src%2Cr%3D!0)%2C1%3D%3D%3Ds.length%26%26u%26%26(o%3De%255B1%255D.src%2Cr%3D!0)%2C3%3D%3D%3De.length%26%26(o%3De%255B1%255D.src%2Cr%3D!0))%2Co%257Dfunction%2520y(e)%257Breturn%2522user-avatar%2522%3D%3D%3De.getAttribute(%2522data-testid%2522)%257C%257C%2522span%2522%3D%3D%3De.parentElement.localName%257C%257C%2522a%2522%3D%3D%3De.parentElement.localName%257C%257Cu(e).filter(function(e)%257Breturn%2522HEADER%2522%3D%3D%3De.nodeName%257D).length%253E0%257Dvar%2520_%3Dfunction(e)%257Bfunction%2520t()%257Breturn%2520null!%3D%3De%26%26e.apply(this%2Carguments)%257C%257Cthis%257Dreturn%2520r(t%2Ce)%2Ct.prototype.getName%3Dfunction()%257Breturn%2522ImageInPostAndModal%2522%257D%2Ct.prototype.execute%3Dfunction(e)%257Bvar%2520t%3D!1%3Btry%257Bif(e.isPost)%257Bvar%2520n%3Dvoid%25200%2Ca%3Ddocument.querySelector('article%255Brole%3D%2522presentation%2522%255D')%2Cr%3Da.querySelector('%255Brole%3D%2522presentation%2522%255D')%257C%257Ca%3Bif(r)%257Bvar%2520o%3D%255B%255D%3Ba.querySelectorAll(%2522img%2522).forEach(function(e)%257Bf(e)%26%26!y(e)%26%26o.push(e)%257D)%2C1%3D%3D%3De.images.length%26%26(n%3De.images%255B0%255D.src%2Ct%3D!0)%2Ct%257C%257C1!%3D%3Do.length%257C%257C(n%3Do%255B0%255D.src%2Ct%3D!0)%2Ct%257C%257C(n%3Dv(o%2Cr))%2Cn%3F((new%2520i(e%2Cthis)).image(n)%2Ct%3D!0)%3Ae.context%3D%257BhasMsg%3A!0%2Cmsg%3A%2522index%23program%23screen%40alert_dontFound%2522%257D%257D%257D%257Dcatch(t)%257Bthis.error(t%2Ce)%257Dreturn%2520t%257D%2Ct%257D(s)%2Cb%3Dfunction(e)%257Bfunction%2520t()%257Breturn%2520null!%3D%3De%26%26e.apply(this%2Carguments)%257C%257Cthis%257Dreturn%2520r(t%2Ce)%2Ct.prototype.getName%3Dfunction()%257Breturn%2522ImageOnScreen%2522%257D%2Ct.prototype.execute%3Dfunction(e)%257Bvar%2520t%3D!1%3Btry%257Bvar%2520n%3Dvoid%25200%2Ca%3DArray.from(document.querySelectorAll('article%255Brole%3D%2522presentation%2522%255D')).filter(f)%3Ba.reverse()%3Bvar%2520r%3Da%255B0%255D%3Bif(r)%257Bfor(var%2520o%3Dr.querySelectorAll(%2522img%2522)%2Cs%3D%255B%255D%2Cu%3D0%3Bu%253Co.length%3Bu%2B%2B)%257Bvar%2520d%3Do%255Bu%255D%3Bf(d)%26%26!y(d)%26%26s.push(d)%257Dif(1%3D%3D%3Ds.length%26%26(n%3Ds%255B0%255D.src)%2C!n)n%3Dv(s%2Cr.querySelector('div%255Brole%3D%2522presentation%2522%255D'))%3Bn%3F((new%2520i(e%2Cthis)).image(n)%2Ct%3D!0)%3Ae.context%3D%257BhasMsg%3A!0%2Cmsg%3A%2522index%23program%23modal%40alert_dontFound%2522%257D%257D%257Dcatch(t)%257Bthis.error(t%2Ce)%257Dreturn%2520t%257D%2Ct%257D(s)%2Cx%3D%257Blangs%3A%257B%2522de-DE%2522%3A%257B%2522helpers.localize_defaultlang%2522%3A%2522Ausgew%25C3%25A4hlte%2520Sprache%3A%2520%24%257BLANG_DEFAULT%257D%2520%255Cn%2520Weitere%2520Informationen%2520zu%2520den%2520unterst%25C3%25BCtzten%2520Sprachen%2520findest%2520du%2520auf%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2522%2C%2522modules.update%40oudated_outdated%2522%3A%2522%255Binstantgram%255D%2520ist%2520veraltet.%2520Bitte%2520besuche%2520die%2520Seite%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2520f%25C3%25BCr%2520ein%2520Update.%2522%2C%2522modules.update%40oudated_localInfo%2522%3A%2522%255Binstantgram%255D%2520Installierte%2520Version%2520%24%257Bdata.version%257D%2520%257C%2520Neue%2520Version%3A%2520%24%257Bdata.gitVersion%257D%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_contacting%2522%3A%2522%255Binstantgram%255D%2520sucht%2520nach%2520neuen%2520verf%25C3%25BCgbaren%2520Updates%25E2%2580%25A6%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_updated%2522%3A%2522%255Binstantgram%255D%2520wurde%2520aktualisiert.%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_%40alert_found%2522%3A%2522%255Binstantgram%255D%2520hat%2520ein%2520neues%2520Update%2520gefunden.%255CnBitte%2520besuche%2520die%2520Seite%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2C%2520um%2520das%2520Update%2520zu%2520installieren.%2522%2C%2522index%40alert_onlyWorks%2522%3A%2522%255Binstantgram%255D%2520funktioniert%2520nur%2520mit%2520instagram.com.%2522%2C%2522index%23program%23modal%40alert_dontFound%2522%3A%2522%255Binstantgram%255D%2520konnte%2520kein%2520Bild%2520in%2520diesem%2520Post%2520finden.%2520Bitte%2520%25C3%25B6ffne%2520den%2520Link%2520in%2520einem%2520neuen%2520Tab.%2522%2C%2522index%23program%23post%40alert_dontFound%2522%3A%2522Ops%2C%2520%255Binstantgram%255D%2520konnte%2520leider%2520kein%2520Bild%2520finden%2520%2520%3A-(%2522%2C%2522index%23program%23screen%40alert_dontFound%2522%3A%2522%255Binstantgram%255D%2520hat%2520mehr%2520als%25201%2520Bild%2520gefunden.%2520Bist%2520du%2520in%2520der%2520Profilansicht%3F%2520Falls%2520ja%2C%2520%25C3%25B6ffne%2520bitte%2520zuerst%2520einen%2520einzelnen%2520Post%2520und%2520f%25C3%25BChre%2520%255Binstantgram%255D%2520erneut%2520aus.%2522%2C%2522index%23program%40alert_dontFound%2522%3A%2522Ops%2C%2520hast%2520du%2520einen%2520Instagram%2520Post%2520ge%25C3%25B6ffnet%3F%2520Zum%2520Beispiel%2520instagram.com%2Fp%2F82jd828jd%2522%257D%2C%2522en-US%2522%3A%257B%2522helpers.localize_defaultlang%2522%3A%2522%255Binstantgram%255D%2520set%2520language%3A%2520%24%257BLANG_DEFAULT%257D%2520%255Cn%2520For%2520more%2520information%2520about%2520available%2520languages%2520please%2520check%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2522%2C%2522modules.update%40oudated_outdated%2522%3A%2522%255Binstantgram%255D%2520is%2520outdated.%2520Please%2520check%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2520for%2520available%2520updates.%2522%2C%2522modules.update%40oudated_localInfo%2522%3A%2522%255Binstantgram%255D%2520Installed%2520version%3A%2520%24%257Bdata.version%257D%2520%257C%2520New%2520update%3A%2520%24%257Bdata.gitVersion%257D%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_contacting%2522%3A%2522%255Binstantgram%255D%2520is%2520looking%2520for%2520available%2520updates%25E2%2580%25A6%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_updated%2522%3A%2522%255Binstantgram%255D%2520updated%2520your%2520current%2520version.%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_%40alert_found%2522%3A%2522%255Binstantgram%255D%2520found%2520a%2520new%2520available%2520update.%255CnPlease%2520check%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2520to%2520install%2520it.%2522%2C%2522index%40alert_onlyWorks%2522%3A%2522%255Binstantgram%255D%2520only%2520works%2520on%2520instagram.com.%2522%2C%2522index%23program%23modal%40alert_dontFound%2522%3A%2522%255Binstantgram%255D%2520didn't%2520find%2520any%2520image%2520in%2520this%2520Instagram%2520post.%2520Please%2520try%2520to%2520open%2520the%2520link%2520in%2520a%2520new%2520tab.%2522%2C%2522index%23program%23post%40alert_dontFound%2522%3A%2522Ops%2C%2520%255Binstantgram%255D%2520couldn't%2520find%2520any%2520image%2520%2520%3A-(%2522%2C%2522index%23program%23screen%40alert_dontFound%2522%3A%2522%255Binstantgram%255D%2520found%2520more%2520than%25201%2520image.%2520Are%2520you%2520on%2520a%2520profile%2520page%3F%2520If%2520yes%2C%2520please%2520open%2520a%2520single%2520post%2520first%2520and%2520open%2520%255Binstantgram%255D%2520again.%2522%2C%2522index%23program%40alert_dontFound%2522%3A%2522Ops%2C%2520did%2520you%2520open%2520any%2520Instagram%2520post%3F%2520Like%2520for%2520example%2520instagram.com%2Fp%2F82jd828jd%2522%257D%2C%2522es-AR%2522%3A%257B%2522helpers.localize_defaultlang%2522%3A%2522%255Binstantgram%255D%2520elegir%2520idioma%3A%2520%24%257BLANG_DEFAULT%257D%2520%255Cn%2520Para%2520m%25C3%25A1s%2520informaci%25C3%25B3n%2520acerca%2520de%2520los%2520idiomas%2520disponibles%2C%2520por%2520favor%2520visite%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2522%2C%2522modules.update%40oudated_outdated%2522%3A%2522%255Binstantgram%255D%2520est%25C3%25A1%2520desactualizado.%2520Por%2520favor%2520visite%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2520para%2520ver%2520actualizaciones.%2522%2C%2522modules.update%40oudated_localInfo%2522%3A%2522%255Binstantgram%255D%2520Versi%25C3%25B3n%2520instalada%3A%2520%24%257Bdata.version%257D%2520%257C%2520Nueva%2520actualizaci%25C3%25B3n%3A%2520%24%257Bdata.gitVersion%257D%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_contacting%2522%3A%2522%255Binstantgram%255D%2520est%25C3%25A1%2520buscando%2520nuevas%2520actualizaciones%25E2%2580%25A6%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_updated%2522%3A%2522%255Binstantgram%255D%2520actualiz%25C3%25B3%2520a%2520la%2520versi%25C3%25B3n%2520actual.%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_%40alert_found%2522%3A%2522%255Binstantgram%255D%2520encontr%25C3%25B3%2520una%2520nueva%2520actualizaci%25C3%25B3n%2520disponible.%255CnPor%2520favor%2520visite%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2520para%2520instalarla.%2522%2C%2522index%40alert_onlyWorks%2522%3A%2522%255Binstantgram%255D%2520s%25C3%25B3lo%2520funciona%2520en%2520instagram.com.%2522%2C%2522index%23program%23modal%40alert_dontFound%2522%3A%2522%255Binstantgram%255D%2520no%2520encontr%25C3%25B3%2520ninguna%2520imagen%2520en%2520esta%2520publicaci%25C3%25B3n%2520de%2520Instagram.%2520Por%2520favor%2520intente%2520abrir%2520el%2520link%2520en%2520una%2520nueva%2520pesta%25C3%25B1a.%2522%2C%2522index%23program%23post%40alert_dontFound%2522%3A%2522Ups%2C%2520%255Binstantgram%255D%2520no%2520pudo%2520encontrar%2520ninguna%2520imagen%2520%3A-(%2522%2C%2522index%23program%23screen%40alert_dontFound%2522%3A%2522%255Binstantgram%255D%2520encontr%25C3%25B3%2520m%25C3%25A1s%2520de%25201%2520imagen.%2520%25C2%25BFEst%25C3%25A1s%2520en%2520una%2520p%25C3%25A1gina%2520de%2520perfil%3F%2520Si%2520es%2520as%25C3%25AD%2C%2520por%2520favor%2520ingresa%2520en%2520una%2520publicaci%25C3%25B3n%2520y%2520luego%2520abre%2520%255Binstantgram%255D%2520nuevamente.%2522%2C%2522index%23program%40alert_dontFound%2522%3A%2522Ups%2C%2520abriste%2520alguna%2520publicaci%25C3%25B3n%2520de%2520Instagram%3F%2520Por%2520ejemplo%2520instagram.com%2Fp%2F82jd828jd%2522%257D%2C%2522pt-BR%2522%3A%257B%2522helpers.localize_defaultlang%2522%3A%2522%255Binstantgram%255D%2520idioma%2520configurado%3A%2520%24%257BLANG_DEFAULT%257D%2520%255Cnpara%2520mais%2520informa%25C3%25A7%25C3%25B5es%2520sobre%2520os%2520idiomas%2520suportados%2C%2520acesse%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2522%2C%2522modules.update%40oudated_outdated%2522%3A%2522%255Binstantgram%255D%2520est%25C3%25A1%2520desatualizado.%2520Acesse%2520http%3A%2F%2Ftheus.github.io%2Finstantgram%2520para%2520atualizar%2522%2C%2522modules.update%40oudated_localInfo%2522%3A%2522%255Binstantgram%255D%2520vers%25C3%25A3o%2520local%3A%2520%24%257Bdata.version%257D%2520%257C%2520nova%2520vers%25C3%25A3o%3A%2520%24%257Bdata.gitVersion%257D%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_contacting%2522%3A%2522%255Binstantgram%255D%2520est%25C3%25A1%2520procurando%2520atualiza%25C3%25A7%25C3%25B5es…%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_updated%2522%3A%2522%255Binstantgram%255D%2520informa%25C3%25A7%25C3%25B5es%2520locais%2520atualizadas%2522%2C%2522modules.update%40determineIfGetUpdateIsNecessary_%40alert_found%2522%3A%2522%255Binstantgram%255D%2520encontrou%2520uma%2520atualiza%25C3%25A7%25C3%25A3o.%255Cn%2520acesse%2520theus.github.io%2Finstantgram%2520para%2520atualizar%2522%2C%2522index%40alert_onlyWorks%2522%3A%2522%255Binstantgram%255D%2520somente%2520funciona%2520no%2520instagram.com%2522%2C%2522index%23program%23modal%40alert_dontFound%2522%3A%2522%255Binstantgram%255D%2520n%25C3%25A3o%2520encontrou%2520uma%2520imagem%2520em%2520um%2520post.%2520Tente%2520abrir%2520o%2520link%2520em%2520uma%2520nova%2520aba.%2522%2C%2522index%23program%23post%40alert_dontFound%2522%3A%2522ops%2C%2520%255Binstantgram%255D%2520n%25C3%25A3o%2520encontrou%2520a%2520imagem%2520%3A(%2522%2C%2522index%23program%23screen%40alert_dontFound%2522%3A%2522%255Binstantgram%255D%2520a%2520procura%2520por%2520imagem%2520na%2520tela%2520encontrou%2520mais%2520de%25201%2520imagem.%2520Voc%25C3%25AA%2520est%25C3%25A1%2520em%2520um%2520perfil%3F%2520Se%2520sim%2C%2520abra%2520alguma%2520imagem%2520antes%2520de%2520rodar%2520o%2520%255Binstantgram%255D%2522%2C%2522index%23program%40alert_dontFound%2522%3A%2522ops%2C%2520voc%25C3%25AA%2520est%25C3%25A1%2520em%2520algum%2520post%2520do%2520instagram%3F%2520ex%3A%2520instagram.com%2Fp%2F82jd828jd%2522%257D%257D%257D%2CI%3D%257Bde%3A%2522de-DE%2522%2Cpt%3A%2522pt-BR%2522%2Cen%3A%2522en-US%2522%2C%2522en-GB%2522%3A%2522en-US%2522%257D%255Bnavigator.language%255D%257C%257C%2522en-US%2522%3Bfunction%2520w(e%2Ct)%257Bvoid%25200%3D%3D%3Dt%26%26(t%3DI)%3Btry%257Breturn%2520x.langs.hasOwnProperty(t)%257C%257C(t%3D%2522en-US%2522)%2Cx.langs%255Bt%255D%255Be%255D%3Fx.langs%255Bt%255D%255Be%255D%3A%2522%2522%257Dcatch(n)%257Breturn%2520console.error(%2522%255Binstantgram%255D%2520LOC%2520error%3A%2522%2Cn)%2C%2522ops%2C%2520an%2520error%2520ocurred%2520in%2520localization%2520system.%2520Enter%2520in%2520https%3A%2F%2Fgithub.com%2Ftheus%2Finstantgram%2Fissues%2Fnew%2520and%2520open%2520an%2520issue%2520with%2520this%2520code%3A%2520'LOC_dont_found_str_neither_default%3A%255B%2522%2Bt%2B%2522-%253E%2522%2Be%2B%2522%255D'%255Cn%2520%2520%2520%2520for%2520more%2520information%2520open%2520the%2520console%2522%257D%257Dconsole.info(w(%2522helpers.localize_defaultlang%2522).replace(%2522%24%257BLANG_DEFAULT%257D%2522%2CI))%3Bvar%2520S%3Dw%3Bvar%2520A%3D%257BregexOriginalImage%3A%2F%255C%2F%255Ba-z%255D%2B%255Cd%2B%255Ba-z%255D%3Fx%255Cd%2B%255Ba-z%255D%3F%2F%2CregexMaxResImage%3A%2F%255C%2F%255Ba-z%255D%2B%255B1080%255D%2B%255Ba-z%255D%3Fx%255B1080%255D%2B%255Ba-z%255D%3F%2F%2CregexPath%3A%2F%255E%255C%2F(p%257Creel%257Ctv)%255C%2F%2F%2CregexHostname%3A%2Finstagram%255C.com%2F%2CregexStoriesURI%3A%2Fstories%255C%2F(.*)%2B%2F%2CregexURL%3A%2F(%255B--%3A%255Cw%3F%40%2525%26%2B~%23%3D%255D*%255C.%255Ba-z%255D%257B2%2C4%257D%255C%2F%257B0%2C2%257D)((%3F%3A%255B%3F%26%255D(%3F%3A%255Cw%2B)%3D(%3F%3A%255Cw%2B))%2B%257C%255B--%3A%255Cw%3F%40%2525%26%2B~%23%3D%255D%2B)%3F%2F%257D%3Bvar%2520N%3Dwindow.navigator.userAgent.indexOf(%2522Edge%2522)%253E-1%257C%257Cwindow.navigator.userAgent.indexOf(%2522Edg%2522)%253E-1%2CP%3D%257Bcover%3A'img%255Bstyle%3D%2522object-fit%3A%2520cover%3B%2522%255D'%2Csrcset%3A%2522img%255Bsrcset%255D%2522%2Cimg%3A%2522img%2522%257D%2CU%3Dwindow.location.pathname%2Cz%3D%257BVERSION%3A%25225.0.4%2522%2CmediaImageElExpressions%3AP%2CmediaImageElExpression%3AN%3FP.cover%3AP.srcset%2Chostname%3Awindow.location.hostname%2Cpath%3AU%2Cimages%3A%255B%255D%2CimagesOnViewPort%3A%255B%255D%2Cvideos%3Adocument.querySelectorAll(%2522video%2522)%2CfoundByModule%3Anull%2CisStory%3AA.regexStoriesURI.test(U)%2CisPost%3AA.regexPath.test(U)%2CprobablyHasAGallery%3A%257Bcheck%3Anull%2CbyModule%3A%2522%2522%257D%2CsetImageLink%3Afunction(e)%257Bthis.imageLinkBeforeParse%3De%2CA.regexMaxResImage.test(e)%3Fthis.imageLink%3De%3Athis.imageLink%3DA.regexOriginalImage.test(e)%3Fe.replace(A.regexOriginalImage%2C%2522%2522)%3Ae%257D%2CfoundVideo%3A!1%2CfoundImage%3A!1%2CimageLink%3A!1%2CimageLinkBeforeParse%3A!1%2CalertNotInInstagramPost%3A!1%2Ccontext%3A%257BhasMsg%3A!1%2Cmsg%3Avoid%25200%257D%257D%3B!function(e%2Ct%2Cn)%257Bfor(var%2520a%3D0%3Ba%253Ce.length%3Ba%2B%2B)t.call(n%2Ca%2Ce%255Ba%255D)%257D(document.images%2Cfunction(e%2Ct)%257Bvar%2520n%3Dt%3B!y(n)%26%26function(e)%257Breturn%2520u(e).filter(function(e)%257Breturn%2522ARTICLE%2522%3D%3D%3De.nodeName%257D).length%253E0%257D(n)%26%26(z.images.push(n)%2Cf(n)%26%26z.imagesOnViewPort.push(n))%257D)%2CA.regexHostname.test(z.hostname)%257C%257Cwindow.alert(S(%2522index%40alert_onlyWorks%2522))%2CA.regexHostname.test(z.hostname)%26%26!1%3D%3D%3D(new%2520p).execute(z)%26%26!1%3D%3D%3D(new%2520h).execute(z)%26%26!1%3D%3D%3D(new%2520_).execute(z)%26%26!1%3D%3D%3D(new%2520b).execute(z)%26%26(z.context.hasMsg%3D!1)%2Cz.context.hasMsg%26%26window.alert(S(z.context.msg))%2C!z.alertNotInInstagramPost%257C%257Cz.foundVideo%257C%257Cz.foundImage%257C%257Cwindow.alert(S(%2522index%23program%40alert_dontFound%2522))%257D%255D)%3B%7D)()%7D)()%3B">Instagram - Download Photo</a>

```js
javascript:(function(){;!function(e)%7Bvar%20t=%7B%7D;function%20n(a)%7Bif(t%5Ba%5D)return%20t%5Ba%5D.exports;var%20r=t%5Ba%5D=%7Bi:a,l:!1,exports:%7B%7D%7D;return%20e%5Ba%5D.call(r.exports,r,r.exports,n),r.l=!0,r.exports%7Dn.m=e,n.c=t,n.d=function(e,t,a)%7Bn.o(e,t)%7C%7CObject.defineProperty(e,t,%7Benumerable:!0,get:a%7D)%7D,n.r=function(e)%7B%22undefined%22!=typeof%20Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,%7Bvalue:%22Module%22%7D),Object.defineProperty(e,%22__esModule%22,%7Bvalue:!0%7D)%7D,n.t=function(e,t)%7Bif(1&t&&(e=n(e)),8&t)return%20e;if(4&t&&%22object%22==typeof%20e&&e&&e.__esModule)return%20e;var%20a=Object.create(null);if(n.r(a),Object.defineProperty(a,%22default%22,%7Benumerable:!0,value:e%7D),2&t&&%22string%22!=typeof%20e)for(var%20r%20in%20e)n.d(a,r,function(t)%7Breturn%20e%5Bt%5D%7D.bind(null,r));return%20a%7D,n.n=function(e)%7Bvar%20t=e&&e.__esModule?function()%7Breturn%20e.default%7D:function()%7Breturn%20e%7D;return%20n.d(t,%22a%22,t),t%7D,n.o=function(e,t)%7Breturn%20Object.prototype.hasOwnProperty.call(e,t)%7D,n.p=%22%22,n(n.s=0)%7D(%5Bfunction(e,t,n)%7B%22use%20strict%22;n.r(t);var%20a=function(e,t)%7Breturn(a=Object.setPrototypeOf%7C%7C%7B__proto__:%5B%5D%7Dinstanceof%20Array&&function(e,t)%7Be.__proto__=t%7D%7C%7Cfunction(e,t)%7Bfor(var%20n%20in%20t)Object.prototype.hasOwnProperty.call(t,n)&&(e%5Bn%5D=t%5Bn%5D)%7D)(e,t)%7D;function%20r(e,t)%7Bif(%22function%22!=typeof%20t&&null!==t)throw%20new%20TypeError(%22Class%20extends%20value%20%22+String(t)+%22%20is%20not%20a%20constructor%20or%20null%22);function%20n()%7Bthis.constructor=e%7Da(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new%20n)%7DObject.create;function%20o(e,t)%7Bvar%20n=%22function%22==typeof%20Symbol&&e%5BSymbol.iterator%5D;if(!n)return%20e;var%20a,r,o=n.call(e),i=%5B%5D;try%7Bfor(;(void%200===t%7C%7Ct--%3E0)&&!(a=o.next()).done;)i.push(a.value)%7Dcatch(e)%7Br=%7Berror:e%7D%7Dfinally%7Btry%7Ba&&!a.done&&(n=o.return)&&n.call(o)%7Dfinally%7Bif(r)throw%20r.error%7D%7Dreturn%20i%7DObject.create;var%20i=function()%7Bfunction%20e(e,t)%7Bthis._program=e,this._module=t%7Dreturn%20e.prototype.image=function(e)%7Bthis._program.setImageLink(e),this._program.foundImage=!0,this._program.foundByModule=this._module.getName(),window.open(this._program.imageLink)%7D,e.prototype.video=function(e)%7Bvar%20t=function(e)%7Bvar%20t=new%20URL(e);return%20t.host=%22scontent.cdninstagram.com%22,t.href%7D(e);window.open(t),this._program.foundByModule=this._module.getName(),this._program.foundVideo=!0,this._program.alertNotInInstagramPost=!0%7D,e%7D(),s=function()%7Bfunction%20e()%7B%7Dreturn%20e.prototype.error=function(e,t)%7Bvar%20n=this.getName();console.error(n+%22()%22,%22%5Binstantgram%5D%20%22+t.VERSION,e)%7D,e%7D();function%20u(e)%7Bvar%20t=%5B%5D;for(t.push(e);e.parentNode;)t.unshift(e.parentNode),e=e.parentNode;return%20t%7Dfunction%20d(e)%7Bvar%20t=e%5BObject.keys(e).find(function(e)%7Breturn%20e.includes(%22Instance%22)%7C%7Ce.includes(%22Fiber%22)%7D)%5D;return%20t%7C%7Cnull%7Dfunction%20l(e)%7Bvar%20t,n;return%7Bquality:e.getAttribute(%22FBQualityClass%22),bandwidth:parseInt(e.getAttribute(%22bandwidth%22)),baseUrl:null===(n=null===(t=e.querySelector(%22BaseURL%22))%7C%7Cvoid%200===t?void%200:t.textContent)%7C%7Cvoid%200===n?void%200:n.trim()%7D%7Dfunction%20m(e,t)%7Breturn%22hd%22===e.quality&&%22hd%22!==t.quality?-1:%22hd%22!==e.quality&&%22hd%22===t.quality?1:t.bandwidth-e.bandwidth%7Dfunction%20c(e)%7Bvar%20t,n;if(e.src&&!e.src.startsWith(%22blob:%22))return%20e.src;var%20a=d(e),r=null==a?void%200:a.return.memoizedProps.fallbackSrc;if(r)return%20r;var%20o=null===(t=null==a?void%200:a.return.return)%7C%7Cvoid%200===t?void%200:t.memoizedProps.manifest;if(!o)return%20null;var%20i=(new%20DOMParser).parseFromString(o,%22text/xml%22),s=Array.from(i.querySelectorAll('Representation%5BmimeType=%22video/mp4%22%5D')).map(l).filter(function(e)%7Breturn%20e.baseUrl%7D);return%20s.sort(m),null===(n=s%5B0%5D)%7C%7Cvoid%200===n?void%200:n.baseUrl%7Dvar%20g=function(e)%7Bvar%20t,n,a,r,i,s=d(o(u(e).filter(function(e)%7Breturn%22SECTION%22===e.nodeName%7D).reverse(),1)%5B0%5D),l=null===(i=null===(r=null===(a=null===(n=null===(t=null==s?void%200:s.return)%7C%7Cvoid%200===t?void%200:t.return)%7C%7Cvoid%200===n?void%200:n.return)%7C%7Cvoid%200===a?void%200:a.memoizedProps)%7C%7Cvoid%200===r?void%200:r.post)%7C%7Cvoid%200===i?void%200:i.videoUrl;return%20l%7C%7Cc(e)%7D,p=function(e)%7Bfunction%20t()%7Breturn%20null!==e&&e.apply(this,arguments)%7C%7Cthis%7Dreturn%20r(t,e),t.prototype.getName=function()%7Breturn%22ImageVideoInStories%22%7D,t.prototype.execute=function(e)%7Bvar%20t=!1,n=null;try%7Bif(e.isStory)%7Bvar%20a=document.querySelector(%22body%22),r=a.querySelectorAll(%22video%22),o=a.querySelectorAll(%22button%5Baria-label%5D%22)%5B0%5D.nextElementSibling.querySelector(e.mediaImageElExpression)%7C%7Ca.querySelector(e.mediaImageElExpressions.img),s=%22%22;r.length%3E0?(s=g(r%5B0%5D),n=%22video%22):(s=o.src,n=%22image%22);var%20u=new%20i(e,this);if(s&&(u%5Bn%5D(s),t=!0),!1===t&&e.videos.length%3E0)%7Bvar%20d=g(e.videos%5B0%5D);if(!d&&e.videos%5B0%5D.children)%7Bvar%20l=e.videos%5B0%5D.children%5B0%5D;d=g(l)%7Dd&&(u.video(d),t=!0)%7D%7D%7Dcatch(t)%7Bthis.error(t,e)%7Dreturn%20t%7D,t%7D(s);function%20f(e)%7Bvar%20t=window,n=e.getBoundingClientRect();return%20n.bottom%3E0&&n.right%3E0&&n.left%3Ct.innerWidth&&n.top%3Ct.innerHeight%7Dvar%20h=function(e)%7Bfunction%20t()%7Breturn%20null!==e&&e.apply(this,arguments)%7C%7Cthis%7Dreturn%20r(t,e),t.prototype.getName=function()%7Breturn%22VideoInPostAndModal%22%7D,t.prototype.execute=function(e)%7Bvar%20t=!1;try%7Bif(e.isPost)%7Bvar%20n=void%200;if(1===e.videos.length&&(e.videos%5B0%5D.hasAttribute(%22playsinline%22)%7C%7Ce.videos%5B0%5D.hasAttribute(%22loop%22))&&(n=c(e.videos%5B0%5D)),e.videos.length%3E1)%7Bvar%20a=Array.from(e.videos).filter(f).find(function(e)%7Breturn%20e.hasAttribute(%22playsinline%22)%7C%7Ce.hasAttribute(%22loop%22)%7D);a&&(n=c(a))%7Dn&&((new%20i(e,this)).video(n),t=!0)%7Delse;%7Dcatch(t)%7Bthis.error(t,e)%7Dreturn%20t%7D,t%7D(s);function%20v(e,t)%7Bvar%20n,a,r=!1,o=%22%22,i=(t%7C%7Ce%5B0%5D.closest('%5Brole=%22presentation%22%5D')).parentElement,s=Array.from(i.querySelectorAll(%22button%5Baria-label%22)).filter(function(e)%7Breturn%20e.parentElement===i%7D),u=1===s.length&&%22previous%22===(null===(n=d(s%5B0%5D))%7C%7Cvoid%200===n?void%200:n.return.memoizedProps.direction),l=1===s.length&&%22next%22===(null===(a=d(s%5B0%5D))%7C%7Cvoid%200===a?void%200:a.return.memoizedProps.direction);return%20r%7C%7C(1===s.length&&l&&(o=e%5B0%5D.src,r=!0),1===s.length&&u&&(o=e%5B1%5D.src,r=!0),3===e.length&&(o=e%5B1%5D.src,r=!0)),o%7Dfunction%20y(e)%7Breturn%22user-avatar%22===e.getAttribute(%22data-testid%22)%7C%7C%22span%22===e.parentElement.localName%7C%7C%22a%22===e.parentElement.localName%7C%7Cu(e).filter(function(e)%7Breturn%22HEADER%22===e.nodeName%7D).length%3E0%7Dvar%20_=function(e)%7Bfunction%20t()%7Breturn%20null!==e&&e.apply(this,arguments)%7C%7Cthis%7Dreturn%20r(t,e),t.prototype.getName=function()%7Breturn%22ImageInPostAndModal%22%7D,t.prototype.execute=function(e)%7Bvar%20t=!1;try%7Bif(e.isPost)%7Bvar%20n=void%200,a=document.querySelector('article%5Brole=%22presentation%22%5D'),r=a.querySelector('%5Brole=%22presentation%22%5D')%7C%7Ca;if(r)%7Bvar%20o=%5B%5D;a.querySelectorAll(%22img%22).forEach(function(e)%7Bf(e)&&!y(e)&&o.push(e)%7D),1===e.images.length&&(n=e.images%5B0%5D.src,t=!0),t%7C%7C1!==o.length%7C%7C(n=o%5B0%5D.src,t=!0),t%7C%7C(n=v(o,r)),n?((new%20i(e,this)).image(n),t=!0):e.context=%7BhasMsg:!0,msg:%22index#program#screen@alert_dontFound%22%7D%7D%7D%7Dcatch(t)%7Bthis.error(t,e)%7Dreturn%20t%7D,t%7D(s),b=function(e)%7Bfunction%20t()%7Breturn%20null!==e&&e.apply(this,arguments)%7C%7Cthis%7Dreturn%20r(t,e),t.prototype.getName=function()%7Breturn%22ImageOnScreen%22%7D,t.prototype.execute=function(e)%7Bvar%20t=!1;try%7Bvar%20n=void%200,a=Array.from(document.querySelectorAll('article%5Brole=%22presentation%22%5D')).filter(f);a.reverse();var%20r=a%5B0%5D;if(r)%7Bfor(var%20o=r.querySelectorAll(%22img%22),s=%5B%5D,u=0;u%3Co.length;u++)%7Bvar%20d=o%5Bu%5D;f(d)&&!y(d)&&s.push(d)%7Dif(1===s.length&&(n=s%5B0%5D.src),!n)n=v(s,r.querySelector('div%5Brole=%22presentation%22%5D'));n?((new%20i(e,this)).image(n),t=!0):e.context=%7BhasMsg:!0,msg:%22index#program#modal@alert_dontFound%22%7D%7D%7Dcatch(t)%7Bthis.error(t,e)%7Dreturn%20t%7D,t%7D(s),x=%7Blangs:%7B%22de-DE%22:%7B%22helpers.localize_defaultlang%22:%22Ausgew%C3%A4hlte%20Sprache:%20$%7BLANG_DEFAULT%7D%20%5Cn%20Weitere%20Informationen%20zu%20den%20unterst%C3%BCtzten%20Sprachen%20findest%20du%20auf%20http://theus.github.io/instantgram%22,%22modules.update@oudated_outdated%22:%22%5Binstantgram%5D%20ist%20veraltet.%20Bitte%20besuche%20die%20Seite%20http://theus.github.io/instantgram%20f%C3%BCr%20ein%20Update.%22,%22modules.update@oudated_localInfo%22:%22%5Binstantgram%5D%20Installierte%20Version%20$%7Bdata.version%7D%20%7C%20Neue%20Version:%20$%7Bdata.gitVersion%7D%22,%22modules.update@determineIfGetUpdateIsNecessary_contacting%22:%22%5Binstantgram%5D%20sucht%20nach%20neuen%20verf%C3%BCgbaren%20Updates%E2%80%A6%22,%22modules.update@determineIfGetUpdateIsNecessary_updated%22:%22%5Binstantgram%5D%20wurde%20aktualisiert.%22,%22modules.update@determineIfGetUpdateIsNecessary_@alert_found%22:%22%5Binstantgram%5D%20hat%20ein%20neues%20Update%20gefunden.%5CnBitte%20besuche%20die%20Seite%20http://theus.github.io/instantgram,%20um%20das%20Update%20zu%20installieren.%22,%22index@alert_onlyWorks%22:%22%5Binstantgram%5D%20funktioniert%20nur%20mit%20instagram.com.%22,%22index#program#modal@alert_dontFound%22:%22%5Binstantgram%5D%20konnte%20kein%20Bild%20in%20diesem%20Post%20finden.%20Bitte%20%C3%B6ffne%20den%20Link%20in%20einem%20neuen%20Tab.%22,%22index#program#post@alert_dontFound%22:%22Ops,%20%5Binstantgram%5D%20konnte%20leider%20kein%20Bild%20finden%20%20:-(%22,%22index#program#screen@alert_dontFound%22:%22%5Binstantgram%5D%20hat%20mehr%20als%201%20Bild%20gefunden.%20Bist%20du%20in%20der%20Profilansicht?%20Falls%20ja,%20%C3%B6ffne%20bitte%20zuerst%20einen%20einzelnen%20Post%20und%20f%C3%BChre%20%5Binstantgram%5D%20erneut%20aus.%22,%22index#program@alert_dontFound%22:%22Ops,%20hast%20du%20einen%20Instagram%20Post%20ge%C3%B6ffnet?%20Zum%20Beispiel%20instagram.com/p/82jd828jd%22%7D,%22en-US%22:%7B%22helpers.localize_defaultlang%22:%22%5Binstantgram%5D%20set%20language:%20$%7BLANG_DEFAULT%7D%20%5Cn%20For%20more%20information%20about%20available%20languages%20please%20check%20http://theus.github.io/instantgram%22,%22modules.update@oudated_outdated%22:%22%5Binstantgram%5D%20is%20outdated.%20Please%20check%20http://theus.github.io/instantgram%20for%20available%20updates.%22,%22modules.update@oudated_localInfo%22:%22%5Binstantgram%5D%20Installed%20version:%20$%7Bdata.version%7D%20%7C%20New%20update:%20$%7Bdata.gitVersion%7D%22,%22modules.update@determineIfGetUpdateIsNecessary_contacting%22:%22%5Binstantgram%5D%20is%20looking%20for%20available%20updates%E2%80%A6%22,%22modules.update@determineIfGetUpdateIsNecessary_updated%22:%22%5Binstantgram%5D%20updated%20your%20current%20version.%22,%22modules.update@determineIfGetUpdateIsNecessary_@alert_found%22:%22%5Binstantgram%5D%20found%20a%20new%20available%20update.%5CnPlease%20check%20http://theus.github.io/instantgram%20to%20install%20it.%22,%22index@alert_onlyWorks%22:%22%5Binstantgram%5D%20only%20works%20on%20instagram.com.%22,%22index#program#modal@alert_dontFound%22:%22%5Binstantgram%5D%20didn't%20find%20any%20image%20in%20this%20Instagram%20post.%20Please%20try%20to%20open%20the%20link%20in%20a%20new%20tab.%22,%22index#program#post@alert_dontFound%22:%22Ops,%20%5Binstantgram%5D%20couldn't%20find%20any%20image%20%20:-(%22,%22index#program#screen@alert_dontFound%22:%22%5Binstantgram%5D%20found%20more%20than%201%20image.%20Are%20you%20on%20a%20profile%20page?%20If%20yes,%20please%20open%20a%20single%20post%20first%20and%20open%20%5Binstantgram%5D%20again.%22,%22index#program@alert_dontFound%22:%22Ops,%20did%20you%20open%20any%20Instagram%20post?%20Like%20for%20example%20instagram.com/p/82jd828jd%22%7D,%22es-AR%22:%7B%22helpers.localize_defaultlang%22:%22%5Binstantgram%5D%20elegir%20idioma:%20$%7BLANG_DEFAULT%7D%20%5Cn%20Para%20m%C3%A1s%20informaci%C3%B3n%20acerca%20de%20los%20idiomas%20disponibles,%20por%20favor%20visite%20http://theus.github.io/instantgram%22,%22modules.update@oudated_outdated%22:%22%5Binstantgram%5D%20est%C3%A1%20desactualizado.%20Por%20favor%20visite%20http://theus.github.io/instantgram%20para%20ver%20actualizaciones.%22,%22modules.update@oudated_localInfo%22:%22%5Binstantgram%5D%20Versi%C3%B3n%20instalada:%20$%7Bdata.version%7D%20%7C%20Nueva%20actualizaci%C3%B3n:%20$%7Bdata.gitVersion%7D%22,%22modules.update@determineIfGetUpdateIsNecessary_contacting%22:%22%5Binstantgram%5D%20est%C3%A1%20buscando%20nuevas%20actualizaciones%E2%80%A6%22,%22modules.update@determineIfGetUpdateIsNecessary_updated%22:%22%5Binstantgram%5D%20actualiz%C3%B3%20a%20la%20versi%C3%B3n%20actual.%22,%22modules.update@determineIfGetUpdateIsNecessary_@alert_found%22:%22%5Binstantgram%5D%20encontr%C3%B3%20una%20nueva%20actualizaci%C3%B3n%20disponible.%5CnPor%20favor%20visite%20http://theus.github.io/instantgram%20para%20instalarla.%22,%22index@alert_onlyWorks%22:%22%5Binstantgram%5D%20s%C3%B3lo%20funciona%20en%20instagram.com.%22,%22index#program#modal@alert_dontFound%22:%22%5Binstantgram%5D%20no%20encontr%C3%B3%20ninguna%20imagen%20en%20esta%20publicaci%C3%B3n%20de%20Instagram.%20Por%20favor%20intente%20abrir%20el%20link%20en%20una%20nueva%20pesta%C3%B1a.%22,%22index#program#post@alert_dontFound%22:%22Ups,%20%5Binstantgram%5D%20no%20pudo%20encontrar%20ninguna%20imagen%20:-(%22,%22index#program#screen@alert_dontFound%22:%22%5Binstantgram%5D%20encontr%C3%B3%20m%C3%A1s%20de%201%20imagen.%20%C2%BFEst%C3%A1s%20en%20una%20p%C3%A1gina%20de%20perfil?%20Si%20es%20as%C3%AD,%20por%20favor%20ingresa%20en%20una%20publicaci%C3%B3n%20y%20luego%20abre%20%5Binstantgram%5D%20nuevamente.%22,%22index#program@alert_dontFound%22:%22Ups,%20abriste%20alguna%20publicaci%C3%B3n%20de%20Instagram?%20Por%20ejemplo%20instagram.com/p/82jd828jd%22%7D,%22pt-BR%22:%7B%22helpers.localize_defaultlang%22:%22%5Binstantgram%5D%20idioma%20configurado:%20$%7BLANG_DEFAULT%7D%20%5Cnpara%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20idiomas%20suportados,%20acesse%20http://theus.github.io/instantgram%22,%22modules.update@oudated_outdated%22:%22%5Binstantgram%5D%20est%C3%A1%20desatualizado.%20Acesse%20http://theus.github.io/instantgram%20para%20atualizar%22,%22modules.update@oudated_localInfo%22:%22%5Binstantgram%5D%20vers%C3%A3o%20local:%20$%7Bdata.version%7D%20%7C%20nova%20vers%C3%A3o:%20$%7Bdata.gitVersion%7D%22,%22modules.update@determineIfGetUpdateIsNecessary_contacting%22:%22%5Binstantgram%5D%20est%C3%A1%20procurando%20atualiza%C3%A7%C3%B5es...%22,%22modules.update@determineIfGetUpdateIsNecessary_updated%22:%22%5Binstantgram%5D%20informa%C3%A7%C3%B5es%20locais%20atualizadas%22,%22modules.update@determineIfGetUpdateIsNecessary_@alert_found%22:%22%5Binstantgram%5D%20encontrou%20uma%20atualiza%C3%A7%C3%A3o.%5Cn%20acesse%20theus.github.io/instantgram%20para%20atualizar%22,%22index@alert_onlyWorks%22:%22%5Binstantgram%5D%20somente%20funciona%20no%20instagram.com%22,%22index#program#modal@alert_dontFound%22:%22%5Binstantgram%5D%20n%C3%A3o%20encontrou%20uma%20imagem%20em%20um%20post.%20Tente%20abrir%20o%20link%20em%20uma%20nova%20aba.%22,%22index#program#post@alert_dontFound%22:%22ops,%20%5Binstantgram%5D%20n%C3%A3o%20encontrou%20a%20imagem%20:(%22,%22index#program#screen@alert_dontFound%22:%22%5Binstantgram%5D%20a%20procura%20por%20imagem%20na%20tela%20encontrou%20mais%20de%201%20imagem.%20Voc%C3%AA%20est%C3%A1%20em%20um%20perfil?%20Se%20sim,%20abra%20alguma%20imagem%20antes%20de%20rodar%20o%20%5Binstantgram%5D%22,%22index#program@alert_dontFound%22:%22ops,%20voc%C3%AA%20est%C3%A1%20em%20algum%20post%20do%20instagram?%20ex:%20instagram.com/p/82jd828jd%22%7D%7D%7D,I=%7Bde:%22de-DE%22,pt:%22pt-BR%22,en:%22en-US%22,%22en-GB%22:%22en-US%22%7D%5Bnavigator.language%5D%7C%7C%22en-US%22;function%20w(e,t)%7Bvoid%200===t&&(t=I);try%7Breturn%20x.langs.hasOwnProperty(t)%7C%7C(t=%22en-US%22),x.langs%5Bt%5D%5Be%5D?x.langs%5Bt%5D%5Be%5D:%22%22%7Dcatch(n)%7Breturn%20console.error(%22%5Binstantgram%5D%20LOC%20error:%22,n),%22ops,%20an%20error%20ocurred%20in%20localization%20system.%20Enter%20in%20https://github.com/theus/instantgram/issues/new%20and%20open%20an%20issue%20with%20this%20code:%20'LOC_dont_found_str_neither_default:%5B%22+t+%22-%3E%22+e+%22%5D'%5Cn%20%20%20%20for%20more%20information%20open%20the%20console%22%7D%7Dconsole.info(w(%22helpers.localize_defaultlang%22).replace(%22$%7BLANG_DEFAULT%7D%22,I));var%20S=w;var%20A=%7BregexOriginalImage:/%5C/%5Ba-z%5D+%5Cd+%5Ba-z%5D?x%5Cd+%5Ba-z%5D?/,regexMaxResImage:/%5C/%5Ba-z%5D+%5B1080%5D+%5Ba-z%5D?x%5B1080%5D+%5Ba-z%5D?/,regexPath:/%5E%5C/(p%7Creel%7Ctv)%5C//,regexHostname:/instagram%5C.com/,regexStoriesURI:/stories%5C/(.*)+/,regexURL:/(%5B--:%5Cw?@%25&+~#=%5D*%5C.%5Ba-z%5D%7B2,4%7D%5C/%7B0,2%7D)((?:%5B?&%5D(?:%5Cw+)=(?:%5Cw+))+%7C%5B--:%5Cw?@%25&+~#=%5D+)?/%7D;var%20N=window.navigator.userAgent.indexOf(%22Edge%22)%3E-1%7C%7Cwindow.navigator.userAgent.indexOf(%22Edg%22)%3E-1,P=%7Bcover:'img%5Bstyle=%22object-fit:%20cover;%22%5D',srcset:%22img%5Bsrcset%5D%22,img:%22img%22%7D,U=window.location.pathname,z=%7BVERSION:%225.0.4%22,mediaImageElExpressions:P,mediaImageElExpression:N?P.cover:P.srcset,hostname:window.location.hostname,path:U,images:%5B%5D,imagesOnViewPort:%5B%5D,videos:document.querySelectorAll(%22video%22),foundByModule:null,isStory:A.regexStoriesURI.test(U),isPost:A.regexPath.test(U),probablyHasAGallery:%7Bcheck:null,byModule:%22%22%7D,setImageLink:function(e)%7Bthis.imageLinkBeforeParse=e,A.regexMaxResImage.test(e)?this.imageLink=e:this.imageLink=A.regexOriginalImage.test(e)?e.replace(A.regexOriginalImage,%22%22):e%7D,foundVideo:!1,foundImage:!1,imageLink:!1,imageLinkBeforeParse:!1,alertNotInInstagramPost:!1,context:%7BhasMsg:!1,msg:void%200%7D%7D;!function(e,t,n)%7Bfor(var%20a=0;a%3Ce.length;a++)t.call(n,a,e%5Ba%5D)%7D(document.images,function(e,t)%7Bvar%20n=t;!y(n)&&function(e)%7Breturn%20u(e).filter(function(e)%7Breturn%22ARTICLE%22===e.nodeName%7D).length%3E0%7D(n)&&(z.images.push(n),f(n)&&z.imagesOnViewPort.push(n))%7D),A.regexHostname.test(z.hostname)%7C%7Cwindow.alert(S(%22index@alert_onlyWorks%22)),A.regexHostname.test(z.hostname)&&!1===(new%20p).execute(z)&&!1===(new%20h).execute(z)&&!1===(new%20_).execute(z)&&!1===(new%20b).execute(z)&&(z.context.hasMsg=!1),z.context.hasMsg&&window.alert(S(z.context.msg)),!z.alertNotInInstagramPost%7C%7Cz.foundVideo%7C%7Cz.foundImage%7C%7Cwindow.alert(S(%22index#program@alert_dontFound%22))%7D%5D);})()
```

### Internal External Links

<a href="javascript:(function()%7Bjavascript%3A%20(function()%20%7B%20var%20i%2C%20x%3B%20for%20(i%20%3D%200%3B%20x%20%3D%20document.links%5Bi%5D%3B%20%2B%2Bi)%20x.style.color%20%3D%20%5B%22blue%22%2C%20%22red%22%2C%20%22orange%22%5D%5Bsim(x%2C%20location)%5D%3B%20%20function%20sim(a%2C%20b)%20%7B%20if%20(a.hostname%20!%3D%20b.hostname)%20return%200%3B%20if%20(fixPath(a.pathname)%20!%3D%20fixPath(b.pathname)%20%7C%7C%20a.search%20!%3D%20b.search)%20return%201%3B%20return%202%3B%20%7D%20%20function%20fixPath(p)%20%7B%20p%20%3D%20(p.charAt(0)%20%3D%3D%20%22%2F%22%20%3F%20%22%22%20%3A%20%22%2F%22)%20%2B%20p%3B%20%2F*many%20browsers*%2F%20p%20%3D%20p.split(%22%3F%22)%5B0%5D%3B%20%2F*opera*%2F%20return%20p%3B%20%7D%20%7D)()%7D)()%3B">Internal External Links</a>

```js
javascript: (function () {
  var i, x;
  for (i = 0; (x = document.links[i]); ++i)
    x.style.color = ["blue", "red", "orange"][sim(x, location)];
  function sim(a, b) {
    if (a.hostname != b.hostname) return 0;
    if (fixPath(a.pathname) != fixPath(b.pathname) || a.search != b.search)
      return 1;
    return 2;
  }
  function fixPath(p) {
    p = (p.charAt(0) == "/" ? "" : "/") + p;
    /*many browsers*/ p = p.split("?")[0];
    /*opera*/ return p;
  }
})();
```
