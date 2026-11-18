import { TodoApp } from "@/components/todo-app"

export default function Page() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-md flex-col gap-6 p-6 pt-16">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Todo</h1>
        <p className="text-sm text-muted-foreground">
          오늘 할 일을 적고, 끝낸 일은 체크하세요
        </p>
      </header>
      <TodoApp />
    </main>
  )
}
