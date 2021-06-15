import { LOAD_DATA, UPDATE_DATA } from "./constants";
import { State } from "./state";
import TodoList from "./types"

export default {
  [LOAD_DATA]: (state: State, data: TodoList[]) => {
    state.todoData = data
    state.isLoad = true
  },

  [UPDATE_DATA]: (state: State, data: TodoList[]) => {
    state.todoData = data
  },

  // add todo
  // delete todo
  // update todo
  // search todo
}

