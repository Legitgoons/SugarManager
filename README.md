# 관리하당

### 당뇨병 환자의 식단 관리를 도와주는 어플리케이션

## 기획 배경

#### 문제점

- 젊은 당뇨인구 급증 및 급속한 노령화로 인한 당뇨환자 증가
- 당뇨환자는 혈당 측정과 운동 및 식이조절, 수분 섭취 등의 관리가 필요하나 잘 이뤄지지 않는 경우 잦음

#### 해결방안

- 혈당 기록 및 관리, 식사 기록 및 관리 기능 제공
- 가족 혹은 케어를 도와주는 사람과 그룹을 맺도록 함
  - 그룹끼리는 지난 기록 보기, 챌린지 설정 등이 가능
  - 다른 멤버의 챌린지가 미완료라면 알림 전송 가능
- 식사 후 일정 시간이 지나면 혈당 기록 요구 알림 전송

## 개발 기간

#### 2023.10.09 - 2023.11.17 (7주)

<br/><br/>

## 🛠️ Tech Stack 🛠️

### Infra

<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>
<img src="https://img.shields.io/badge/apachekafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white"/>
<img src="https://img.shields.io/badge/jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white"/>
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
<img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white"/>
<img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white"/>

### Front

<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"/>

### Back

<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white">
<img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"/>

<br/><br/>

## 아키텍처

![architecure.png](./EXEC/SoftwareArchitecture.png)

## ERD

![ERD.png](./EXEC/ERD.png)

<br/><br/>

## 결과물

### 메인

<p>
<img src="./EXEC/images/main1.png" width=200/>
<img src="./EXEC/images/main2.png" width=200/>
<img src="./EXEC/images/main3.png" width=200/>
</p>

### 로그인 및 마이페이지
<p>
<img src="./EXEC/images/login.jpeg" width=200/>
<img src="./EXEC/images/mypage.png" width=200/>
</p>

### 혈당 관리

<p>
<img src="./EXEC/images/bloodsugar1.png" width=200/>
<img src="./EXEC/images/bloodsugar2.png" width=200/>
<img src="./EXEC/images/bloodsugar3.png" width=200/>
<img src="./EXEC/images/bloodsugar4.jpeg" width=200/>
</p>

### 식단 관리

<p>
<img src="./EXEC/images/meal1.png" width=200/>
<img src="./EXEC/images/meal2.png" width=200/>
<img src="./EXEC/images/meal3.png" width=200/>
<img src="./EXEC/images/meal4.png" width=200/>
<img src="./EXEC/images/meal5.png" width=200/>
</p>

### 챌린지

<p>
<img src="./EXEC/images/challenge.jpeg" width=200/>
<img src="./EXEC/images/challenge1.png" width=200/>
<img src="./EXEC/images/challenge2.jpeg" width=200/>
<img src="./EXEC/images/alram.png" width=200/>
</p>

## Commit Convention
### 1. Commit 메시지 구조

기본 적인 커밋 메시지 구조는 **`제목`,`본문`** 두 가지 파트로 나누고, 각 파트는 빈줄을 두어 구분한다.

```jsx
type : subject

body
```

### 2. Commit Type

타입은 태그와 제목으로 구성되고, 태그는 영어로 쓰되 첫 문자는 대문자로 한다.

**`태그 : 제목`의 형태이며, `:`뒤에만 space가 있음에 유의한다.**

- `Feat` : 새로운 기능 추가
- `Fix` : 버그 수정
- `Docs` : 문서 수정
- `Style` : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- `Refactor` : 코드 리펙토링
- `Test` : 테스트 코드, 리펙토링 테스트 코드 추가
- `Chore` : 간단한 코드 수정
- `Merged`: 상위 브랜치의 commit을 pull 받을 때

### 3. Subject

- 제목은 최대 50글자가 넘지 않도록 하고 마침표 및 특수기호는 사용하지 않는다.
- 영문으로 표기하는 경우 동사(원형)를 가장 앞에 두고 첫 글자는 대문자로 표기한다.(과거 시제를 사용하지 않는다.)
- 제목은 **개조식 구문**으로 작성한다. --> 완전한 서술형 문장이 아니라, 간결하고 요점적인 서술을 의미.

```
* Fixed --> Fix
* Added --> Add
* Modified --> Modify
```

### 4. Body

본문은 다음의 규칙을 지킨다.

- 본문은 한 줄 당 72자 내로 작성한다.
- 본문 내용은 양에 구애받지 않고 최대한 상세히 작성한다.
- 본문 내용은 어떻게 변경했는지 보다 무엇을 변경했는지 또는 왜 변경했는지를 설명한다.
