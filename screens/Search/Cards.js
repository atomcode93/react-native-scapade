import React from 'react'
import styled from 'styled-components/native'
import { Image } from 'react-native'
import { AppLoading, Asset } from 'expo'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUsers, matchAccept, matchDecline } from '../../redux/modules/Match'

import Modal from 'react-native-modal'
import Swiper from 'react-native-deck-swiper'
import Loader from './Loader'
import Button from '../../components/Button'
import Card from '../../components/Card'
import ReportActions from '../../components/ReportActions'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

class Cards extends React.Component {
  static navigationOptions = ({navigation}) => {
    const params = navigation.state.params || {}
    return {
      title: 'Browsing',
      headerRight: <ReportActions user={ params.user }/>
    }
  }


  state = {
    isReady: false,
    swipedAll: false,
    isModalVisible: true
  }

  async _loadAssetsAsync() {
    const photos = this.props.users.map(user => {
      return user.avatar
    })

    const imageAssets = cacheImages(photos)

    await Promise.all([...imageAssets])
  }

  componentWillMount() {
    console.log('cards, fetching users, component will mount')
    this.props.fetchUsers()
  }

  componentWillReceiveProps(nextProps) {
    
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps);
    console.log('props', this.props);
    this._updateNavigationParams(prevProps);
    if (this.props.matchResult.mutual !== prevProps.matchResult.mutual) {
      console.log('YOO')
      this.setState({
        isModalVisible: true
      })
    }
  }

  onSwipedAll = () => {
    this.setState({
      swipedAll: true
    })
  }

  hideModal = () => this.setState({ isModalVisible: false })

  onSendMessage = () => {
    this.props.navigation.navigate('Messages', { reload: true })
    this.hideModal()
  }

  render() {
    const { users, usersLoading, matchResult, matchAccept, matchDecline } = this.props
    const { swipedAll, isModalVisible } = this.state

    if (usersLoading) {
      <Loader />
    }

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    if ((swipedAll || users.length === 0)) {
      return (
        <Container>
          <NoUsers>No users found</NoUsers>
          {
            matchResult && matchResult.user && matchResult.mutual === true &&
            <Modal isVisible={isModalVisible}>
              <ModalView>
                <Title>Good News!</Title>
                <Avatar source={{ uri: matchResult.user.avatar }} />
                <Wants><Name>{matchResult.user.firstname}</Name> wants to go on a Scapade with you!</Wants>
                <ButtonWrapper>
                  <Button text="Send a message" onPress={() => this.onSendMessage()} />
                </ButtonWrapper>
                <Button text="Keep browsing" onPress={() => this.hideModal()} />
              </ModalView>
            </Modal>
          }
        </Container>
      )
    }

    return (
      <Container>
        <Swiper
          cards={users}
          renderCard={data => <Card data={data} /> }
          onSwipedLeft={cardIndex => matchDecline(users[cardIndex].id)}
          onSwipedRight={cardIndex => matchAccept(users[cardIndex].id)}
          onSwipedAll={() => this.onSwipedAll()}
          cardIndex={0}
          backgroundColor="rgb(233, 233, 239)"
          marginTop={-30}
          verticalSwipe={false}>
        </Swiper>
        {
          matchResult && matchResult.user && matchResult.mutual === true &&
          <Modal isVisible={isModalVisible}>
            <ModalView>
              <Title>Good News!</Title>
              <Avatar source={{ uri: matchResult.user.avatar }} />
              <Wants><Name>{matchResult.user.firstname}</Name> wants to go on a Scapade with you!</Wants>
              <ButtonWrapper>
                <Button text="Send a message" onPress={() => this.onSendMessage()} />
              </ButtonWrapper>
              <Button text="Keep browsing" onPress={() => this.hideModal()} />
            </ModalView>
          </Modal>
        }
      </Container>
    )
  }

  _updateNavigationParams(prevProps) {
    const prevUsers = prevProps.users;
    const { users, navigation} = this.props;
    if (prevUsers !== users) {
      const navParams = navigation.state.params || {};
      if (navParams.user !== users[0]) { 
        navigation.setParams({ user: users[0]}) 
      }
    }
  }
}

const mapStateToProps = state => ({
  users: state.match.users,
  usersLoading: state.match.usersLoading,
  matchResult: state.match.matchResult
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUsers,
      matchAccept,
      matchDecline
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Cards)

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 16px;
`

const NoUsers = styled.Text`
  font-size: 16px;
`

const ModalView = styled.View`
  background: #FFF;
  border-radius: 8px;
  padding: 32px 16px;

  justify-content: center;
  align-items: center;
`

const Title = styled.Text`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 40px;
`

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
  border-radius: 50px;
`

const Name = styled.Text`
  font-weight: 600;
`

const Wants = styled.Text`
  font-size: 16px;
  text-align: center;
  width: 80%;
  margin-bottom: 40px;
`

const ButtonWrapper = styled.View`
  margin-bottom: 16px;
  width: 100%;
`
