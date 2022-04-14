Static file server
------------------

process::

   1. Make HTTP server
   2. HTTP wait request
   3. parse URL
   4. determine file path
   5. Check file exist
   6. if not exist -> respond to request not found
   7. open file
   8. make response header
   9. write file to body
   10. wait another request

- fs.exists 함수 자체가 promise객체를 반환하는 비동기 처리
- 따라서 http request handler가 async하다고 명시해주고,
- request handler 내부에서는 fs.exists를 받아서 then으로 처리하는 것만으로 res.write에 이를 수 있다.

``curl 127.0.0.1:8124/test.jpg --verbose --output test.out.jpg``

