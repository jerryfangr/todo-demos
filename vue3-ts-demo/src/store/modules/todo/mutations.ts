import { LOAD_DATA, UPDATE_DATA } from "./constants";
import { State } from "./state";
import TodoList from "./types"

export default {
  [UPDATE_DATA]: (state: State, data: TodoList[]) => {
    state.todoData = data
  },

  [LOAD_DATA]: (state: State, data: TodoList[]) => {
    state.todoData = data
    state.isLoad = true
  }
}

