import { State } from "./state";
import TodoList from "./types"

const getters = {
  /**
   * get current todolist by id
   * 
   * @param state 
   * @returns 
   */
  currentTodoList: (state: State): TodoList | void => {
    return state.todoData[state.currentTodoList]
  },
}

export default getters;