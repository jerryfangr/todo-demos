import { useStore } from 'vuex'
import { State } from '@/store'

interface Store {
  state: State
  getters: any
  dispatch: any
  commit: any
}

const useTodoStore = () => {
  const { state, getters, dispatch, commit}: Store = useStore<State>();
  return { state, getters, dispatch, commit }
}

export default useTodoStore
export { useTodoStore }