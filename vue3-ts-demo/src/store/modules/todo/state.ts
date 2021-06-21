import TodoList from "./types"

/**
 * create a state
 * 
 * @returns state
 */
const createState = () => {
  const state: {
    todoData: TodoList[]
    currentTodoList: number
    isLoad: boolean
  } = {
    todoData: [],
    currentTodoList: -1,
    isLoad: false
  }

  return state
}

type State = ReturnType<typeof createState>

export { createState, State }