import React from 'react'
import styled from 'styled-components/native'

const renderIcon = (icon) => {
  switch (icon) {
    case 'attractions':
      return <ActivityIcon source={require('../assets/icons/attractions.png')} resizeMode="contain" />
    case 'causes':
      return <ActivityIcon source={require('../assets/icons/causes.png')} resizeMode="contain" />
    case 'classes':
      return <ActivityIcon source={require('../assets/icons/classes.png')} resizeMode="contain" />
    case 'food':
      return <ActivityIcon source={require('../assets/icons/food.png')} resizeMode="contain" />
    case 'games':
      return <ActivityIcon source={require('../assets/icons/games.png')} resizeMode="contain" />
    case 'location':
      return <ActivityIcon source={require('../assets/location.png')} resizeMode="contain" />
    case 'nightlife':
      return <ActivityIcon source={require('../assets/icons/nightlife.png')} resizeMode="contain" />
    case 'performance':
      return <ActivityIcon source={require('../assets/icons/performance.png')} resizeMode="contain" />
    case 'shopping':
      return <ActivityIcon source={require('../assets/icons/shopping.png')} resizeMode="contain" />
    case 'sport':
      return <ActivityIcon source={require('../assets/icons/sport.png')} resizeMode="contain" />
  }
}

export default class ChatActivity extends React.Component {
  render() {
    const { icon } = this.props

    return (
      <Container>
        {renderIcon(icon)}
      </Container>
    )
  }
}

const Container = styled.View`
  height: 24px;
  width: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-left: 8px;
`

const ActivityIcon = styled.Image`
  height: 100%;
  width: 100%;
`