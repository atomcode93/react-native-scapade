import React from 'react'
import { Keyboard } from 'react-native'
import styled from 'styled-components/native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { sendMessage } from '../../redux/modules/Chat';
import _ from 'lodash'
import { GiftedChat } from 'react-native-gifted-chat'

//components
import ReportActions from '../../components/ReportActions'

class Chat extends React.Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {}
    return {
      // title: params.user ? params.user.fullname : '',
      headerRight: <ReportActions user={ params.user }/>
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      currentChat: null
    };
  }


  onSend(room, messages = []) {
    this.props.sendMessage({ room, messages })
    Keyboard.dismiss()
  }

  componentWillMount() {
    this.getCurrentChat();
  }

  componentWillReceiveProps(nextProps) {
    const { currentChat } = this.state;
    const { blockedUser } = nextProps;
    const chatPartner =  (currentChat || {}).user || {};
    if (chatPartner.id === blockedUser.id ) {
      this.setState({ currentChat: null });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentChat } = this.state;
    if (!currentChat && (currentChat !== prevState.currentChat)) {
      this.props.navigation.setParams({ user: null }) 
    }
  }

  render () {
    const { profile, chat, navigation: { state: { params: {room} } } } = this.props
    const { currentChat } = this.state
    //const messages = currentChat.messages.sort((a,b) => new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime())
    //const messages = [...currentChat.messages.reverse()]
    return (
      currentChat ?
      <GiftedChat
        messages={currentChat.reverted_messages}
        onSend={(messages) => this.onSend(room, messages)}
        user={{
          _id: profile._id
        }}
      /> : null
    )
  }

  getCurrentChat() {
    const { chat, navigation: { state: { params: {room} } } } = this.props
    const currentChat = chat.chats.find((c) => c.room === room)
    currentChat && this.props.navigation.setParams({ user: currentChat.user })
    this.setState({ currentChat: currentChat })
  }
}
const mapStateToProps = state => ({
  profile: state.user.profile,
  chat: state.chat,
  blockedUser: state.match.blockedUser
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendMessage
   },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Chat)
