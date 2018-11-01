import React from 'react'
import styled from 'styled-components/native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Alert } from 'react-native'

import BannedOverlay from './BannedOverlay'

const TabBarTop = ({ navigation, user }) => {
  console.log('user', user)
  
  return (
    <TabBar style={styles.tabBar}>
      <Link onPress={() => navigation.navigate('ProfileTab')}>
        <AvatarIcon source={{ uri: user.avatar }} resizeMode="cover" />
        <Text>Profile</Text>
      </Link>
      <Link onPress={() => navigation.navigate('SearchTab')}>
        <LinkIconWrapper>
          <LinkIcon source={require('../assets/icons/compass.png')} resizeMode="contain"/>
        </LinkIconWrapper>
        <Text>Search</Text>
      </Link>
      <Link onPress={() => navigation.navigate('ChatTab')}>
        <LinkIconWrapper>
          <LinkIcon source={require('../assets/icons/message.png')} resizeMode="contain"/>
        </LinkIconWrapper>
        <Text>Chat</Text>
      </Link>
      <BannedOverlay user={ user } />
    </TabBar>
  )
}

const mapStateToProps = state => ({
  user: state.user.profile
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(TabBarTop)

const styles = StyleSheet.create({
  tabBar: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  }
})

const AvatarIcon = styled.Image `
  height: 34px;
  width: 34px;
  border-radius: 18px;
  borderWidth: 2px;
  border-color: #5AC6D1;
`

const TabBar = styled.View`
  padding: 12px 16px;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const Link = styled.TouchableOpacity`
  width: 33.33%;
  justify-content: center;
  align-items: center;
`

const LinkIconWrapper = styled.View`
  height: 36px;
  width: 36px;
  border-radius: 18px;
  justify-content: center;
  align-items: center;
`

const LinkIcon = styled.Image`
  width: 100%;
  height: 100%;
`

const Text = styled.Text `
  margin-top: 3px;
  margin-bottom: -3px;
  color: #5AC6D1;
`