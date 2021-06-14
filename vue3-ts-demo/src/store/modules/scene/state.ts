/**
 * create a state
 * 
 * Todo add todoData type
 * @returns state
 */
const createState = () => {
  const state: {
    isDarkMode: boolean,
  } = {
    isDarkMode: false,
  }

  return state
}

type State = ReturnType<typeof createState>

export { createState, State }