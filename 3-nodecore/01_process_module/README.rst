Process module
==============

memory
------

SYNTAX

   ``process.memoryUsage();``

DESC

   - rss: node c++ objectcode를 포함한 root process로 부터 runtime heap까지의 총량.
   - heapsize: js 런타임을 위해 잡아놓은 용도만 포함할 가능성이 높습니다.

      - *말도안되게 큰걸보니 GC, global objects, namespace 등 명시되지 않은 컨텍스트 포함*
      - 런타임에서 메모리 사용량이 높아지면 heap을 추가로 받아 rss와 Heapsize가 함께 증가하는데, rss가 증가하는 건 순전히 heapsize가 증가한 이유일 가능성이 높습니다.

   - used: js 런타임에서 실제로 사용한 메모리 사이즈

      - 4833280 에서 4103888을 뺀 대략 700,000byte 700kb 정도가 사용자가 한번에 할당할 수 있는 최대 크기

OUTPUT

.. code-block:: json

   {
      rss :      33198080
      heapsize :  4833280
      used:       4103888
   }

tick, microTask
---------------

SYNTAX

   - ``process.nextTick(callback))``
   - ``queueMicrotask(callback)``

DESC

   ``nextTick``

      nextTick은 현재 컨텍스트(stack)의 진행을 마친 후, 더 이상 sync하게 동작할 operation이 존재하지 않는다면 next tick queue에 쌓인 stack을 진행한다.
      이 컨텍스트의 전환을 eventloop라고 부르며, 현재 context의 eventloop가 종료되야 다음 이벤트를 향해 이동할 수 있다.

   ``queueMicrotask``

      callback을 호출하도록 queue한다.
      만약, callback이 exception을 발생시키면, processObject는 uncaughtException 이벤트를 emit하게 될 것이다.

      microtask queue는 V8에 의해 관리되며 nextTick() queue와 비슷하게 동작하는데 그는 Node.js에 의해 관리된다.

      따라서 ``process.nextTick()`` 이 항상 먼저 진행되는데 그것은 nodejs의 eventloop내부의 것이다. microTask의 본 목적은 OS의 기능을 빌림하는 것과 등록하는 것에 있다고 보면 좋다.

