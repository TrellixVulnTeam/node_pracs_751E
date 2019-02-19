    1.p19.ts
        A.localhost:8000/?file=sample
        -서버 접속확인 콘솔, 및 쿼리정보 지역변수 저장(query => filename).
        -1~100까지 찍어주는 동기함수(writeNums(response))실행{
            res.write(counter)으로 동기적으로 종료
        }
        -이후 setTImeout callback, 2000ms 구문시작{
            -filename을 열겠다는 콘솔
            -fs.readFile의 콜백(err, data){
                -err? res.write(err);
                -else? res.write(data);
                -res.end();
            }
        }
        -요약
            -동기함수 이후 콜백의 중첩 발생setCall, fsCall이라 명명
                -setCall을 2초 후 실행 한다는 콜을 스텍에 쌓고 same level로 폴스루A
                -폴스루A 종료
                -2초후 setCall실행, fs.readFile만나고 폴스루B
                -readFile진행 중 폴스루B 종료
                -readFile성립 => fsCall(err,data) 실행
                -fsCall내부에 최종 res.end();
                -통신종료.
        -트러블
            -클라리언트의 요청 localhost:8000/?file=sample로 진행, 정상 동작
            -opening sample.txt콘솔 이후 opening undefined.txt도 출력
            -첫번째 요청이 /?file=sample에대한 요청이 콘솔에 기록
            -client의 요구에 대한 서버의 응답이 끝남
            -이후 추가적으로 백그라운드에서 브라우저의 명령으로 /favicon.ico에 대한 get 실행확인(페이지 유지)
                -favicon.ico에 대한 요청이 거절 되더라도, 브라우저의 임의적인 백그라운드 작업이라 해당 오류에서 큰 문제가 안 생기도록 브라우저에서 처리가 되어있으나, 주류 브라우저 공통으로 진행되는 작업
                -브라우저에 따라서 조금씩 차이가 있을 수 있다는 점을 체크 
            -favicon.ico에 대한 요청은 res와는 무관하게(문서와) 진행된다.

    2.p38_TCPsocket_${arg}
        A.${arg} === server
            1.net module imports...
            2.class TCPServer
                -public this.app: net.Server(TCP서버 앱)
                -public this.clientSockets:net.Sockets[] =[]
                -private socketConfig(clientSocket:net.Socket){
                    1.접속한 클라이언트에 대해서 this.clientSockets에 주소값 저장하여 관리.
                    2.새로이 메서드 실행시 접속중인 클라이언트 숫자를 clientSockets.length를 통해서 가져와 서버측 로그에 찍어줌
                    3.해당 클라이언트 소켓에 고유이벤트"data"에 대한 event-listener지정:
                        -클라이언트소켓이 "data"이벤트가 발생하면 해당 클라이언트를 제외한 클라이언트[]를 순회하여 otherClientSockets.write()로 data를 찍어줌.
                        -만약 스스로 quit라는 단어를 적었다면, 해당clientSocket.end()로 소멸.
                    4.해당 클라이언트 소켓에 고유이벤트"close"에 대한 listeningEvent연결:
                        -서버앱.clientSockets[]의 해당소켓 index 조회하여 clientSockets.splice(index, 1)로 pop시킴.
                }
                -private serverConfigs(){
                    this.app에 대한 이벤트리스너 연결
                        -고유이벤트
                            1."connetion" -> (socket)=>this.socketConfigs(socket)
                            -클라이언트 소켓 접속시 콜백에 해당 소켓 받고 socketConfigs로 클라이언트 소켓에 대한 이벤트작업.
                            2."error" -> (err) => console.log(err.message)
                            3.close ->()=>서버종료 콘솔로깅.
                }
            3.const singleServer = TCPServer.bootstrap();
            4.singleServer.app.listen(포트,()=>콘솔로깅) 
        B.${arg} === client
            1.imports net...
            2.process.stdin.resume();
                -인풋활성화(콘솔을 통해 input을 받음)
            3.const client = net.connect({
                host:"localhost",port:포트번호
            },()=>{
                클라이언트가 서버에 접속 성공시 콘솔로깅(클라이언트측)
            })
            4.client에 대한(연결 훅) 고유 이벤트
                -"data",(message)=>{
                    1.서버측에서 클라이언트소켓에서 input을 전달받아 
                    2.otherClientSockets에게 .write()로 data이벤트 발생시킴
                    3.다른클라이언트에게서 ${message}를 받은거을 콘솔로깅}
                -"end",()=>{
                    자신이 명령어에 의한 end이벤트통해 종료됨을 콘솔로깅
                }
                -"close",()=>{
                    자신이 스스로 닫았음을 콘솔로깅
                }
    
    3.p53_UNIXsocket_
        A.server
            1.http.createServer().listen("localSocketPath");
                =Unix소켓 통신을 http모듈에서 실행
                (모든 서버/소켓 모듈은 특정 네트워크포트가 아닌 UNIX소켓에도 연결할 수 있다.)
            
            /실행 후 정리
                -http서버 모듈에 물론 UNIX소켓이 바인딩가능하겠지만,
                 좀더 최적화된 모듈을 이용하는것이 좋다.
                 -http문서전송에는 기본적으로 header를 기반으로한 통신절차가 갖춰져 있으나, UNIX(동일시스템간 통신)에서는 필수적이지 않은듯 하다.
        B.client
            1.const connections = http.request(options:http.RequestOptions, (response)=>{
                response에 대한 처리
            });
            2.connection.on(소켓연결에 관한 이벤트처리);
            connection.write(소켓연결을 통한 행동지시);
    
    4.p56_UDPsocket_
        A.server
        B.client
        C.정리
            -udp/데이터그램 소켓을 통한 통신법에 대해서 설명하자면, TCP와 엄연히 다르게 통신중 소켓간 연결을 확신하지 않고 처리를 가능하게 한다는 점이다.
            -TCP에서 전달되어야하는 정보가 누락되어 에러처리가 났을 때, 기본적으로 예외처리로 재접속을 요구하거나, 재전송을 처리한다면,
            -UDP에서는 전송된 이전버퍼이 누락되었더라도, 무시하고 다음 전송처리를 계속할 수 있도록 기능적인 설계가 되어있다고 볼 수 있다.
            -메세지를 서버나 클라이언트가 전송했을때, 해당 시퀸스가 종료되었다는 .close()를 실행하지 않는다는 점.(애초에 연결을 보장하는 것이 아니라 전송행위 하나 각각이 주체가 되는 것.)
            -클라이언트와 서버간에 아무런 연결이 유지되지 않는 상태지만, 소켓은 여전히 메세지를 송수신할 수 있다.
        D.추가 요소
            -멀티캐스팅, 클러스터운영 등을 통해 다수의 유저들이 트래픽문제를 줄이면서, 서로 공유할 수 있는 환경을 서버에서 조성해 줄 수 있다.
            유저 자체가 수신자이자 다수를 대상으로 송신자가 되기도 하지만, 서브넷에 대해 하나의 연결설정을 전송하면 해당서브넷이 그 외 클라이언트에대해 클러스터(즉 서버의 성능) 분산을 통해서 예상되는 유저의 수만큼 커버 할 수 있는 화상채팅, 다수의 음성대화등을 구현한다. 

    5.p58_readLine_interface
        A.구현
            1.프로그램(readline.createInterface(사용할 읽을 수 있는 스트림, 사용할 입력할 수 있는 스트림,completer,terminal)) 성립
            2.성립된 프로그램의 question메서드 실행("question msg", (answer:읽기스트림으로 들어올 데이터)=>{
                question:data with writeable stream에 대한 answer:data with readable stream에 관한 취급로직. answer를 받았을 때, 실행되는 콜백.
                -취급과 마지막에 cli.setPrompt(); cli.prompt()로 다시 resume();과 같은 역할로 열어준다.
            })
            3.question에 대한 시퀸스는 실행과 함께 강제되었고, 해당 이벤트는 line이라는 이벤트에 해당하지 않았음. 실제로 해당이 되어야 했었는데, 해당 이벤트에 대한 처리가 line이벤트에 대한 콜백보다 우선되어서  실행 되었다고 보는게 맞다.
            4.cli_interface.on("line",(input)=>{});
            으로 question이후로 열린 cli에 대해서 들어오는 값을 "line"이라는 이벤트 명을 지니게 하고, 그에 대한 일괄적인 처리.
            또한 마지막에 .setPrompt(); .prompt();를 통해 readline이라는 단위 처리를 이후 연속된 시퀸스로 연결. 
        B.정리
            1.prompt에 readable-stream, writable-stream을 가져와서 readline.createInterface에 연결해주고, 이후 처리를 하는데.
            2.이것은 기본적인 프롬프트라는 외부요소와, nodejs에 eventEmitter를 활용한 stream처리를 하는 프로그램.
            3.eventEmitter를 활용하여 확장한 개념이 stream개념.
            stream을 구현한 것이 process.stdin, process.stdout 출력가능, 입력가능한 스트림.
            4.readline이라는 개념은 줄단위 스트림이벤트를 처리하기위한 간편한 도구.
            5.TCP소켓은 클라이언트 소켓 자체가 readable and writeable한 상태이고, 서버는 그 소켓이 writable로 보내온 data를 readable했기에 "data"이벤트처리하고, 연이어 writable하기 때문에, 다른 클라이언트 소켓에 대해서 data를 연결해주는, 
            socket.writableStream.pipe(readableStream);의 개념을 []를 통해 처리해주는 시스템이었다.
            TCPserver.on("connection",(socket)=>{});
            TCP서버를 구현하고 연결이 성립되는 동시에 socket으로서 접속자를 바라본다.
            client측에서 const client = new net.Socket();
            자신을 소켓으로 생성하고 이후 그 소켓이 특정 TCP서버에 접속 한다.
    
    6.p60_child_process
        A.목적
            -운영체제의 프로세스로서 사용할 수 있는 기능을, Nodejs모듈을 통해서 Nodeapp이 운영체제의 기능을 프롬프트를 통하여 사용하도록 하는 것이 child_process모듈의 시작에 있다.
        B.구현
            1.child_process.spawn() importation
            2.pwd = spawn("pwd");
            3.pwd명령이 포함된 하위 프로세스에 대한 이벤트 처리
                pwd.stdout.on("data",(data)=>{...});
                pwd.stderr.on("data",(data)=>{...});
                pwd.on("exit",(errCode)=>{if(errCode)...});
        C.정리
            -child_process에서 새로운 프로세스를 생성하는 방식은 4가지가 있고, 여기서 다루는 것은 .spawn(); 추후에 cluster모듈이 등장하는데, 그것은 싱글쓰레드로 처리하는 nodeapp을 cluster의 worker를 이용하여 다양한 일을 동시에 처리할 수 있도록 하는데 os모듈.cpus().length를 통해서 cpu의 코어수를 확인하고, 그 길이 만큼(서버 컴퓨터가) worker를 생성하여 포트를 할당하고 개별 eventEmitter처리를 해주는 역할. 
            worker는 cluster.fork()를 사용하여 생성. 
            cluster.fork는 child_process.fork에 대한 레퍼런스.
            (cluster.fork를 통해서 생성된 worker는 nodeapp의 메인process와 트리구조를 갖고 그에 따라 UNIXsocket,IPC통신을 진행할 수 있고 같은 시스템, 동일 cpu내의 다른 코어이기 때문에 그것은 비교적 빠르다.)
            -.spawn()을 활용한 자식프로세스 또한 cpu의 capacity에 연관이 있다.
            -.fork()는 노드프로세스(운영체제기능을 목적x)
            -.spawn()은 쉘(노드app을 목적x)
            -어떤 식으로 이용할 추가 프로세스인지에 따라서 다르게 선택하고 로직을 작성하라.
            -nodeapp뒤에서 돌아가는 child_process라는 점에서 동일.
    
    7.p72_event_emitter
        A.목적
            -process.stdin.on("data")라는 Native-readableStream을 고유로 생성한 fs.writeStream에 연결시켜, 특정 커맨드가 입력되었을때, 세션을 종료하거나, 외부파일로 저장하는 것이 목적. 특정 커맨드라는 분기에 대해서 3가지로 분류하여, eventEmitter를 상속받은 class로 생성된 객체에 대해서, e_m의 on,emit 메서드를 활용.
        B.구현
            0.import EventEmitter from Events
                import fs from fs
            1.class InputChecker extends E_M
                2.constructor(name:str,file:str){
                    this.name = name;
                    this.writeStream = fs.createWriteStream(path,options);
                }
                3.inputChecker.prototype.check = (input:any) =>{
                    input = 프롬프트를 통해 들어온 값
                    (이미 상속이 완료 되어기 때문에,emit메서드가 발현 가능.)
                    switch(input){
                        분기1 wr:
                        this.emit("write",callback)
                        분기2 en:
                        this.emit("end",callback)
                        default:
                        this.emit("echo",callback)
                    }
                }
                4.process.stdin.resume();
                    process.stdin.on("data",(input)=>{
                        ic.check(input);
                    });
        C.정리
            -기존의 stream은 eventEmitter를 기반으로 만들어진 IO.
            -IO는 writeable, readable을 대상으로 eventEmitter를 붙인것.
            -새로운 스트림을 생성하면, 해당 스트림에 eventEmitter를 붙이고, IO를 연결시킨다.
                1.IO 들어옴
                2.IO의 data를 스트림으로 연결
                3.스트림이 받은 데이터를 eventEmitter를 통해 처리
                4.IO에서 들어온 데이터 처리 완료
                5.새로운 데이터 입력가능 사이클 형성됨. 

    8.p100_callbackAndPromise
        A.목적
            콜백함수를 받는 메서드의 경우는 대부분 비동기함수로 분류되고있다. 
        B.구현
        C.정리
            1.초기 Node에서는 비동기 기능이 초기개념의 Promise를 사용하여 만들어졌다. 
            function oldAsync(filename)
            {
                1.const promist = new process.Promise();새로운 Promise객체 생성.
                // fs.stat(filename) = 비동기함수
                3.fs.stat(filename).addCallback(func(result){
                    addcallback 체이닝 이전 결과물의 returned result에 대해서 콜백을 더한다.(일종의 전처리)result가 디렉터리 일 경우:
                        promise.emitError(error);
                        return;
                    -폴쓰루시 디렉터리아님.
                    fs.readFile(filename).addCallback(
                        function(data){
                            promise.emitSuccess(data);
                        }
                    ).addErrback(
                        function(err){
                            promise.emitError(err);
                        }
                    )
                });
                return promise;
            }
            스텍구조처리
                6.Promise또한 진행중인 상태로 return 되고, 그에 대한 처리가 완료될때까지 폴스루 발생.
                5.fs.stat()은 진행중인 상태로 Promise는 반환됨.
                4..addCallback()으로 이후처리에 대해 Promise에 내장된 eventEmitter로 처리, fs.stat()은 비동기함수로 폴스루 발생
                3.들어온 매개변수로 fs.stat(name)실행
                2.local var로 promise 생성
            1.oldAsync시작