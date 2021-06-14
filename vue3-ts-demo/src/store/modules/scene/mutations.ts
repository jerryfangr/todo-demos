import { State } from "./state"

export default {
  toggleDarkMode: (state: State, openDarkMode?: boolean) => {
    if (openDarkMode) {
      state.isDarkMode = openDarkMode
    } else {
      state.isDarkMode = !state.isDarkMode
    }
  }
}

