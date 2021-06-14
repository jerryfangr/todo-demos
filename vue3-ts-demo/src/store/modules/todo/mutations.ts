import { LOAD_DATA, UPDATE_DATA } from "./constants";
import { State } from "./state";

export default {
  [UPDATE_DATA]: (state: State, data: any[]) => {
    state.todoData = data
  }
}

