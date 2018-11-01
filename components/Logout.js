import React from 'react'
import styled from 'styled-components/native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { logout } from '../redux/modules/User'

const Logout = ({ logout }) => (
  <LogoutView onPress={logout}>
    <LogoutViewText>Logout</LogoutViewText>
  </LogoutView>
)

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Logout)

const LogoutView = styled.TouchableOpacity`
  padding-right: 16px;
`

const LogoutViewText = styled.Text`
  color: #5AC6D1;
`