1. create-react-native-app 으로 생성
2. firebase에 new project 생성
3. npm i @react-native-firebase/app -> firebase의 app버전 설치
4. firebase에서 android앱 추가, 내 앱파일에서 android/app/build.gradle에 있는 applicationId(보통은 회사 도메인의 역순으로 만듬)를 firebase package name에 추가 그리고 설명 따라하기
5. npm i @react-native-firebase/auth -> firebase의 인증모듈 설치
6. npx pod-install -> ios를 사용한다면 이것을 모듈 설치할때마다 해줘야함
7. npm i @react-navigation/native -> 네비게이션 설치
8. npm i react-native-screens -> 네비게이션에 사용되는 스크린 설치
9. npm i react-native-safe-area-context -> 화면의 안전 영역 삽입 정보에 엑세스(노치, 상태표시줄, 홈표시기 등)
10. npm i @react-navigation/native-stack -> 스택 네비게이션 설치
11. npm install styled-components -> css스타일을 사용하기위해 설치. 사용하기 쉽고 prop에 접근가능한 스타일 컴포넌트
12. npm install @types/styled-components @types/styled-components-react-native -> styled-components에 타입스크립트로 자동완성을 해주기 위해 설치
13. expo install expo-app-loading -> loading컴포넌트 설치
