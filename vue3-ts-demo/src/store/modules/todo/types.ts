type TodoItem = {
  id: string
  // 
  title: string
  content?: string
  status: 'none' | 'todo' | 'in progress' | 'completed'
  [k: string]: boolean | number | string | undefined
}

type TodoList = {
  id: string
  title: string
  todoItems: TodoItem[]
}

export default TodoList
export { TodoItem, TodoList}