import { NavigationActions } from 'react-navigation'

export default {
  container: null,

  setContainer(container) {
    this.container = container
  },

  navigate(routeName, params) {
    this.container.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    )
  },

  goBack(key) {
    this.container.dispatch(
      NavigationActions.back({
        key
      })
    )
  }
}
