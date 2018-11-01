import React from 'react'
import styled from 'styled-components/native'
import { AsyncStorage, ActivityIndicator } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { updateFocus, getCurrentRouteKey } from '@patwoz/react-navigation-is-focused-hoc'

import { Provider } from 'react-redux'
import configureStore from './redux/store'

import InitialScreen from './screens/Login/InitialScreen'
import Terms from './screens/Login/Terms'

import Profile from './screens/Profile/Profile'
import Activities from './screens/Profile/Activities'
import SelectLocation from './screens/Profile/SelectLocation'

import SearchLoader from './screens/Search/Loader'
import SearchCards from './screens/Search/Cards'
import SearchStart from './screens/Search/Start'
import SearchLocation from './screens/Search/Location'
import SearchActivities from './screens/Search/Activities'

import Messages from './screens/Chat/Messages'
import Chat from './screens/Chat/Chat'

import TabBarTop from './components/TabBarTop'

import NavigatorService from './utils/NavigatorService'

import { loadSession } from './redux/modules/User'

const LoginNavigation = StackNavigator({
  InitialScreen: { screen: InitialScreen },
  Terms: { screen: Terms }
}, {
  mode: 'modal',
  headerMode: 'screen',
  swipeEnabled: false
})

const ProfileNavigation = StackNavigator({
  Profile: { screen: Profile },
  Activities: { screen: Activities },
  SelectLocation: { screen: SelectLocation }
}, {
  headerMode: 'screen',
  swipeEnabled: false
})

const SearchNavigation = StackNavigator({
  SearchStart: { screen: SearchStart },
  // SearchLoader: { screen: SearchLoader },
  // SearchActivities: { screen: SearchActivities },
  // SearchLocation: { screen: SearchLocation },
  SearchCards: { screen: SearchCards }
}, {
  headerMode: 'screen',
  swipeEnabled: false
})

const ChatNavigation = StackNavigator({
  Messages: { screen: Messages },
  Chat: { screen: Chat },
}, {
  headerMode: 'screen',
  swipeEnabled: false
})

const TabNavigation = TabNavigator({
  LoginTab: { screen: LoginNavigation },
  ProfileTab: { screen: ProfileNavigation },
  SearchTab: { screen: SearchNavigation },
  ChatTab: { screen: ChatNavigation }
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarTop,
  swipeEnabled: false,
  animationEnabled: false
})

const store = configureStore()

export default class App extends React.Component {
  componentDidMount () {
    store.dispatch(loadSession())
  }

  render () {
    return (
      <Provider store={store}>
        <TabNavigation 
          onNavigationStateChange={(prevState, currentState) => {
                    // If you want to ignore the state changed from `DrawerNavigator`, use this:
                    /*
                      if (/^Drawer(Open|Close|Toggle)$/.test(getCurrentRouteKey(newState)) === false) {
                        updateFocus(newState);
                        return;
                      }
                    */

                    updateFocus(currentState)
                  }}
          ref={navigatorRef => NavigatorService.setContainer(navigatorRef)} />
      </Provider>
    )
  }
}

