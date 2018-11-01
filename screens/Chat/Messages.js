import React from 'react'
import styled from 'styled-components/native'
import _ from 'lodash'
import { ActivityIndicator } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchMatches } from '../../redux/modules/Match'
import { joinChat, startChannel, stopChannel } from '../../redux/modules/Chat';
import { withNavigationFocus } from '@patwoz/react-navigation-is-focused-hoc'

import ChatActivity from '../../components/ChatActivity'
import Button from '../../components/Button'

function cutMessage (message) {
  return message.length > 40 ? message.split('').slice(0, 37).join('') + '...' : message
}

class Messages extends React.Component {
  static navigationOptions = {
    title: 'Messages'
  }

  // static propTypes = {
  //     isFocused: PropTypes.bool.isRequired,
  //     focusedRouteKey: PropTypes.string.isRequired,
  //   };

  componentWillReceiveProps(nextProps) {
    if ((!this.props.isFocused && nextProps.isFocused)
      || (this.props.navigation.state.params && this.props.navigation.state.params.reload)) {
      // screen enter (refresh data, update ui ...)
      this.props.navigation.state.params = {}
      this.props.fetchMatches()
    }

    if (this.props.isFocused && !nextProps.isFocused) {
      // screen exit
    }
  }

  shouldComponentUpdate(nextProps) {
    // Update only once after the screen disappears
    if (this.props.isFocused && !nextProps.isFocused) {
      return true;
    }

    // if (this.props.isL && !nextProps.isFocused) {
    //   return true;
    // }

    // Don't update if the screen is not focused
    if (!this.props.isFocused && !nextProps.isFocused) {
      return false;
    }

    // Update the screen if its re-enter
    return (!this.props.isFocused && nextProps.isFocused) || (this.props.isLoading !== nextProps.isLoading);
  }

  componentDidUpdate (prevProps) {
    if(this.props.token !== prevProps.token) {
      this.props.fetchMatches()
      this.props.startChannel()
    }
  }

  handleDialogPress (room) {
    const { navigation: { navigate }, joinChat } = this.props

    joinChat(room)
    navigate('Chat', { room })
  }

  render () {
    let { navigation, matches, chats, isLoading, startChannel, stopChannel } = this.props

    if (isLoading) {
      return (
        <Preloader>
          <ActivityIndicator size="large" color="#5AC6D1" />
        </Preloader>
      );
    }

    return (
      <MessagesView>
        <List>
          {
            !isLoading && chats.length > 0 && chats.map(({user, messages, room}, index) => (
              <Dialog onPress={() => this.handleDialogPress(room)} key={index}>
                <Photo source={{ uri: user.avatar }} resizeMode="cover" />
                <Information>
                  <Header>
                    <Name>{user.firstname}</Name>
                    <Activities>
                      {
                        user.activities.map((activity, index) => (
                          <ChatActivity icon={activity} key={index} />
                        ))
                      }
                    </Activities>
                  </Header>
                  <Message>{cutMessage((messages && messages.length > 0 && messages.slice(-1)[0].text ) || '' )}</Message>
                </Information>
              </Dialog>
            ))
          }
        </List>
      </MessagesView>
    )
  }
}

const mapStateToProps = state => ({
  matches: state.match.matches,
  chats: state.chat.chats,
  isLoading: state.chat.isLoading,
  token: state.user.token
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchMatches,
      startChannel,
      stopChannel,
      joinChat
    },
    dispatch
  )

const areStatesEqual = (next, prev) => {
  _.isEqual(next, prev)
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false, areStatesEqual })(withNavigationFocus(Messages))

const Preloader = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const MessagesView = styled.ScrollView`
  flex: 1;
`

const List = styled.View`
  padding: 24px 0px;
  flex: 1;
`

const Dialog = styled.TouchableOpacity`
  padding: 8px 16px;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: 4px;
`

const Photo = styled.Image`
  height: 56px;
  width: 56px;
  border-radius: 28px;
`

const Information = styled.View`
  margin-left: 16px;
  flex: 1;
`

const Header = styled.View`
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const Name = styled.Text`
  font-weight: 600;
  color: #4A4A4A;
  font-size: 16px;
`

const Message = styled.Text`
  color: #9B9B9B;
  font-size: 14px;
`

const Activities = styled.View`
  flex: 1;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
`
