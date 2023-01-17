# Node
1. 노드는 크롬V8 자바스크립트 엔진으로 빌드된 자바스크립트 **런타임**
2. 노드는 서버가 아닙니다. 자바스크립트로 작성된 서버를 실행 할 수 있는 런타입 도구
3. 자바스크립트 : 언어 | 노드 : 런타임 | v8 : 엔진 , libuv : 노드의 이벤트 기반 , 논블로킹 io모델 구현 라이브러
4. 논 블로킹 I/O
   1. 오래 걸리는 함수를 백그라운드로 보내 다음 코드가 먼저 실행되고 나중에 오래 걸리는 함수를 실행
      * 논 블로킹 방식 하에 일부 코드는 백그라운드에서 병렬로 실행됨
      * 일부 코드 I/O작업 (파일 시스템 , 네트워크) 압축 , 암호회
      * 나머지 코드는 블로킹 방식
      * I/O 작업이 많을때 노드 활용성이 극대화됨
5. 프로세스 VS thread
   1. 프로세스 : 운영체제 할당하는 작업의 단위 , 프로세스간 자원 공유 x (카카오 , 네이버 , 롤)
   2. 스레드 : 프로세스 내에서 실행되는 작업의 단위 , 부모 프로세스의 자원 공유
   3. 노드 프로세스는 **멀티 쓰레드이지만** 직접 다룰 수 있는 스레드는 하나이기에 싱글 스레드라 표현
   4. 노드는 주로 멀티 스레드 대신 멀티 프로세스 활용
   5. 노드는 14버전부터 멀티 스레드 사용 가능

* 호출스택과 이벤트루프
  * 호출 스택 함수가 호출된 순서대로 쌓임
  * 이벤트루프 setTimeOut Promise등 비동기적 함수들이 멀티 쓰레드로 동작함 Promise에 우선순위가 다른 이벤트보다 높아서<br> 백그라운드에서 제일 먼저 실행됨
  백그라운드는 호출 스택이 실행되고 백그라운드가 실행됨
  * 순서 호출스택 -> 백그라운드 -> 호출 스택 실행 -> 백그라운드내 이벤트 태스크 큐 이동(순서 x Promise then catch등 제외) -> 태스큐 실행
  
### const , let , var
* 셋에 큰 차이는 스코프 차이입니다. var 블록 스코프에 대해 접근이 가능합니다.
  * 단 function 은 못빠져 나갑니다.
* const , let은 블록 스코프를 못 빠져 나갑니다.
  * const는 한번 대입시 다른걸로 변경 불가능합니다.
  * 단 객체로는 변경이 가능합니다.
    ~~~
    function scope() { if(true) {var y = 1} console.log(y)  } // 가능
    function scope() { if(true) {var y = 1}  }  console.log(y) // 불가능
    function scope() { if(true) {let y = 1} console.log(y)  } // 불가능
    ~~~
* 화살표 함수 와 function
  * 기존 function은 부모의 this를 받지않기에 부모를 받으려면 변수로 this를 설정을 해야됫다.
  * 화살표함수안에 this는 부모에 this를 잡는다.
* ?? || 연산자 ?.
  1. || 연산자는 falsy값이면 뒤에 값을 사용함 falsy(0 , '' , false , NaN , null , undefined)
  2. ??연산자 null 또는 undefined일때만 뒤에 값을 사용함
     ~~~
     const a = 0;
     const b = a || 3; 
     console.log(b) -> 3
     
     const a = null;
     const b = a ?? 3; 
     console.log(b) -> 3
     ~~~
  3. ?. 연산자 key값이 없을 경우 그대로 진행
     ~~~
     c.f() -> cannot read property of null 'f'
     c?.f() -> 문제 없음 없으면 없는 대로 진행함 없을 경우 undefined로 진행됩니다.
     ~~~

* Node에 전역 스코프에 this는 module.exports 객체를 가리킨다.
* require사용
  * Js파일을 실행만 할땐 require('./var.js') 파일이 실행만 된다
  * require가 제일 위에 올 필요는 없다.
  * require.cache에 한번 require한 모듈에 대한 캐시 정보가 있따.
  * require.main은 노드 실행 시 첫 모둘을 가리킴
  * require하는 파일들이 서로가 서로를 참조하며 순환 참조가 일어나게 된다면 노드가 순환 참조를 빈 객체로 만들어 순환 참조를 막아줍니다.

* CommonJs 모듈과 ECMAScript(ES) 모듈
  * import export module.exports...
  * es모듈은 확장자명이 js 대신 mjs로 변경 되었지만 package.json에 type:module 속성을 넣으면 js확장자로 인식을합니다.<br>
  * ECMAScriptJs에서는 top level await 가능하다 -> 최상위 함수로 await test()시 async를 안감싸도 노드에서 then으로 바꿔서 실행 시켜줍니다.
  * __filename , 성)__dirname ECMAScriptJs에서는 불가능합니다. filename 대신 import.meta.url 이용 해야 합니다.
  * ECMAScript 다이나믹 임포트 불가능합니다. ex) if(a) {import './func.mjs';} 항상 import는 최상 위에 두어야합니다.
  * ECMAScript 다이나믹 임포트를 사용하기 위해서는 await import('./func.mjs') 이 방식으로 사용해야합니다. import는 Promise이기에 await를 항상 사용해주셔야 합니다.

### 노드 내장 객체
1. global
    * node의 전역 객체
        * 브라우저의 window 같은 역활
        * 모든 파일에서 접근 가능
        * window 처럼 생략 가능 (console , require 도 global의 속성
    * global안에 값을 넣어 속성을 공유 할 수 있지만 권장 하지않음 차라리 module파일로 만들어 사용하는게 더 좋습니다.
   ...

### process
* 현재 노드 프로세스 정보를 담고 있습니다. 해당 서버에 정보
* process.env
  * 프로세스에 환경 변수들이 들어있는 객체
    * 비밀키를 보관하는 용도로 사용함
    * 환경 변수는 process.env로 접근 가능
    * 노드 실행 환경시 영향을 미치는 환경 변수도 있음 스레드풀 , 노드 실행옵션(메모리 환경)등
* process.nextTick 콜백 함수를 우선적으로 처리함

### os
* 운영체제에 정보를 담고 있음
  * require('os') 내장 모듈이라 경로 대신 이름만 적어도 됨
### path
* 경로를 알기 위해 사용 노드 내장 모듈 path모듈을 사용하면 운영체제별 경로 처리를 진행해줌 (맥 , 윈도우)
* path.join(__dirname, '..' , '/var.js'))
* path.resolve(__dirname, '..' , '/var.js'))

### url
* 노드 내장객체
* protocol//username:password@hostname:port/pathname/search/hash
~~~
const url = require('url');
const { URL } = url;
const myURL = new URL('http://~~~);
myurl -> 객체 입니다.
url.format(myurl) -> 원래 URL 스트링 형태로 나옵니다.
~~~
* url.searchParams 객체를 이용해 파람에 따른 키 밸류 값을 받을 수 있습니다.

### dns
* DNS 객체를 이용해 도메인을 통해 IP 나 기타 DNS 주소를 찾을떄 사용합니다.
* await dns.lookup 아이피주소를 찾습니다. ... 등 여러 메서드들이 있습니다.

### crypto (단방향) hash
* createHash(알고리즘) : 사용할 해시 알고리즘을 넣어줍니다.
  * sha256
* update(문자열) : 변환할 문자열을 넣어줍니다.
* digest(인코딩) : 인코딩할 알고리즘을 넣습니다.
  * base64 , hex
  ~~~
  const crypto = require('crypto');
  
  crypto.createHash('sha512').update('비밀번호').digest('bas64');
  ~~~
* pbkdf2 암호화 등 여러개가 있습니다.,

### 양방향 암호화
* 대칭형 암호화 (암호화 복호화 가능)
  * key가 사용됨
  * 암호화할 떄와 복호화 할 때 같은 key를 사용해야 합니다.
  * KEY가 노출되면 안됩니다. 프론트에서 사용하면 안됩니다.

### util
* 각종 편의 기능을 모아둔 모듈
* deprecated 와 promisify가 자주 쓰임
* deprecate(함수) -> 사용하면 안될 함수에 대해 경고를 띄어줍니다. 라이브러리 만들때 자주 사용합니다.
* util.promisify를 콜백을 감싸면 promise로 감쌉니다 . 단 콜백이(err ,data) 형식으로 되어야지만 promise로 반환이 됩니다.

### worker_threads
* 노드에서 멀티 쓰레드 방식으로 작업할 수 있음
* 자주 사용하지 않습니다.

### fs
* 파일 시스템에 접근하는 모듈
* 파일 폴더 생성 ,  읽기 , 쓰기
  * fs.unlink() , fs.mkdir() , fs.copyFile() , fs.existsSync() 등등
  * fs.watch() <- 해당 파일이 감시
* 웹 브라우저는 불가능 하지만 노드는 가능합니다.
* fs는 콜백 함수입니다. 비동기적으로 실행이 됩니다. 하지만 **fs 뒤에 promises를 사용하면 promise** 함수로 사용 가능합니다.
~~~
require('fs');
// require('fs').promises;  <- promise 사용 then catch 사용 가능
fs.readFile('../README.md', (err, data) => {
 readFile(파일 위치 , 함수)
~~~
* fs 동기 메서드 fs.readFile**Sync** 싱크를 붙이면 동기적으로 실행이 됩니다.
* 서버를 처음 띄우거나 할 때 주로 사용하고 비동기적 함수를 사용하며 동기적으로 사용되게 작성합니다.
  * **백그라운드로 넘겨서 쓰레드가 다른 작업도 진행 할 수 있게 변경하여 사용되게 합니다.**

### 버퍼와 스트림
* 버퍼 : 일정한 크기로 모아두는 데이터
  * 일정한 **크기가 되면 한번에 처리**
  * 버퍼링: 버퍼에 데이터가 찰 때까지 모으는 작업
  * 16 진법으로 표기되서 통신을 합니다.
* 스트림 : 데이터의 흐름
  * 일정한 크기로 **나눠서 여러 번에 걸쳐서 처리**
  * 버퍼(또는 청크)의 크기를 작게 만들어서 주기적으로 데이터를 전달
  * 스트리밍: 일정한 크기의 데이터를 지속적을 전달하는 작업
  * **대부분 스트림이 효율적입니다.**
    * 버퍼 사용시 만약 1기가 데이터를 옮기게 된다면 메모리에 1기가 다 차고 옮겨져야합니다 사용자가 여러명이면 서버가 당연히 터집니다.
    * 스트림 방식을 사용한다면 데이터를 작게 짤라서 옮기기 때문에 서버에 무리가 적습니다.
  * 스트림이 버퍼보다 메모리를 아낄수 있습니다.
~~~
버퍼 방식
const buffer = Buffer.from('저를 버퍼로 바꿔주세요');
Buffer.alloc(5) <- 5byte 빈 버퍼를 만든 작업

스트림 방식
// 스트림으로 쪼개진 데이터를 배열에 담은 후 배열을 버퍼안에 부어서 묶음
const fs = require('fs');
const readStream = fs.createReadStream('../README.md');

const data = [];

readStream.on('data' , (chunk) => {
    data.push(chunk);
    console.log('data : ', chunk, chunk.length);
});

readStream.on('end' , () => {
    console.log('end : ' ,Buffer.concat(data).toString())
})
~~~

### pipe
* 스트림에 좋은점 원하는 데이터 단위로 받아 해당 데이터를 받으면서 조작을 할 수 있습니다.
* 1mb write -> 1mb read 반복
~~~
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const readStream = fs.createReadStream('../README.md' , {highWaterMark : 16});// 16kb 씩 나눠서 읽습니다.
const writeStream = fs.createWriteStream('./writeItem.txt');

readStream.pipe(writeStream); // read 와 write를 pipe로 연결 16byte씩 읽으면서 16byte씩 작성 합니다.
readStream.pipe(gzip).pipe(writeStream); // 읽은 파일을 압축하여 작성합니다.
// 파이프끼리 여러개 체이닝 할 수 있습니다.
~~~

### 스레드풀
* fs , crypto , zlib 모듈의 메서드를 실행할 때는 백그라운드에서 동시에 실행됨
  * 스레드풀이 동시에 처리해줌 노드는 기본적으로 8개가 동시에 실행됩니다.
  * 서버에 비해 스레드가 적게 실행이 되고있다면 UV_THREADPOOL_SIZE = ? 등으로 변경을 할 수 있습니다.

### 커스텀 이벤트
* require('events) events 라이브러리를 이용해 만듭니다. .emit으로 이벤트를 호출 합니다.

### 예외 처리하기
* node는 싱글 스레드이기에 에러가 나서 스레드가 멈춘다면 프로세스가 멈추게 되는것 **에러처리 필수**
* 기본적으로 try catch 로 감싸서 에러가 발생한 곳 catch로 감싸서 에러가 아닌것처럼 묶습니다.
* global한 promise 함수는 에러가 나진 않습니다. 그래도 묶어줘야함
* 최후의 수단으론 process.on('uncaughtException', (err) -> 모든 에러가 한곳으로 모입니다.
  * 에러 내용 기록용으로만 사용하는게 좋습니다.
  * 복구는 공식문서에서 동작이 안될수 있다고 있습니다. 

    
### npm
* node package manager 라이브러리 빌드 매니저 입니다.
* package.json을 통해 버전 및 라이브러리 스크립를 동작 및 관리 할 수 있습니다.
* npm i -D  , npm install --save-dev 패키지명 -D는 개발 모드에서 실행 할 라이브러리를 말합니다.
* npm i  : i는 인터넷을 통해 다운 받는것을 의미합니다. 인터넷망이 막혀있는 경우 라이브러리를 가져가서 설치해야합니다.
* npm -g 는 글로벌 명령어로 cli등에서 node run 등 보통 바로 실행 가능한 명령어등을 전역을 설치 할 때 사용합니다.
  * 하지만 package.json에 관리가 안되어서 다운 여부를 알 수 없어 최근에는 npx라는 명령어를 통해 지정해서 사용합니다.
* package-lock.json : 다운로드한 라이브러리에 라이브러리에 버전을 고정해서 버전이 달라서 잘못되는 경우를 대비해서 만들어지는 파일입니다.
* package.json에 버전 정보가 . . . 3자리로 고정되어있는데 위 방식은 SemVer 버저닝이라고 합니다. major , minor , patch등
### npm 명령어
* npm outdated : 패키지에 기능 변화를 알 수 있음
* npm uninstall : 패키지 삭제
* npm search : npm 패키지 검색
* npm info 패키지 : 패키지 세부 정보 파악
* npm adduser : npm 로그인을 위한 명령어 NPMJS.COM에서 회원가입 가능
* npm whoami : 현재 사용자 정보
* npm logout , npm versuin ..\
* npm deprecated 패키지명 버전 메시지 : 패키지 설치시 경고 메시지를 띄우게함
* npm publish : 자신이 만든 패키지를 배포함
* npm unpublish : 자신이 만든 패키지 배포 중단 (24 시간 내에만 가능)
 

### express
* nodemon 파일 변경시 알아서 재시작 해줍니다.  - 라이브러리
* npm ls 라이브러리 현재 package에서 사용하고 있는지 확인 할 수 있다.
* middleware사용 공통으로 사용하는 경우 미들웨어를 사용한다.
* express는 위에 아래로 실행이됩니다.
* res.status(상태코드).sned 등으로 상태코드를 다르게 줄 수 있습니다.
* express 서버 구조는 보통 맨 위에 앱을 만들고 앱에 관련 설정을 set하여 작성 -> 미들웨어를 적고  -> get , post url 매핑 후 파라미터를 받는것들을 뒤에 작성합니다. (범위가 넓으면 뒤로 갑니다.)
* sned() , sendFile() 등 한 라우터에서는 한가지에 행동만 해야 합니다. 응답 보낸후 writeHead() 등 사용하면 응답이 지난 후 헤드를 입력해서 에러가 발생합니다.
* send() 같은 메서드를 입력해도 리턴은 아닙니다.
* next(error) 안에 에러가 들어있다면 에러 처리 미들웨어로 넘어 갑니다.
* 미들웨어 인자에 ('route')를 작성하면 이후 미들웨어를 넘어가고 다음 라우트로 넘어갑니다. next() 분기처리로 다음 라우터로 넘길떄 사용을 많이 합니다.
* **에러 처리 미들웨어는 뒤에 작성하며 반드시 매개변수로 4개를 받아야합니다. (err ,req ,res , next)**
  * 사용법
  * 미들웨어는 app.use 안에 있는 로직을 말합니다. app.use 는 express안에 장착하는 의미입니다.
  ~~~
  app.use((req,res,next) => {로직 next() }) //next() 메서드를 실행해야 다음 라우터를 찾아갑니다.
  
  // 미들웨어는 여러 로직을 , 연결해서 작성 할 수 있다.
  app.use('/' , (req , res , next) => {
    console.log('시작후 넘어감');
    next();
  }, (req , res , next) => {

  })
  ~~~
* express 매개변수 /:--- 라우터에 파라미터입니다.
  * 사용은 req.params.hello | req.params.파라미터이름 으로 사용합니다.
    ~~~
    app.get('/:hello' , (res ,res) => {
    
      })
    ~~~
* app.get('*' , (res ,res) => { 모든 get요청에 대해 처리한다는 명령어입니다.
 
* doqdl