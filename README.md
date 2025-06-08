## 배포
https://luwbe1.github.io/front_5th_chapter2-2/index.refactoring.html 
https://luwbe1.github.io/front_5th_chapter2-2/index.advanced.html

## 과제의 핵심취지

- React의 hook 이해하기
- 함수형 프로그래밍에 대한 이해
- 액션과 순수함수의 분리

## 과제에서 꼭 알아가길 바라는 점

- 엔티티를 다루는 상태와 그렇지 않은 상태 - cart, isCartFull vs isShowPopup
- 엔티티를 다루는 컴포넌트와 훅 - CartItemView, useCart(), useProduct()
- 엔티티를 다루지 않는 컴포넌트와 훅 - Button, useRoute, useEvent 등
- 엔티티를 다루는 함수와 그렇지 않은 함수 - calculateCartTotal(cart) vs capaitalize(str)

### 기본과제

- Component에서 비즈니스 로직을 분리하기
- 비즈니스 로직에서 특정 엔티티만 다루는 계산을 분리하기
- 뷰데이터와 엔티티데이터의 분리에 대한 이해
- entities -> features -> UI 계층에 대한 이해

- [x] Component에서 사용되는 Data가 아닌 로직들은 hook으로 옮겨졌나요?
- [x] 주어진 hook의 책임에 맞도록 코드가 분리가 되었나요?
- [x] 계산함수는 순수함수로 작성이 되었나요?
- [x] Component에서 사용되는 Data가 아닌 로직들은 hook으로 옮겨졌나요?
- [x] 주어진 hook의 책임에 맞도록 코드가 분리가 되었나요?
- [x] 계산함수는 순수함수로 작성이 되었나요?
- [x] 특정 Entitiy만 다루는 함수는 분리되어 있나요?
- [x] 특정 Entitiy만 다루는 Component와 UI를 다루는 Component는 분리되어 있나요?
- [x] 데이터 흐름에 맞는 계층구조를 이루고 의존성이 맞게 작성이 되었나요?

### 심화과제

- 재사용 가능한 Custom UI 컴포넌트를 만들어 보기
- 재사용 가능한 Custom 라이브러리 Hook을 만들어 보기
- 재사용 가능한 Custom 유틸 함수를 만들어 보기
- 그래서 엔티티와는 어떤 다른 계층적 특징을 가지는지 이해하기

- [x] UI 컴포넌트 계층과 엔티티 컴포넌트의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [x] 엔티티 Hook과 라이브러리 훅과의 계층의 성격이 다르다는 것을 이해하고 적용했는가?
- [x] 엔티티 순수함수와 유틸리티 함수의 계층의 성격이 다르다는 것을 이해하고 적용했는가?

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 과제를 하면서 내가 제일 신경 쓴 부분은 무엇인가요?
지난 과제에서는 hook을 잘게 나누지 못하고, 역할이 불분명한 hook을 만들어 사용했던 아쉬움이 있습니다. 당시엔 App에 있는 코드들을 무조건 hook으로 빼야 한다는 생각에 사로잡혀 있었던 것 같아요...
이번에는 프로젝트 구조 자체에 hooks/, models/ 폴더가 분리되어 있었고, 기능 구현보다는 책임 분리에 집중할 수 있는 구조가 잡혀 있어서 상대적으로 수월하게 작성할 수 있었습니다. (기본 과제까지는요...)

다만 액션과 순수 함수의 분리에 대해서는 여전히 고민이 많았습니다. 로직을 어디까지 hook 안에 두고, 어떤 계산을 utils 또는 models로 빼야 할지는 기준을 세우는 게 쉽지 않았고, 특히 models와 hooks의 역할 차이는 아직도 완전히 감이 잡히진 않았습니다.

그래도 저는 그 위에서 utils 분리, 계산 함수의 순수화, 그리고 도메인별 책임을 기준으로 정리하는 방향에 집중하려고 했습니다.
기능이 되는 코드를 넘어서, "각 계층이 어떤 책임을 가져야 하는가?" 를 더 깊이 고민해볼 수 있었던 과제였습니다.


#### 폴더 구조 및 모듈화
지난 주차에는 관심사나 기능 기준이 아닌 애매한 기준으로 모듈화를 했지만, 이번에는 **작은 규모의 프로젝트라는 점을 고려해 기능별 구조**로 폴더를 나눴습니다. 각 기능에 따라 컴포넌트를 분리하고, 공통 UI는 `shared`에, 라우트 단위는 `pages`, 재사용 가능한 로직은 `hooks`, 도메인 중심의 계산 로직과 모델은 `models`에 정리하는 데에 중점을 뒀습니다.
```
refactoring/
├── components/
│   ├── admin/        # 관리자 기능 관련 컴포넌트
│   ├── cart/         # 장바구니 관련 컴포넌트
│   ├── layout/       # 공통 레이아웃 컴포넌트 (CardBox, Title 등)
│   └── shared/       # 재사용 가능한 UI 컴포넌트 (Input)
├── data/             # 정적인 데이터 또는 mock 데이터
├── hooks/            # 커스텀 훅
├── models/           # 도메인 중심의 계산 로직과 모델
├── pages/            # 라우트 단위의 페이지 컴포넌트
├── utils/            # 유틸 함수 모음
├── types/            # 타입 모음
├── App.tsx           # 앱 루트 컴포넌트
├── main.tsx          # 진입 파일
```
admin/, cart/는 각각 관리자 기능과 장바구니 기능에 해당하는 컴포넌트를 모은 폴더입니다.
관리자 페이지는 다시 상품 관리와 쿠폰 관리로 구성되어 있으며, 장바구니 페이지는 상품 목록과 장바구니 내역 중심으로 구성되어 있습니다.
현재는 컴포넌트 수가 많지 않기 때문에 coupon/, product/ 같은 하위 폴더 없이 단일 폴더에 구성했지만, 추후 규모가 커지면 기능 단위로 하위 폴더를 도입하는 방식도 고려하고 있습니다.


#### 유틸 함수 분리 구조
현재는 utils/ 폴더 아래에 아래와 같이 유틸 함수들을 분리해두었습니다.
```
utils/
├── coupon.ts        // 쿠폰 관련 유틸
├── discount.ts      // 할인 계산 유틸
├── format.ts        // 포맷 관련 유틸
├── product.ts       // 상품 관련 유틸
```
처음 유틸 파일을 나눌 때는 **무슨 계산을 하느냐**보다는 **무엇에 의존하는 함수냐**를 기준으로 파일 네이밍과 구조를 정했던 것 같습니다.
현재는 파일이 네 개 정도지만, 점점 유틸 함수가 많아질 경우를 대비해 utils/index.ts 파일을 만들어 중앙에서 export를 관리하는 방식으로 나아가면 좋을 거 같습니다.


#### discountType 정의 개선
처음에는 discountType을 "amount" | "percentage"처럼 단순한 문자열 유니언 타입으로 선언 되어 있었습니다.
`coupon.discountType === 'amount'`와 같이 하드코딩된 문자열 비교가 반복되는 점이 거슬렸고,
오타에 취약하며 유지보수 관점에서도 불안정하다는 생각이 들었습니다.
```
export const DISCOUNT_TYPE = {
  AMOUNT: 'amount',
  PERCENTAGE: 'percentage',
} as const;

export type DiscountType = (typeof DISCOUNT_TYPE)[keyof typeof DISCOUNT_TYPE];
```
그래서 위와 같이 상수 객체랑 타입을 같이 정의하여, 값과 타입을 한 번에 관리할 수 있도록 수정했습니다.
이렇게 바꾸고 나니까 UI에서 `coupon.discountType === DISCOUNT_TYPE.AMOUNT`처럼 비교할 때도 더 안전하고 직관적이고,
나중에 할인 타입이 추가될 일이 생겨도 DISCOUNT_TYPE에만 추가하면 돼서 확장성도 좋아진 거 같습니다.


### 과제를 다시 해보면 더 잘 할 수 있었겠다 아쉬운 점이 있다면 무엇인가요?
####  MSW(Mock Service Worker)에 대한 학습
이번 심화 과제에서는 MSW를 활용하여 초기 데이터를 API로 불러오고, 추가/수정/삭제할 수 있는 기능을 만들어봐도 좋겠다고 안내해주셨습니다. 비록 시간 관계상 실제 구현까지는 하지 못했지만, 아래와 같은 내용들을 바탕으로 MSW에 대한 이해를 쌓는 데 집중하였습니다.

**주요 특징**
- 브라우저의 네트워크 요청(fetch, axios 등)을 서비스 워커 레벨에서 가로채서 처리
- 테스트, 개발, Storybook 등 다양한 환경에서 동일한 mock 핸들러 재사용 가능
- 백엔드 없이 프론트엔드 개발 가능

**MSW를 이번 과제에 사용할 경우 가능한 개발 흐름 예시**
1. /api/products에 대한 GET 요청을 가로채고 mock 데이터를 반환
2. POST 요청으로 새로운 상품을 추가하
3. PUT/PATCH 요청으로 상품 정보를 수정
4. DELETE 요청으로 특정 상품을 삭제

**예시 디렉토리 구조**
```
src/
├── mocks/
│   ├── handlers.ts        # rest.get/post 등 정의
│   └── browser.ts         # worker setup 코드
└── index.tsx              # worker.start() 호출 위치
```

아래와 같이 간단한 핸들러를 만들어볼 수 있겠습니다.
```
// mocks/handlers.ts
import { rest } from 'msw';

let mockProducts = [
  { id: '1', name: '상품 A', price: 10000 },
  { id: '2', name: '상품 B', price: 20000 },
];

export const handlers = [
  // 상품 목록 불러오기
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockProducts));
  }),
];

```

#### ProductManager 개선
밑에 코멘트를 남겼습니다.


### 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문 편하게 남겨주세요 :)


## 리뷰 받고 싶은 내용이나 궁금한 것에 대한 질문
- React뿐만 아니라 어떤 기술이든, 개념적으로는 이해가 된 것 같은데 막상 실제 코드에 적용하려고 하면 잘 풀리지 않거나, 손이 멈추는 경우가 많습니다. 이렇게 개념 이해와 실제 구현 사이의 괴리감을 줄이기 위해서는 어떤 방식으로 연습하거나 접근해보는 게 좋을까요?
- 계층 구분이 명확하게 되었는지 궁금합니다.
예: UI 컴포넌트 vs 엔티티 중심 컴포넌트, 라이브러리 훅 vs 도메인 훅
제가 구조적으로 나눈 기준이 적절했는지, 개선 방향이 있다면 듣고 싶습니다.
- 다른 질문들은 밑에 코멘트를 남겼습니다.
