# Todo Tutorial

[Claude Code Playbook](https://docs.claude-hunt.com) 강의에서 작은 할 일 앱을 직접 만들어 보며 Claude Code 쓰는 법을 배우는 연습용 저장소입니다.

## 관련 링크

- 강의 본문: https://docs.claude-hunt.com
- 수강생 결과물 공유: https://claude-hunt.com

## 기술 스택

- Next.js 16 (App Router, Turbopack)
- React 19
- Tailwind CSS v4
- shadcn/ui (radix-maia 스타일, taupe 베이스)
- TypeScript / ESLint / Prettier
- 패키지 매니저: bun 1.3.6

## 시작하기

### 준비물

- [Git](https://git-scm.com)
- [Bun](https://bun.sh) 1.3.6 이상 (이 프로젝트는 npm/yarn이 아니라 bun을 씁니다)
- Node.js 20.9 이상 (Next.js 16 요구 사항)

Bun이 없다면 먼저 설치하세요.

```bash
curl -fsSL https://bun.sh/install | bash   # macOS / Linux
brew install oven-sh/bun/bun               # macOS (Homebrew)
```

설치 후 `bun -v` 로 버전을 확인합니다.

### 1. 저장소 받기

```bash
git clone <저장소 주소>
cd todo-tutorial
```

### 2. 의존성 설치

```bash
bun install
```

`bun.lock` 에 고정된 버전 그대로 설치됩니다. 별도의 환경 변수(`.env`) 설정은 필요 없습니다.

### 3. 개발 서버 실행

```bash
bun dev
```

개발 서버는 기본적으로 [http://localhost:3000](http://localhost:3000) 에서 열립니다. 3000번 포트가 이미 쓰이고 있으면 다른 포트로 뜨니, 터미널에 표시된 주소를 확인하세요. 종료는 `Ctrl + C` 입니다.

### 4. 잘 설치됐는지 확인

다른 터미널에서 아래 명령이 모두 에러 없이 끝나면 준비 완료입니다.

```bash
bun run typecheck  # 타입 검사
bun run lint       # ESLint
bun run test       # 테스트 (Vitest)
```

### 자주 쓰는 스크립트

```bash
bun dev            # 개발 서버 (Turbopack)
bun run build      # 프로덕션 빌드
bun run start      # 빌드 결과 실행 (먼저 build 필요)
bun run lint       # ESLint
bun run typecheck  # tsc --noEmit
bun run test       # 테스트 한 번 실행
bun run test:watch # 테스트 감시 모드
bun run format     # Prettier 포맷팅
```

## 레슨별 시작 브랜치

레슨마다 시작 시점의 코드를 `lesson/<레슨 이름>` 브랜치로 제공합니다. 레슨 본문이 안내하는 브랜치로 바꾼 뒤 따라가세요.

```shell
git checkout lesson/claude-md
```

## 컴포넌트 추가

shadcn/ui 컴포넌트는 다음과 같이 추가합니다.

```bash
bunx --bun shadcn@latest add button
```

`components/ui` 디렉토리에 컴포넌트가 추가됩니다.

## 컴포넌트 사용

```tsx
import { Button } from "@/components/ui/button";
```
