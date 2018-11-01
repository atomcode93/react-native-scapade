import React from 'react'
import { StyleSheet } from 'react-native'
import styled from 'styled-components/native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addActivity, removeActivity } from '../../redux/modules/User'

import Activity from '../../components/Activity'
import Button from '../../components/Button'

const listOfActivities = [
  {
    type: 'sport',
    text: 'Sports'
  },
  {
    type: 'games',
    text: 'Games'
  },
  {
    type: 'food',
    text: 'Food & Drinks'
  },
  {
    type: 'attractions',
    text: 'Attractions'
  },
  {
    type: 'classes',
    text: 'Workshops'
  },
  {
    type: 'nightlife',
    text: 'Nightlife'
  },
  {
    type: 'performance',
    text: 'Performances'
  },
  {
    type: 'causes',
    text: 'Causes'
  },
  {
    type: 'shopping',
    text: 'Shopping'
  },
]

class Activities extends React.Component {
  static navigationOptions = {
    title: 'Activities',
  }

  render () {
    const {
      navigation: {
        goBack,
      },
      activities,
      addActivity,
      removeActivity
    } = this.props

    const styles = StyleSheet.create({
      activitiesShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
      }
    })

    return (
      <Container>
        <Content>
          <Headline>
            <Logo source={require('../../assets/logo-without-text.png')} />
            <Title>
              Select Your Interests
            </Title>
          </Headline>
          <ActivitiesList style={styles.activitiesShadow}>
            {
              listOfActivities.map((item, index) => (
                <Activity
                  disabled={!activities.includes(item.type) && activities.length >= 3}
                  onChange={(checked) => { checked ? addActivity(item.type) : removeActivity(item.type) } }
                  checked={activities.includes(item.type)}
                  text={item.text}
                  icon={item.type}
                  key={index} />
              ))
            }
          </ActivitiesList>
          <Button
            text="Save"
            onPress={() => goBack()} />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  activities: state.user.profile.activities
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addActivity,
      removeActivity
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Activities)

const Container = styled.ScrollView`
  flex: 1;
  background: rgb(233, 233, 239)§;
`

const Content = styled.View`
  flex: 1;
  padding: 24px 16px;
`

const Headline = styled.View`
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const ActivitiesList = styled.View`
  border-radius: 4px;
  background: #fff;
  margin: 16px 0 32px;
  padding: 24px 16px 0;
  flex-flow: row wrap;
  justify-content: space-between;
`

const Title = styled.Text`
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
`

const Logo = styled.Image`
  margin-bottom: 16px;
  height: 56px;
  width: 56px;
`
