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
                    