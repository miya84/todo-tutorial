"use client"

import { useRef, useState } from "react"
import { ClipboardListIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTodos, type Todo } from "@/hooks/use-todos"
import { cn } from "@/lib/utils"

type Filter = "all" | "active" | "completed"

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "active", label: "진행중" },
  { value: "completed", label: "완료" },
]

export function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted } =
    useTodos()
  const [draft, setDraft] = useState("")
  const [filter, setFilter] = useState<Filter>("all")

  const hasCompleted = todos.some((todo) => todo.completed)
  const activeCount = todos.filter((todo) => !todo.completed).length

  const visibleTodos = todos.filter((todo) =>
    filter === "all"
      ? true
      : filter === "active"
        ? !todo.completed
        : todo.completed
  )

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 한글 조합 중 Enter는 무시 (중복 추가 방지)
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return
    const text = draft.trim()
    if (!text) return
    addTodo(text)
    setDraft("")
    // 새 항목이 필터에 가려지지 않도록 전체 보기로 돌아간다
    setFilter("all")
  }

  return (
    <div className="flex flex-col gap-5">
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="할 일을 입력하고 Enter"
        aria-label="새 할 일"
        autoFocus
        className="h-11 px-4 text-base shadow-sm md:text-sm"
      />
      <div className="flex items-center justify-between gap-2">
        <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
          <TabsList aria-label="필터">
            {FILTERS.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {hasCompleted && (
          <Button variant="ghost" size="sm" onClick={clearCompleted}>
            완료 항목 지우기
          </Button>
        )}
      </div>
      {visibleTodos.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed py-12 text-center text-muted-foreground">
          <ClipboardListIcon className="size-8 opacity-60" />
          <p className="text-sm font-medium">
            {todos.length === 0
              ? "할 일이 없습니다"
              : "해당하는 할 일이 없습니다"}
          </p>
          {todos.length === 0 && (
            <p className="text-xs">위 입력창에 첫 할 일을 추가해 보세요</p>
          )}
        </div>
      ) : (
        <ul className="flex flex-col divide-y overflow-hidden rounded-xl border bg-card shadow-sm">
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={(text) => editTodo(todo.id, text)}
            />
          ))}
        </ul>
      )}
      {todos.length > 0 && (
        <p className="px-1 text-xs text-muted-foreground">
          남은 할 일 {activeCount}개 · 전체 {todos.length}개
        </p>
      )}
    </div>
  )
}

function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
}: {
  todo: Todo
  onToggle: () => void
  onDelete: () => void
  onEdit: (text: string) => void
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.text)
  // 편집 종료 후 언마운트 시 발생하는 blur가 다시 저장하지 않도록 막는다
  const editingRef = useRef(false)

  const startEdit = () => {
    setValue(todo.text)
    editingRef.current = true
    setEditing(true)
  }

  const finish = () => {
    editingRef.current = false
    setEditing(false)
  }

  const commit = () => {
    if (!editingRef.current) return
    const text = value.trim()
    // 빈 값이면 원래 텍스트 유지
    if (text && text !== todo.text) onEdit(text)
    finish()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === "Enter") commit()
    if (e.key === "Escape") finish()
  }

  return (
    <li className="group flex min-h-12 items-center gap-3 px-4 transition-colors hover:bg-muted/50">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={onToggle}
        aria-label={`${todo.text} 완료`}
      />
      {editing ? (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={commit}
          aria-label="할 일 수정"
          autoFocus
          className="h-8 flex-1"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          className={cn(
            "flex-1 cursor-text py-2 text-sm break-all select-none",
            todo.completed && "text-muted-foreground line-through"
          )}
        >
          {todo.text}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={onDelete}
        aria-label={`${todo.text} 삭제`}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2Icon />
      </Button>
    </li>
  )
}
