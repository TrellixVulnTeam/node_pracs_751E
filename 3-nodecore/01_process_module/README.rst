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

