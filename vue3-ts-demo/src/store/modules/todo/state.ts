import TodoList from "./types"

/**
 * create a state
 * 
 * @returns state
 */
const createState = () => {
  const state: {
    todoData: TodoList[],
    isLoad: boolean
  } = {
    todoData: [],
    isLoad: true // false
  }

  return state
}

type State = ReturnType<typeof createState>

export { createState, State }