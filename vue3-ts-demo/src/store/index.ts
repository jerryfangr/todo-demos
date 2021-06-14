import { createStore } from "vuex"
import modules from "./modules"
import { State as TodoState } from './modules/todo/state'
import { State as SceneState } from './modules/scene/state'

type State = {
  todo: TodoState,
  scene: SceneState
}

const store = createStore<State>({
  modules
})

export { State }
export default store