import { 
  LOAD_DATA, 
  UPDATE_DATA, 
  SWITCH_TODOLIST, 
  ADD_TODOLIST, 
  ADD_TODOITEM,
  DELETE_TODOLIST,
  DELETE_TODOITEM,
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
    const todoList = state.todoData[state.currentTodoList]
    todoList?.todoItems.push(data)
  },

  [DELETE_TODOLIST]: (state: State, index: number) => {
    state.todoData.splice(index, 1)
  },

  [DELETE_TODOITEM]: (state: State, index: number) => {
    const todoList = state.todoData[state.currentTodoList]
    todoList?.todoItems.splice(index, 1)
  }



  // add todo
  // delete todo
  // update todo
  // search todo
}

