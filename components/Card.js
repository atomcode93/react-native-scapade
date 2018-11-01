import React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'

import SmallActivity from './SmallActivity'

export default class Card extends React.Component {
  render () {
    const { data } = this.props

    const styles = StyleSheet.create({
      card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
      }
    })
    
    return (
      <CardView style={styles.card}>
        <PhotoWrapper style={styles.photo}>
          <Photo source={{ uri: data.avatar, cache: 'force-cache' }} />
        </PhotoWrapper>
        <Information>
          <Name>{data.firstname}, <Age>{data.age}</Age></Name>
          <Description>{data.bio}</Description>
          <Activities>
            {
              data.activities.map((activity, index)=> (
                <SmallActivity key={index} icon={activity} />
              ))
            }
          </Activities>
        </Information>
      </CardView>
    )
  }
}

const CardView = styled.View`
  border-radius: 6px;
  justify-content: center;
  background: #FFFFFF;
`

const PhotoWrapper = styled.View`
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  overflow: hidden;
`

const Photo = styled.Image`
  overflow: hidden;
  height: 320px;
  width: 100%;
`

const Information = styled.View`
  padding: 16px 16px;
`

const Name = styled.Text`
  font-size: 22px;
`

const Age = styled.Text`
  font-size: 20px;
  font-weight: 800;
`

const Description = styled.Text`
  margin-top: 8px;
  color: #4A4A4A;
`

const Activities = styled.View`
  margin-top: 24px;
  flex-flow: row wrap;
`

const Activity = styled.Text`

`
