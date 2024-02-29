# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## 와이어프레임
<table>
<thead>
  <tr>
  <th>
    메인 페이지
  </th>
    <th>
    리스트 페이지
  </th>
     <th>
    디테일 페이지
  </th>
    </thead>
  <tbody>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/Sparta-outsourcing-Project/Sparta-outsourcing-Project/blob/feat/main/src/assets/README_img/wireframe_main.jpg"/>
    </td>
    <td>
      <img src="https://github.com/Sparta-outsourcing-Project/Sparta-outsourcing-Project/blob/feat/main/src/assets/README_img/wireframe_list.jpg"/>
    </td>
    <td>
      <img src="https://github.com/Sparta-outsourcing-Project/Sparta-outsourcing-Project/blob/feat/main/src/assets/README_img/wireframe_detail.jpg"/>
    </td>
  </tr>
  </tbody>
</table>

## 화면 구성 및 기능
<table>
<thead>
  <tr>
  <th>
    메인 페이지
  </th>
    </thead>
  <tbody>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/Sparta-outsourcing-Project/Sparta-outsourcing-Project/blob/feat/main/src/assets/README_img/main.png"/>
    </td>
  </tr>
  </tbody>
</table>

 ### 1. 메인페이지
  <ul>
    <li>header / main / footer로 화면 구성</li>
    <li>header - logo / home / signup / login 각 icon 클릭시 회원가입 / 로그인 모달창 구성</li>
    <li>main - mainslide / search + keyword / bodyslide / best youtube 구성
      <ul>
        <li>main slide : swiper slide 라이브러리를 활용한 슬라이드 구성
          <ul>
            <li>화면 렌더링 시 헤더의 슬라이더가 자동으로 넘어갑니다.</li>
            <li>하단의 점 클릭 시 해당 슬라이더로 이동합니다.</li>
          </ul>
        </li>
        <li>body slide : slick slide 라이브러리를 활용한 슬라이드 구성
          <ul>
            <li>해시태그 키워드 별 대표 영상을 슬라이더로 조회할 수 있습니다.</li>
            <li>양 옆의 화살표를 누르면 선택한 방향으로 슬라이더가 이동합니다.</li>
            <li>영상에 커서를 올리면 크기가 커지고, 클릭 시 모달창으로 영상을 재생합니다.</li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>

<table>
  <thead>
    <tr>
      <th>
        로그인
      </th>
      <th>
        회원가입
      </th>
      <th>
        모달
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <img src="https://github.com/Sparta-outsourcing-Project/Sparta-outsourcing-Project/blob/feat/main/src/assets/README_img/login.jpg"/>
      </td>
      <td>
        <img src="https://github.com/Sparta-outsourcing-Project/Sparta-outsourcing-Project/blob/feat/main/src/assets/README_img/signup.jpg"/>
      </td>
      <td>
        <img src="https://github.com/Sparta-outsourcing-Project/Sparta-outsourcing-Project/blob/feat/main/src/assets/README_img/modal.jpg"/>
      </td>
    </tr>
  </tbody>
</table>
   <h4> 1-2. 로그인 / 회원가입 / 모달 </h4>
  <ul>
    <li>
      <h5>로그인</h5>
      <ul>
        <li>firebase authentication을 사용한 로그인 기능 구현
          <ul>
            <li>
              이메일/비밀번호 로그인 : 로그인 아이콘을 누르면 모달창이 뜨고, 이메일과 비밀번호를 입력하고 로그인합니다.
            </li>
            <li>
              구글 소셜 로그인 : ‘Google 로그인’ 클릭 시 로그인 팝업창이 뜨고, 구글 계정으로 로그인합니다.
            </li>
          </ul>
        </li>
      </ul>
    </li>
     <li>
      <h5>회원가입</h5>
      <ul>
        <li>회원가입 모달창에 이메일, 닉네임, 비밀번호를 입력하여 회원가입합니다.</li>
        <li>이미 가입된 이메일인 경우 중복 가입이 불가능합니다.</li>
      </ul>
    </li>
     <li>
      <h5>모달</h5>
      <ul>
        <li>bodyslide의 item을 클릭시 모달창이 생성되며, 유튜브 영상을 볼 수 있습니다.</li>
      </ul>
    </li>
  </ul>
 



## 파일구조
```
📦src<br/>
 ┣ 📂api
 ┃ ┣ 📜auth.js
 ┃ ┣ 📜config.js
 ┃ ┣ 📜dataApi.js
 ┃ ┣ 📜detailApi.js
 ┃ ┣ 📜favorites.js
 ┃ ┣ 📜mainSliderDataApi.js
 ┃ ┗ 📜request.js
 ┣ 📂assets
 ┃ ┣ 📂README_img
 ┃ ┃ ┣ 📜detail.png
 ┃ ┃ ┣ 📜list.png
 ┃ ┃ ┣ 📜loding.png
 ┃ ┃ ┣ 📜login.jpg
 ┃ ┃ ┣ 📜main.png
 ┃ ┃ ┣ 📜modal.jpg
 ┃ ┃ ┣ 📜signup.jpg
 ┃ ┃ ┣ 📜wireframe_detail.jpg
 ┃ ┃ ┣ 📜wireframe_list.jpg
 ┃ ┃ ┗ 📜wireframe_main.jpg
 ┃ ┣ 📜coloredStar.png
 ┃ ┣ 📜emptyStar.png
 ┃ ┣ 📜google.png
 ┃ ┣ 📜main_banner01.jpg
 ┃ ┣ 📜main_banner02.jpg
 ┃ ┣ 📜main_banner03.jpg
 ┃ ┣ 📜profile_defaultImage.png
 ┃ ┣ 📜react.svg
 ┃ ┗ 📜utrend_logo.png
 ┣ 📂components
 ┃ ┣ 📂AuthModal
 ┃ ┃ ┣ 📂styles
 ┃ ┃ ┃ ┣ 📜Login.style.js
 ┃ ┃ ┃ ┗ 📜SignUp.style.js
 ┃ ┃ ┣ 📜Login.jsx
 ┃ ┃ ┗ 📜SignUp.jsx
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📜AdSuggestBtn.jsx
 ┃ ┃ ┣ 📜Detail.jsx
 ┃ ┃ ┣ 📜RecentVideo.jsx
 ┃ ┃ ┗ 📜TwoLevelPieChart.jsx
 ┃ ┣ 📂layout
 ┃ ┃ ┣ 📜Footer.jsx
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┗ 📜Loading.jsx
 ┃ ┣ 📂list
 ┃ ┃ ┣ 📜CardList.jsx
 ┃ ┃ ┗ 📜ListFavoriteButton.jsx
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📜Main.jsx
 ┃ ┃ ┗ 📜Thumbnail.jsx
 ┃ ┣ 📂myPage
 ┃ ┃ ┗ 📜MyProfile.jsx
 ┃ ┗ 📂sliders
 ┃ ┃ ┣ 📜BodySlider.jsx
 ┃ ┃ ┣ 📜HeaderSlider.jsx
 ┃ ┃ ┗ 📜VideoModal.jsx
 ┣ 📂hooks
 ┃ ┣ 📜useChannelDetailInfo.js
 ┃ ┗ 📜useMostPopularChannel.js
 ┣ 📂pages
 ┃ ┣ 📜Error.jsx
 ┃ ┣ 📜Home.jsx
 ┃ ┣ 📜List.jsx
 ┃ ┗ 📜MyPage.jsx
 ┣ 📂redux
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜configStore.js
 ┃ ┗ 📂modules
 ┃ ┃ ┣ 📜loginSlice.js
 ┃ ┃ ┗ 📜userSlice.js
 ┣ 📂share
 ┃ ┗ 📜Router.jsx
 ┣ 📂style
 ┃ ┗ 📜GlobalStyle.jsx
 ┣ 📜App.jsx
 ┗ 📜main.jsx
```
