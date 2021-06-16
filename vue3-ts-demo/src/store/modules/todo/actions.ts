import { ActionContext } from "vuex"
import { LOAD_DATA, UPDATE_DATA, SAVE_DATA } from "./constants"
import { State } from "./state"
import { STORAGE_NAME } from '@/constants'
import TodoList from "./types"

export default {
  [UPDATE_DATA]: ({ commit }: ActionContext<State, unknown>, data: TodoList[]): void => {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(data))
    commit(UPDATE_DATA, data)
  },

  [LOAD_DATA]: ({ commit }: ActionContext<State, unknown>): void => {
    const localData = localStorage.getItem(STORAGE_NAME)
    if (localData) {
      commit(LOAD_DATA, JSON.parse(localData))
    }
  }
}

