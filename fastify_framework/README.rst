Fastify in 2week
================

Default Logger Output:

   .. code-block:: bash

      npm start
      npm run format && npm run lint && node src/server.js

      > fastfy-node-tutorial@1.0.0 format
      > prettier --write "src/**/*.js" "src/*.js"

      src/our-first-route.js 138ms
      src/server.js 30ms

      > fastfy-node-tutorial@1.0.0 lint
      > eslint "{src,apps,libs,test}/**/*.js" --fix

      {"level":30,"time":1652889668187,"pid":170777,"hostname":"junehan-latitude3410","msg":"Server listening at http://127.0.0.1:3000"}
      {"level":30,"time":1652889669043,"pid":170777,"hostname":"junehan-latitude3410","reqId":"req-1","req":{"method":"GET","url":"/","hostname":"127.0.0.1:3000","remoteAddress":"127.0.0.1","remotePort":49066},"msg":"incoming request"}
      {"level":30,"time":1652889669052,"pid":170777,"hostname":"junehan-latitude3410","reqId":"req-1","res":{"statusCode":200},"responseTime":7.761108011007309,"msg":"request completed"}
