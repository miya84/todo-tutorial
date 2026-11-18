import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "사용법 | todo",
  description: "Todo 앱 사용법 안내",
}

const STEPS: { title: string; description: string }[] = [
  {
    title: "할 일 추가",
    description:
      "상단 입력창에 내용을 적고 Enter를 누르면 목록에 추가됩니다. 추가하면 자동으로 '전체' 보기로 돌아갑니다.",
  },
  {
    title: "완료 체크",
    description:
      "항목 왼쪽 체크박스를 누르면 완료 처리되어 취소선이 표시됩니다. 다시 누르면 진행중으로 돌아갑니다.",
  },
  {
    title: "내용 수정",
    description:
      "항목 텍스트를 더블클릭하면 수정 모드가 됩니다. Enter 또는 입력창 밖 클릭으로 저장하고, Esc로 취소합니다. 빈 값으로 저장하면 원래 내용이 유지됩니다.",
  },
  {
    title: "삭제",
    description: "항목 오른쪽 휴지통 버튼을 누르면 해당 항목이 삭제됩니다.",
  },
  {
    title: "필터로 보기",
    description:
      "'전체 / 진행중 / 완료' 탭으로 원하는 상태의 할 일만 골라 볼 수 있습니다.",
  },
  {
    title: "완료 항목 한 번에 지우기",
    description:
      "완료된 항목이 하나라도 있으면 '완료 항목 지우기' 버튼이 나타나고, 누르면 완료된 항목이 모두 삭제됩니다.",
  },
  {
    title: "자동 저장",
    description:
      "할 일은 이 브라우저(localStorage)에 자동 저장되어 새로고침해도 유지됩니다. 다른 브라우저나 기기와는 공유되지 않습니다.",
  },
]

export default function GuidePage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col gap-6 p-6 pt-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">사용법</h1>
        <p className="text-sm text-muted-foreground">
          Todo 앱의 기능을 순서대로 살펴보세요.
        </p>
      </header>
      <ol className="flex flex-col gap-4">
        {STEPS.map(({ title, description }, index) => (
          <li key={title} className="flex gap-3">
            <span
              aria-hidden
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground"
            >
              {index + 1}
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold">{title}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href="/"
        className="text-sm font-medium underline underline-offset-4"
      >
        ← 할 일 목록으로 돌아가기
      </Link>
    </main>
  )
}
