export type LessonStep =
    | { type: "explanation"; content: string }
    | { type: "example"; content: string }
    | { type: "quiz"; question: string; answer: string; hint?: string }
    | { type: "code"; question: string; codeValidation: string; hint?: string };

export type LessonModule = {
    title: string;
    steps: LessonStep[];
};

const lessonModules: LessonModule[] = [
    {
        title: "웹의 기본 개념",
        steps: [
            {
                type: "explanation",
                content: "웹(Web)이란 인터넷을 통해 정보를 주고받을 수 있는 공간입니다. 우리가 사용하는 대부분의 사이트(네이버, 구글, 유튜브 등)는 모두 웹사이트입니다.",
            },
            {
                type: "explanation",
                content: "웹사이트는 여러 개의 웹페이지로 이루어져 있습니다. 웹페이지는 HTML, CSS, JavaScript 등으로 만들어집니다.",
            },
            {
                type: "explanation",
                content: "웹의 기본 동작 원리는 '클라이언트-서버 구조'입니다. 사용자의 컴퓨터(클라이언트)가 서버에 요청을 보내고, 서버가 응답을 보내줍니다.",
            },
            {
                type: "example",
                content: `1. 사용자가 브라우저에서 www.example.com 입력\n2. 브라우저(클라이언트)가 서버에 요청\n3. 서버가 HTML/CSS/JS 파일을 응답\n4. 브라우저가 화면에 웹페이지를 보여줌`,
            },
            {
                type: "quiz",
                question: "웹에서 정보를 요청하는 쪽을 무엇이라고 하나요?",
                answer: "클라이언트",
                hint: "사용자의 컴퓨터, 브라우저를 의미합니다.",
            },
            {
                type: "quiz",
                question: "웹에서 정보를 제공하는 쪽을 무엇이라고 하나요?",
                answer: "서버",
                hint: "웹사이트의 데이터를 저장하고 응답하는 컴퓨터입니다.",
            },
            {
                type: "explanation",
                content: "프론트엔드(Front-End)는 사용자가 직접 보는 화면, 즉 웹사이트의 '겉모습'을 만드는 영역입니다. HTML, CSS, JavaScript가 대표적인 기술입니다.",
            },
            {
                type: "explanation",
                content: "백엔드(Back-End)는 서버, 데이터베이스 등 웹사이트의 '속'에서 동작하는 부분을 만드는 영역입니다. Node.js, Python, Java, DB 등이 사용됩니다.",
            },
            {
                type: "quiz",
                question: "웹사이트의 화면을 만드는 영역을 무엇이라고 하나요?",
                answer: "프론트엔드",
                hint: "Front-End(앞쪽)라고도 부릅니다.",
            },
            {
                type: "quiz",
                question: "웹사이트의 데이터 처리와 서버를 담당하는 영역을 무엇이라고 하나요?",
                answer: "백엔드",
                hint: "Back-End(뒤쪽)라고도 부릅니다.",
            },
            {
                type: "explanation",
                content: "웹 개발자는 프론트엔드, 백엔드, 또는 둘 다 할 수 있습니다. 둘 다 할 수 있으면 '풀스택 개발자'라고 부릅니다.",
            },
            {
                type: "quiz",
                question: "프론트엔드와 백엔드를 모두 다루는 개발자를 무엇이라고 하나요?",
                answer: "풀스택 개발자",
                hint: "Full Stack Developer(전체 스택 개발자)라고도 합니다.",
            },
            {
                type: "explanation",
                content: "웹 개발을 시작하려면 먼저 HTML, CSS, JavaScript가 무엇인지 이해해야 합니다.",
            },
            {
                type: "explanation",
                content: "HTML은 웹페이지의 구조(뼈대)를 만드는 언어입니다. CSS는 디자인(색상, 배치 등)을 담당하고, JavaScript는 동작(버튼 클릭, 애니메이션 등)을 담당합니다.",
            },
            {
                type: "quiz",
                question: "웹페이지의 구조를 만드는 언어는 무엇인가요?",
                answer: "HTML",
                hint: "H로 시작합니다.",
            },
            {
                type: "quiz",
                question: "웹페이지의 디자인(색상, 배치 등)을 담당하는 언어는?",
                answer: "CSS",
                hint: "C로 시작합니다.",
            },
            {
                type: "quiz",
                question: "웹페이지에 동작(버튼 클릭, 애니메이션 등)을 추가하는 언어는?",
                answer: "JavaScript",
                hint: "J로 시작합니다.",
            },
            {
                type: "explanation",
                content: "웹 개발을 시작하려면 먼저 HTML, CSS, JavaScript를 익히는 것이 좋습니다. 이제부터 하나씩 배워봅시다!",
            },
        ],
    },
    {
        title: "HTML 완전 기초",
        steps: [
            {
                type: "explanation",
                content: "HTML은 웹 페이지의 뼈대를 만드는 언어입니다. 우리가 인터넷에서 보는 모든 웹사이트는 HTML로 구조가 만들어집니다.",
            },
            {
                type: "explanation",
                content: "HTML에서 '태그(tag)'란, 웹 페이지의 각 부분을 감싸는 특별한 표시입니다. 태그는 <와 >로 감싸서 작성합니다. 예를 들어 <p>는 문단을 나타내는 태그입니다.",
            },
            {
                type: "example",
                content: `<p>안녕하세요!</p>`,
            },
            {
                type: "quiz",
                question: "HTML에서 태그는 어떤 기호로 감싸서 작성하나요?",
                answer: "<>",
                hint: "<와 >로 감쌉니다.",
            },
            {
                type: "explanation",
                content: "HTML 문서는 여러 개의 태그로 이루어져 있습니다. 대부분의 태그는 여는 태그(<태그이름>)와 닫는 태그(</태그이름>)로 구성됩니다.",
            },
            {
                type: "example",
                content: `<h1>제목입니다</h1>`,
            },
            {
                type: "quiz",
                question: "문단을 나타내는 태그는 무엇인가요?",
                answer: "p",
                hint: "<p>...</p> 형태입니다.",
            },
            {
                type: "explanation",
                content: "HTML 문서의 기본 구조는 반드시 <!DOCTYPE html>로 시작하며, <html>, <head>, <body> 태그로 이루어집니다.",
            },
            {
                type: "example",
                content: `<!DOCTYPE html>
<html>
  <head>
    <title>문서 제목</title>
  </head>
  <body>
    <h1>안녕하세요!</h1>
  </body>
</html>`,
            },
            {
                type: "quiz",
                question: "HTML 문서의 최상위 태그는 무엇인가요?",
                answer: "html",
                hint: "<html> 태그를 떠올려보세요.",
            },
            {
                type: "code",
                question: "HTML 문서의 기본 구조를 직접 작성해보세요.",
                codeValidation: "<!DOCTYPE html>",
                hint: "맨 위에 <!DOCTYPE html>이 들어가야 합니다.",
            },
            {
                type: "explanation",
                content: "<div>와 <span>은 HTML에서 자주 쓰이는 태그입니다. <div>는 블록 요소(한 줄 전체를 차지), <span>은 인라인 요소(글자처럼 한 줄 안에 들어감)입니다.",
            },
            {
                type: "example",
                content: `<div>블록 요소</div>
<span>인라인 요소</span>`,
            },
            {
                type: "quiz",
                question: "div와 span의 차이는?",
                answer: "div는 블록 요소, span은 인라인 요소",
                hint: "줄바꿈이 되는지 생각해보세요.",
            },
            {
                type: "explanation",
                content: "버튼을 만들 때는 <button> 태그를 사용합니다. 버튼을 클릭했을 때 동작을 추가하려면 onclick 속성을 사용합니다.",
            },
            {
                type: "example",
                content: `<button onclick="alert('Hello World!')">클릭</button>`,
            },
            {
                type: "code",
                question: "버튼을 만들어 클릭 시 'Hello World'를 alert 하세요.",
                codeValidation: "<button onclick=\"alert('Hello World!')\">",
                hint: "button 태그와 onclick 속성을 사용하세요.",
            },
        ],
    },
    {
        title: "HTML 태그와 속성",
        steps: [
            {
                type: "explanation",
                content: "HTML 태그에는 추가 정보를 담는 '속성'을 사용할 수 있습니다. 예를 들어 <a> 태그의 href 속성은 링크의 주소를 지정합니다.",
            },
            {
                type: "example",
                content: `<a href="https://www.google.com">구글로 이동</a>`,
            },
            {
                type: "quiz",
                question: "a 태그에서 링크 주소를 지정하는 속성 이름은 무엇인가요?",
                answer: "href",
                hint: "h로 시작합니다.",
            },
            {
                type: "explanation",
                content: "이미지를 웹페이지에 넣으려면 <img> 태그를 사용합니다. src 속성에 이미지 주소를, alt 속성에 대체 텍스트를 입력합니다.",
            },
            {
                type: "example",
                content: `<img src="https://dummyimage.com/300x300/000/fff&text=cat" alt="샘플 이미지">`,
            },
            {
                type: "quiz",
                question: "이미지 태그에서 이미지 주소를 지정하는 속성은?",
                answer: "src",
                hint: "s로 시작합니다.",
            },
            {
                type: "code",
                question: "이미지 태그를 사용해 아무 이미지나 화면에 표시해보세요.",
                codeValidation: "<img",
                hint: "<img src=... 형태로 작성하세요.",
            },
        ],
    },
    {
        title: "링크와 리스트",
        steps: [
            {
                type: "explanation",
                content: "여러 항목을 나열할 때는 리스트 태그를 사용합니다. <ul>은 순서 없는 리스트, <ol>은 순서 있는 리스트입니다. 각 항목은 <li> 태그로 감쌉니다.",
            },
            {
                type: "example",
                content: `<ul>
  <li>사과</li>
  <li>바나나</li>
</ul>`,
            },
            {
                type: "quiz",
                question: "순서 없는 리스트를 만드는 태그는 무엇인가요?",
                answer: "ul",
                hint: "u로 시작합니다.",
            },
            {
                type: "code",
                question: "순서 있는 리스트(ol)로 1, 2, 3을 화면에 표시해보세요.",
                codeValidation: "<ol",
                hint: "<ol>과 <li>를 함께 사용하세요.",
            },
        ],
    },
    {
        title: "테이블과 입력 폼",
        steps: [
            {
                type: "explanation",
                content: "표를 만들 때는 <table> 태그를 사용합니다. <tr>은 행(row), <td>는 셀(cell), <th>는 제목 셀입니다.",
            },
            {
                type: "example",
                content: `<table>
  <tr>
    <th>이름</th>
    <th>나이</th>
  </tr>
  <tr>
    <td>홍길동</td>
    <td>20</td>
  </tr>
</table>`,
            },
            {
                type: "quiz",
                question: "테이블에서 행을 만드는 태그는?",
                answer: "tr",
                hint: "t로 시작합니다.",
            },
            {
                type: "explanation",
                content: "사용자에게 정보를 입력받으려면 <input> 태그를 사용합니다. type 속성으로 입력 종류를 지정할 수 있습니다.",
            },
            {
                type: "example",
                content: `<input type="text" placeholder="이름을 입력하세요">`,
            },
            {
                type: "quiz",
                question: "input 태그에서 입력 종류를 지정하는 속성은?",
                answer: "type",
                hint: "t로 시작합니다.",
            },
            {
                type: "code",
                question: "이름을 입력받는 텍스트 input과 제출 버튼을 만들어보세요.",
                codeValidation: "<input",
                hint: '<input type="text">와 <button>을 함께 사용하세요.',
            },
        ],
    },
    {
        title: "시맨틱 태그와 구조화",
        steps: [
            {
                type: "explanation",
                content: "시맨틱 태그란, 의미를 가진 HTML 태그입니다. 예를 들어 <header>, <nav>, <main>, <footer> 등은 각각 페이지의 머리글, 내비게이션, 본문, 바닥글을 의미합니다.",
            },
            {
                type: "example",
                content: `<header>머리글</header>
<nav>메뉴</nav>
<main>본문</main>
<footer>바닥글</footer>`,
            },
            {
                type: "quiz",
                question: "페이지의 내비게이션 영역을 나타내는 시맨틱 태그는?",
                answer: "nav",
                hint: "navigation의 약자입니다.",
            },
            {
                type: "code",
                question: "header, nav, main, footer 태그를 모두 사용해 간단한 구조를 만들어보세요.",
                codeValidation: "<header",
                hint: "각 태그를 한 번씩 사용해보세요.",
            },
        ],
    },
    {
        title: "폼 심화와 label, textarea",
        steps: [
            {
                type: "explanation",
                content: "폼에서 label 태그는 input과 연결해 사용자의 접근성을 높여줍니다. for 속성에 input의 id를 지정하면 label을 클릭해도 input이 선택됩니다.",
            },
            {
                type: "example",
                content: `<label for="username">이름</label>
<input id="username" type="text">`,
            },
            {
                type: "quiz",
                question: "label 태그와 input을 연결하는 속성은?",
                answer: "for",
                hint: "f로 시작합니다.",
            },
            {
                type: "explanation",
                content: "여러 줄을 입력받으려면 <textarea> 태그를 사용합니다.",
            },
            {
                type: "example",
                content: `<textarea placeholder="내용을 입력하세요"></textarea>`,
            },
            {
                type: "code",
                question: "이름 입력 input과 내용 입력 textarea, 제출 버튼을 가진 폼을 만들어보세요.",
                codeValidation: "<textarea",
                hint: "<form>, <input>, <textarea>, <button>을 함께 사용하세요.",
            },
        ],
    },
    {
        title: "메타 태그와 문서 정보",
        steps: [
            {
                type: "explanation",
                content: '메타 태그(meta)는 문서의 정보를 담는 태그입니다. <meta charset="UTF-8">은 문자 인코딩을 지정합니다.',
            },
            {
                type: "example",
                content: `<head>
  <meta charset="UTF-8">
  <title>문서 제목</title>
</head>`,
            },
            {
                type: "quiz",
                question: "문서의 문자 인코딩을 지정하는 meta 태그 속성은?",
                answer: "charset",
                hint: "c로 시작합니다.",
            },
        ],
    },
    {
        title: "주석과 특수문자",
        steps: [
            {
                type: "explanation",
                content: "HTML에서 주석은 <!-- 와 --> 사이에 작성합니다. 주석은 화면에 표시되지 않습니다.",
            },
            {
                type: "example",
                content: `<!-- 여기는 주석입니다 -->`,
            },
            {
                type: "quiz",
                question: "HTML 주석은 어떤 기호로 시작하나요?",
                answer: "<!--",
                hint: "<!로 시작합니다.",
            },
            {
                type: "explanation",
                content: "HTML에서 <, >, & 같은 특수문자는 직접 쓸 수 없고, &lt;, &gt;, &amp; 등으로 작성해야 합니다.",
            },
            {
                type: "example",
                content: `&lt;div&gt;는 <div>로 표시됩니다.`,
            },
            {
                type: "quiz",
                question: "HTML에서 & 기호를 표시하려면 어떻게 작성해야 하나요?",
                answer: "&amp;",
                hint: "&로 시작합니다.",
            },
        ],
    },
    {
        title: "접근성과 alt, tabindex",
        steps: [
            {
                type: "explanation",
                content: "이미지 태그에는 alt 속성을 꼭 작성해야 합니다. alt는 이미지를 볼 수 없는 사용자에게 대체 설명을 제공합니다.",
            },
            {
                type: "example",
                content: `<img src="logo.png" alt="로고 이미지">`,
            },
            {
                type: "quiz",
                question: "이미지에 대체 텍스트를 제공하는 속성은?",
                answer: "alt",
                hint: "a로 시작합니다.",
            },
            {
                type: "explanation",
                content: "tabindex 속성을 사용하면 키보드로 요소에 포커스를 줄 수 있습니다. 접근성을 높일 때 사용합니다.",
            },
            {
                type: "example",
                content: `<button tabindex="0">버튼</button>`,
            },
            {
                type: "quiz",
                question: "키보드 포커스를 제어하는 속성은?",
                answer: "tabindex",
                hint: "tab으로 시작합니다.",
            },
        ],
    },
    {
        title: "CSS 기초",
        steps: [
            {
                type: "explanation",
                content: "CSS는 웹페이지의 디자인(색상, 크기, 배치 등)을 담당하는 언어입니다. CSS는 '선택자'와 '속성'으로 구성됩니다.",
            },
            {
                type: "example",
                content: `p { color: red; } /* 모든 p 태그의 글자색을 빨간색으로 */`,
            },
            {
                type: "quiz",
                question: "CSS에서 글자색을 지정하는 속성 이름은?",
                answer: "color",
                hint: "c로 시작합니다.",
            },
            {
                type: "explanation",
                content: "CSS는 style 태그 안에 직접 작성하거나, style 속성으로 태그에 바로 적용할 수 있습니다.",
            },
            {
                type: "example",
                content: `<p style="color: blue;">파란 글자</p>`,
            },
            {
                type: "quiz",
                question: "HTML 태그에 직접 스타일을 적용하는 속성은?",
                answer: "style",
                hint: "s로 시작합니다.",
            },
            {
                type: "explanation",
                content: "CSS 선택자는 스타일을 적용할 대상을 지정합니다. 태그명, .클래스명, #아이디명 등 다양한 선택자가 있습니다.",
            },
            {
                type: "example",
                content: `.title { font-size: 24px; } /* class="title"인 요소에 적용 */\n#main { background: yellow; } /* id="main"인 요소에 적용 */`,
            },
            {
                type: "quiz",
                question: "클래스 선택자를 CSS에서 어떻게 작성하나요?",
                answer: ".클래스명",
                hint: "점(.)으로 시작합니다.",
            },
            {
                type: "quiz",
                question: "id 선택자를 CSS에서 어떻게 작성하나요?",
                answer: "#아이디명",
                hint: "#으로 시작합니다.",
            },
            {
                type: "explanation",
                content: "CSS에서 여러 속성을 한 번에 적용하려면 중괄호({}) 안에 속성:값; 형태로 나열합니다.",
            },
            {
                type: "example",
                content: `h1 {\n  color: green;\n  text-align: center;\n}`,
            },
            {
                type: "code",
                question: "h1 태그의 글자색을 파란색, 가운데 정렬로 만들어보세요.",
                codeValidation: "h1",
                hint: "color와 text-align을 사용하세요.",
            },
            {
                type: "explanation",
                content: "CSS 박스모델은 모든 요소가 content, padding, border, margin으로 구성된다는 개념입니다.",
            },
            {
                type: "example",
                content: `div {\n  padding: 10px;\n  border: 1px solid black;\n  margin: 20px;\n}`,
            },
            {
                type: "quiz",
                question: "박스모델에서 내용과 테두리 사이의 공간을 무엇이라고 하나요?",
                answer: "padding",
                hint: "p로 시작합니다.",
            },
            {
                type: "quiz",
                question: "박스 바깥쪽 여백을 지정하는 속성은?",
                answer: "margin",
                hint: "m으로 시작합니다.",
            },
            {
                type: "explanation",
                content: "display 속성은 요소의 배치 방식을 정합니다. block, inline, inline-block, flex, grid 등이 있습니다.",
            },
            {
                type: "example",
                content: `div { display: flex; }`,
            },
            {
                type: "quiz",
                question: "가로로 배치할 때 자주 쓰는 display 속성 값은?",
                answer: "flex",
                hint: "f로 시작합니다.",
            },
            {
                type: "explanation",
                content: "반응형 웹을 만들려면 미디어쿼리(@media)를 사용합니다. 화면 크기에 따라 스타일을 다르게 적용할 수 있습니다.",
            },
            {
                type: "example",
                content: `@media (max-width: 600px) {\n  body { font-size: 14px; }\n}`,
            },
            {
                type: "quiz",
                question: "화면 크기에 따라 스타일을 다르게 적용하는 CSS 기능은?",
                answer: "미디어쿼리",
                hint: "media로 시작합니다.",
            },
            {
                type: "code",
                question: "모든 p 태그의 글자색을 빨간색으로, 배경색을 노란색으로 만들어보세요.",
                codeValidation: "p",
                hint: "color와 background를 사용하세요.",
            },
        ],
    },
    {
        title: "CSS 심화 - 레이아웃과 실전",
        steps: [
            {
                type: "explanation",
                content: "flexbox는 요소를 가로/세로로 정렬할 때 매우 유용합니다. display: flex;를 부모에 주고, justify-content, align-items 등으로 정렬합니다.",
            },
            {
                type: "example",
                content: `.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}`,
            },
            {
                type: "quiz",
                question: "flexbox에서 주축 방향 정렬 속성은?",
                answer: "justify-content",
                hint: "j로 시작합니다.",
            },
            {
                type: "quiz",
                question: "flexbox에서 교차축(세로) 정렬 속성은?",
                answer: "align-items",
                hint: "a로 시작합니다.",
            },
            {
                type: "explanation",
                content: "grid는 2차원 레이아웃을 만들 때 사용합니다. display: grid;와 grid-template-columns, grid-template-rows 등을 사용합니다.",
            },
            {
                type: "example",
                content: `.grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}`,
            },
            {
                type: "quiz",
                question: "grid에서 열의 개수와 비율을 지정하는 속성은?",
                answer: "grid-template-columns",
                hint: "g로 시작합니다.",
            },
            {
                type: "code",
                question: "div 2개를 가로로 나란히 배치하는 flex 레이아웃을 만들어보세요.",
                codeValidation: "display: flex",
                hint: "display: flex;를 사용하세요.",
            },
            {
                type: "explanation",
                content: "CSS에서 애니메이션을 만들려면 transition, animation 속성을 사용합니다.",
            },
            {
                type: "example",
                content: `button {\n  transition: background 0.3s;\n}\nbutton:hover {\n  background: orange;\n}`,
            },
            {
                type: "quiz",
                question: "마우스를 올렸을 때 스타일을 바꾸는 CSS 선택자는?",
                answer: ":hover",
                hint: "콜론(:)으로 시작합니다.",
            },
            {
                type: "code",
                question: "버튼에 마우스를 올리면 배경색이 바뀌는 스타일을 만들어보세요.",
                codeValidation: ":hover",
                hint: ":hover 선택자를 사용하세요.",
            },
        ],
    },
    {
        title: "JavaScript 기초",
        steps: [
            {
                type: "explanation",
                content: "JavaScript는 웹페이지에 동적인 기능(버튼 클릭, 데이터 처리 등)을 추가하는 프로그래밍 언어입니다.",
            },
            {
                type: "explanation",
                content: "JavaScript 코드는 <script> 태그 안에 작성하거나, 외부 .js 파일을 <script src=...>로 불러올 수 있습니다.",
            },
            {
                type: "example",
                content: `<script>\n  alert('안녕하세요!');\n</script>`,
            },
            {
                type: "quiz",
                question: "JavaScript 코드를 HTML에 직접 작성할 때 사용하는 태그는?",
                answer: "script",
                hint: "s로 시작합니다.",
            },
            {
                type: "explanation",
                content: "변수는 데이터를 저장하는 공간입니다. var, let, const로 선언할 수 있습니다.",
            },
            {
                type: "example",
                content: `let name = "홍길동";\nconst age = 20;`,
            },
            {
                type: "quiz",
                question: "변수를 선언하는 3가지 키워드는?",
                answer: "var, let, const",
                hint: "v, l, c로 시작합니다.",
            },
            {
                type: "explanation",
                content: "함수는 코드를 묶어서 재사용할 수 있게 해줍니다. function 키워드로 선언합니다.",
            },
            {
                type: "example",
                content: `function sayHello() {\n  alert("안녕하세요!");\n}`,
            },
            {
                type: "quiz",
                question: "함수를 선언할 때 사용하는 키워드는?",
                answer: "function",
                hint: "f로 시작합니다.",
            },
            {
                type: "explanation",
                content: "이벤트란 사용자의 동작(클릭, 입력 등)에 반응하는 기능입니다. onclick 속성이나 addEventListener로 이벤트를 처리할 수 있습니다.",
            },
            {
                type: "example",
                content: `<button onclick="alert('클릭!')">버튼</button>`,
            },
            {
                type: "code",
                question: "버튼을 만들고, 클릭하면 'Hello JS!'를 alert로 띄워보세요.",
                codeValidation: "alert('Hello JS!')",
                hint: "onclick 속성이나 script에서 addEventListener를 사용하세요.",
            },
            {
                type: "explanation",
                content: "문서에서 요소를 선택하려면 document.querySelector('선택자')를 사용합니다.",
            },
            {
                type: "example",
                content: `<button id="btn">클릭</button>\n<script>\n  document.querySelector('#btn').onclick = function() {\n    alert('버튼 클릭!');\n  }\n</script>`,
            },
            {
                type: "quiz",
                question: "id가 'btn'인 요소를 선택하는 JavaScript 코드는?",
                answer: "document.querySelector('#btn')",
                hint: "querySelector와 #을 사용하세요.",
            },
            {
                type: "explanation",
                content: "값을 화면에 출력하려면 alert, console.log, innerText 등을 사용할 수 있습니다.",
            },
            {
                type: "example",
                content: `console.log("콘솔에 출력");\ndocument.body.innerText = "화면에 출력";`,
            },
            {
                type: "quiz",
                question: "브라우저 콘솔에 값을 출력하는 함수는?",
                answer: "console.log",
                hint: "c로 시작합니다.",
            },
            {
                type: "code",
                question: "버튼을 클릭하면 <p>태그의 글자가 '변경됨'으로 바뀌게 해보세요.",
                codeValidation: "innerText",
                hint: "querySelector와 innerText를 사용하세요.",
            },
        ],
    },
    {
        title: "JavaScript 심화",
        steps: [
            {
                type: "explanation",
                content: "조건문(if)은 특정 조건에 따라 코드를 실행할 때 사용합니다.",
            },
            {
                type: "example",
                content: `if (age >= 20) {\n  alert("성인입니다.");\n} else {\n  alert("미성년자입니다.");\n}`,
            },
            {
                type: "quiz",
                question: "조건문을 시작할 때 사용하는 키워드는?",
                answer: "if",
                hint: "i로 시작합니다.",
            },
            {
                type: "explanation",
                content: "반복문(for)은 코드를 여러 번 반복할 때 사용합니다.",
            },
            {
                type: "example",
                content: `for (let i = 0; i < 3; i++) {\n  console.log(i);\n}`,
            },
            {
                type: "quiz",
                question: "반복문을 시작할 때 사용하는 키워드는?",
                answer: "for",
                hint: "f로 시작합니다.",
            },
            {
                type: "explanation",
                content: "배열(Array)은 여러 값을 하나의 변수에 저장할 수 있는 자료구조입니다.",
            },
            {
                type: "example",
                content: `let fruits = ["사과", "바나나", "포도"];`,
            },
            {
                type: "quiz",
                question: "배열의 첫 번째 값을 가져오는 코드는?",
                answer: "fruits[0]",
                hint: "[0]을 사용하세요.",
            },
            {
                type: "explanation",
                content: "객체(Object)는 여러 속성을 가진 데이터를 표현할 때 사용합니다.",
            },
            {
                type: "example",
                content: `let user = { name: "홍길동", age: 20 };`,
            },
            {
                type: "quiz",
                question: "user 객체의 name 속성 값을 가져오는 코드는?",
                answer: "user.name",
                hint: ".name을 사용하세요.",
            },
            {
                type: "code",
                question: "for문을 사용해 1부터 5까지 콘솔에 출력해보세요.",
                codeValidation: "for",
                hint: "for (let i = 1; i <= 5; i++) 형태를 사용하세요.",
            },
            {
                type: "explanation",
                content: "자바스크립트에서 함수는 값처럼 변수에 저장하거나, 다른 함수에 전달할 수 있습니다. 이를 '함수 표현식' 또는 '콜백 함수'라고 부릅니다.",
            },
            {
                type: "example",
                content: `const greet = function(name) {\n  alert("안녕, " + name);\n};\ngreet("철수");`,
            },
            {
                type: "quiz",
                question: "함수를 변수에 저장하는 방법을 무엇이라고 하나요?",
                answer: "함수 표현식",
                hint: "함수 선언식과 구분하세요.",
            },
            {
                type: "explanation",
                content: "자바스크립트는 웹페이지를 동적으로 바꿀 수 있는 강력한 언어입니다. 다양한 실습을 통해 익혀보세요!",
            },
        ],
    },
];

export default lessonModules;
