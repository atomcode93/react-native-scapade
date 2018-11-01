import React from 'react'
import styled from 'styled-components/native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchUsers } from '../../redux/modules/Match'

import Button from '../../components/Button'

class Start extends React.Component {
  static navigationOptions = {
    header: null
  }

  startSearch = () => {
    // this.props.navigation.navigate('SearchingProgress')
    this.props.navigation.navigate('SearchCards')
    // this.props.fetchUsers()
  }

  render () {
    const { navigation, fetchUsers } = this.props

    return (
      <Container>
        <Logo source={require('../../assets/logo.png')} resizeMode="contain" />
        <Button
          text="Start Search"
          onPress={() => this.startSearch()} />
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUsers
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Start)

const Container = styled.View`
  padding: 16px;
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Logo = styled.Image`
  height: 200px;
  width: 200px;
  margin-top: 24px;
  margin-bottom: 56px;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
`
