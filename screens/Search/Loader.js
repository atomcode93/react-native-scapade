import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'

class Loader extends React.Component {
  render () {
    return (
      <Container>
        <Clickable>
          <ActivityIndicator size="large" color="#5AC6D1" />
          <LoadingText>
            Please wait while we find people in your area
          </LoadingText>
        </Clickable>
      </Container>
    )
  }
}

export default Loader

const Container = styled.View`
  flex: 1;
  padding: 0px 16px;
`

const Clickable = styled.View`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const LoadingText = styled.Text`
  margin-top: 20px;
  max-width: 200px;
  text-align: center;
`
