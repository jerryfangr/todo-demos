import { useStore } from 'vuex'
import { State } from '@/store'
import { 
  Getters, 
  Dispatch, 
  Commit 
} from '@/store/modules/types'

interface StoreHooks {
  state: State
  getters: Getters
  dispatch: Dispatch
  commit: Commit
}

const useTodoStore = () => {
  const { state, getters, dispatch, commit}: StoreHooks = useStore<State>();
  return { state, getters, dispatch, commit }
}

export default useTodoStore
export { useTodoStore }