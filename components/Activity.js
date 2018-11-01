import React from 'react'
import styled from 'styled-components/native'

const renderIcon = (icon) => {
  switch(icon) {
    case 'attractions':
      return <ActivityIcon source={require('../assets/icons/attractions.png')} resizeMode="contain"/>
    case 'causes':
      return <ActivityIcon source={require('../assets/icons/causes.png')} resizeMode="contain"/>
    case 'classes':
      return <ActivityIcon source={require('../assets/icons/classes.png')} resizeMode="contain"/>
    case 'food':
      return <ActivityIcon source={require('../assets/icons/food.png')} resizeMode="contain"/>
    case 'games':
      return <ActivityIcon source={require('../assets/icons/games.png')} resizeMode="contain"/>
    case 'location':
      return <ActivityIcon source={require('../assets/location.png')} resizeMode="contain"/>
    case 'nightlife':
      return <ActivityIcon source={require('../assets/icons/nightlife.png')} resizeMode="contain"/>
    case 'performance':
      return <ActivityIcon source={require('../assets/icons/performance.png')} resizeMode="contain"/>
    case 'shopping':
      return <ActivityIcon source={require('../assets/icons/shopping.png')} resizeMode="contain"/>
    case 'sport':
      return <ActivityIcon source={require('../assets/icons/sport.png')} resizeMode="contain"/>
  }
}

export default class Activity extends React.Component {
  componentWillMount () {
    if (this.props.checked) {
      this.setState({
        checked: this.props.checked
      })
    }
  }

  state = {
    checked: false
  }

  onActivityClick = () => {
    const { onChange } = this.props
    const { checked } = this.state
    this.setState({
      checked: !checked
    })
    if (onChange) { onChange(!checked) }
  }

  render () {
    const { icon, text, disabled } = this.props
    const { checked } = this.state

    return (
      <Container activeOpacity={disabled ? 1 : 0.7} onPress={!disabled ? this.onActivityClick : () => {}}>
        <ActivityIconWrapper checked={checked}>
          {renderIcon(icon)}
        </ActivityIconWrapper>
        <ActivityTitle>{text}</ActivityTitle>
      </Container>
    )
  }
}


const Container = styled.TouchableOpacity `
  width: 33%;
  align-items: center;
  margin-bottom: 24px;
`

const ActivityIconWrapper = styled.View`
  height: 48px;
  width: 48px;
  opacity: ${props => props.checked ? '1' : '0.4'};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  margin-bottom: 8px;
`

const ActivityIcon = styled.Image`
  width: 100%;
  height: 100%;
`

const ActivityTitle = styled.Text`
  /* text-align: center; */
  font-size: 12px;
  font-weight: 600;
  color: #383838;
`
