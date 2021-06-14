/**
 * create a state
 * 
 * Todo add todoData type
 * @returns state
 */
const createState = () => {
  const state: {
    todoData: any[] | null
  } = {
    todoData: null
  }

  return state
}

type State = ReturnType<typeof createState>

export { createState, State }