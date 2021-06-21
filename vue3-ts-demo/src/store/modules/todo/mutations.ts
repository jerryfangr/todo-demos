import { 
  LOAD_DATA, 
  UPDATE_DATA, 
  SWITCH_TODOLIST, 
  ADD_TODOLIST, 
  ADD_TODOITEM 
} from "./constants";
import { State } from "./state";
import { TodoList, TodoItem} from "./types"
import testData from '@/assets/testData.json'

export default {
  [LOAD_DATA]: (state: State, data: TodoList[]) => {
    state.todoData = data.length > 0 ? data : (testData as TodoList[]) // data
    state.isLoad = true
  },

  [UPDATE_DATA]: (state: State, data: TodoList[]) => {
    state.todoData = data
  },

  [SWITCH_TODOLIST]: (state: State, todoListIndex: number) => {
    state.currentTodoList = todoListIndex
  },

  [ADD_TODOLIST]: (state: State, data: TodoList) => {
    state.todoData.push(data)
  },

  [ADD_TODOITEM]: (state: State, data: TodoItem) => {

  }



  // add todo
  // delete todo
  // update todo
  // search todo
}

