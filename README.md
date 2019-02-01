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