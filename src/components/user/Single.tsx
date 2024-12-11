import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSetRecoilState } from 'recoil';

interface SingleProps {
  nickName: string;
}


function Single() {
  return (
    <section>
      <title>
        <h2>
          <em>인싸 플레이어</em>
        </h2>
      </title>

      <div>
        <img src="/images/user/no-single.jpg" />
      </div>
        {/* <p>
          올해는 주로 동반자와 함께하는<br/>인싸 플레이어로 활약하셨네요!
        </p>
        <p>
          함께한 시간이 더욱 행복한 추억으로 남으셨길 바랍니다.
        </p> */}
        <div>
          <p>
            올 한 해, 동반자와 함께하는<br />멋진 라운드를 만들어 가셨군요!
          </p>
          <p>
            함께한 시간이 더욱 행복한 추억으로 남으셨길 바랍니다.
          </p>
        </div>
    </section>
  );
}

export default Single;