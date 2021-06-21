import { ActionContext } from "vuex"
import { 
  LOAD_DATA, 
  UPDATE_DATA, 
  SAVE_DATA, 
  ADD_TODOLIST, 
  ADD_TODOITEM,
  DELETE_TODOLIST,
  DELETE_TODOITEM,
} from "./constants"
import { State } from "./state"
import { STORAGE_NAME } from '@/constants'
import {TodoList, TodoItem} from "./types"
import Tool from '@/tools'

export default {
  [UPDATE_DATA]: ({ commit }: ActionContext<State, unknown>, data: TodoList[]): void => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(data))
    commit(UPDATE_DATA, data)
  },

  [LOAD_DATA]: ({ commit }: ActionContext<State, unknown>): void => {
    const localData = localStorage.getItem(STORAGE_NAME)
    commit(LOAD_DATA, JSON.parse(localData || '[]'))
  },

  [SAVE_DATA]: ({ state }: ActionContext<State, unknown>): void => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(state.todoData))
  },

  [ADD_TODOLIST]: ({ state, commit }: ActionContext<State, unknown>, data: { [k: string]: any }): void => {
    data.id = Tool.uniqueId()
    commit(ADD_TODOLIST, data as TodoList)
    localStorage.setItem(STORAGE_NAME, JSON.stringify(state.todoData))
  },

  [ADD_TODOITEM]: ({ state, commit }: ActionContext<State, unknown>, data: { [k: string]: any }): void => {
    data.id = Tool.uniqueId()
    commit(ADD_TODOITEM, data as TodoItem)
    localStorage.setItem(STORAGE_NAME, JSON.stringify(state.todoData))
  },

  [DELETE_TODOLIST]: ({ state, commit }: ActionContext<State, unknown>, index: number): void => {
    commit(DELETE_TODOLIST, index)
    localStorage.setItem(STORAGE_NAME, JSON.stringify(state.todoData))
  },

  [DELETE_TODOITEM]: ({ state, commit }: ActionContext<State, unknown>, index: number): void => {
    commit(DELETE_TODOITEM, index)
    localStorage.setItem(STORAGE_NAME, JSON.stringify(state.todoData))
  },
}

