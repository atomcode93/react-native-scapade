import React from 'react'
import styled from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from '../../components/Button'

import { post, put as putRequest, setupToken, resetToken } from '../../utils/requests'

import { login } from '../../redux/modules/User'
import { sendNotification } from '../../redux/modules/System'

class InitialScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarVisible: false
  }

  componentDidMount() {
    // this.props.sendNotification()
  }

  render () {
    const { navigation, login, appInitialized, isLoading } = this.props

    if (!appInitialized && isLoading) {
      return (
        <Preloader>
          <LogoSmall source={require('../../assets/logo-without-text.png')} resizeMode="contain" />
          <ActivityIndicator size="large" color="#5AC6D1" />
        </Preloader>
      )
    }

    return (
      <Wrapper>
        <Background source={require('../../assets/home.jpg')} resizeMode="cover" />
        <Container>
          <Row>
            <Logo source={require('../../assets/logo-without-text.png')} resizeMode="contain"/>
            <Title>Meet in the middle</Title>
          </Row>
          <Row>
            <Button
              text="Facebook Login / Sign Up"
              login
              onPress={login} />
            <Footer>
              By singing up you agree to ou <TermsOfUse onPress={() => navigation.navigate('Terms')}>Terms of Use</TermsOfUse>
            </Footer>
          </Row>
        </Container>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  appInitialized: state.user.appInitialized,
  isLoading: state.user.isLoading
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
      sendNotification
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen)

const Preloader = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const LogoSmall = styled.Image`
  height: 100px;
  width: 100px;
  margin-bottom: 50px;
`

const Wrapper = styled.View`
  position: relative;
`

const Background = styled.Image`
  height: 100%;
  width: 100%;
`

const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 16px;
  flex: 1;
  justify-content: space-between;
`

const Row = styled.View`
  width: 100%;
  align-items: center;
`

const Logo = styled.Image`
  height: 200px;
  width: 200px;
  margin-top: 24px;
  margin-bottom: 16px;
`

const Title = styled.Text`
  margin-bottom: 50px;
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  background: rgba(0, 0, 0, 0);
`

const Footer = styled.Text`
  margin-top: 16px;
  color: #FFFFFF;
  background: rgba(0, 0, 0, 0);
`

const TermsOfUse = styled.Text`
  font-weight: 700;
`
