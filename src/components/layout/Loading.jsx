// import styled from 'styled-components';

// export default function Loading() {
//   return (
//     <LodingBox>
//       <img src="/public/img/loading.png" alt="loading.." />
//     </LodingBox>
//   );
// }

// const LodingBox = styled.div`
//   min-height: 100vh;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Loading() {
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (filled < 100) setTimeout(() => setFilled((prev) => (prev += 2)));
  }, [filled]);

  return (
    <LoadingBarBox>
      <ProgressBar>
        <div
          style={{
            height: '100%',
            width: `${filled}%`,
            backgroundColor: '#febe98',
            transition: 'width 0.6s'
          }}
        ></div>
        <ProgressPercent>{filled}%</ProgressPercent>
      </ProgressBar>
    </LoadingBarBox>
  );
}

const LoadingBarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 500px;
  height: 60px;
  border-radius: 2rem;
`;

const ProgressPercent = styled.span`
  font-weight: 900;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #eee;
  text-shadow: -1px 0 #555, 0 1px #555, 1px 0 #555, 0 -1px #555;
`;
