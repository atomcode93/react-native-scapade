import React from 'react'
import styled, { css } from 'styled-components/native'
import { prop, ifProp, switchProp } from 'styled-tools'

export default class Button extends React.Component {
  render () {
    const { text, small, medium, disabled, login, onPress } = this.props

    return (
      <ButtonView
        size={small ? 'small' : medium ? 'medium' : 'default'}
        disabled={disabled}
        onPress={disabled ? null : onPress}
      >
        { login && <Icon source={require('../assets/icons/facebook.png')} resizeMode="contain" /> }
        <ButtonText
          size={small ? 'small' : medium ? 'medium' : 'default'}
        >
          {text}
        </ButtonText>
      </ButtonView>
    )
  }
}

const Icon = styled.Image `
  width: 25px;
  height: 25px;
  margin-right: 8px;
`

const ButtonView = styled.TouchableOpacity`
  ${switchProp('size', {
    small: css`
    `,
    medium: css`
    `,
    default: css`
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `,
  })};
  width: ${ifProp({size: 'small'}, 'auto', '100%')};
  padding: ${switchProp('size', {
     small: '0px',
     medium: '8px',
     default: '16px'
   })};
  background-color: ${switchProp('size', {
     small: 'transparent',
     medium: '#5AC6D1',
     default: '#5AC6D1'
   })};

  ${ifProp('disabled', 'background-color: #CCC;', '')}

  border-radius: 4px;
`

const ButtonText = styled.Text`
  text-align: ${ifProp({size: 'small'}, 'center', 'center')};
  color: ${ifProp({size: 'small'}, '#5AC6D1', '#FFF')};

  ${switchProp('size', {
    small: css`
    `,
    medium: css`
      font-size: 14px;
      font-weight: 400;
    `,
    default: css`
      font-size: 18px;
      font-weight: 600;
    `,
   })};
`
