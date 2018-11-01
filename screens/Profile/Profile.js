import React from 'react'
import { StyleSheet, AsyncStorage } from 'react-native'
import styled from 'styled-components/native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { update, editLocation, editBio, editAvatarUrl } from '../../redux/modules/User'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Button from '../../components/Button'
import Activity from '../../components/Activity'
import Logout from '../../components/Logout'
import UploadImage from './UploadImage'

function capitalize (string) {
  return string[0].toUpperCase() + string.substring(1)
}

class Profile extends React.Component {
  static navigationOptions = {
    title: 'Profile',
    headerLeft: null,
    gesturesEnabled: false,
    headerRight: <Logout />
  }

  state = {
    isEditing: false
  }
   
  edit () {
    this.setState({
      isEditing: true
    })
  }

  save () {
    // this.props.update({ ...this.state.user })
    this.props.update(this.props.user)
    this.setState({
      isEditing: false
    })
  }


  render () {
    const { navigation, update, user, editBio, editLocation, editAvatarUrl } = this.props
    let { isEditing } = this.state
    
    const styles = StyleSheet.create({
      activitiesShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
      }
    })
    
    if (isEditing) {
      return (
        <KeyboardAwareScrollView
          extraScrollHeight={120}
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'>
          <Container>
            <UploadImage avatar={user.avatar} editAvatarUrl={editAvatarUrl}/>
            <Content>
              <Information>
                <Row>
                  <Title>LOCATION</Title>
                  <SelectCityRow>
                    <Title>{user.city ? user.city : '-'}</Title>
                    <Button small text="Select location" onPress={() => navigation.navigate('SelectLocation', { editLocation })} />
                  </SelectCityRow>
                </Row>
              </Information>
              <Row>
                <Title>TELL US ABOUT YOURSELF</Title>
                <Textarea
                  onChangeText={editBio}
                  value={user.bio}
                  underlineColorAndroid="rgba(0,0,0,0)"
                  placeholder="Something about you and your lifestyle" />
              </Row>
              <Row>
                <Title>SELECT YOUR INTERESTS</Title>
                <ActivitiesList>
                  {
                    user.activities &&
                    user.activities.map((activity, index) => (
                        <Activity disabled checked icon={activity} text={capitalize(activity)} key={index} />
                      ))
                  }
                  <AddActivity onPress={() => navigation.navigate('Activities')}>
                    <AddActivityIconWrapper>
                      <AddActivityIcon source={require('../../assets/plus.png')} />
                    </AddActivityIconWrapper>
                  </AddActivity>
                </ActivitiesList>
              </Row>
              <Button text="Save" onPress={() => this.save()} />
            </Content>
          </Container>
        </KeyboardAwareScrollView>
      )
    }

    return (
      <Container>
        <PhotoWrapper>
          {
            !isEditing &&
            <Edit onPress={() => this.edit()}>
                <EditIcon source={require('../../assets/settings.png')} />
              </Edit>
          }
          <Photo source={{ uri: user.avatar }} resizeMode="cover" />
        </PhotoWrapper>
        <Content>
          <Information>
            <Name>{user.firstname}{user.age && ','} <Age>{user.age}</Age></Name>
            {user.facebookLocation &&
            <Location>
              <LocationIcon source={require('../../assets/location.png')} />
              <LocationText>{user.facebookLocation}</LocationText>
            </Location>
            }
          </Information>
          {
            user.bio !== '' &&
            <Row>
                <Title>ABOUT YOURSELF</Title>
                <AboutYourself>{user.bio}</AboutYourself>
              </Row>
          }
          {
            user.activities &&
            <Row>
                <Title>YOUR INTERESTS</Title>
                <ActivitiesList>
                  {
                    user.activities.map((activity, index) => (
                      <Activity disabled checked icon={activity} text={capitalize(activity)} key={index} />
                    ))
                  }
                </ActivitiesList>
              </Row>
          }
          { user.city &&
          <Row>
            <Title>SELECTED LOCATION</Title>
            <SelectCityRow>
              <Title>{user.city ? user.city : '-'}</Title>
            </SelectCityRow>
          </Row>
          }
          <Button text="Fill out the profile" onPress={() => this.edit()} />
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.profile
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      update,
      editBio,
      editLocation,
      editAvatarUrl
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

const Container = styled.ScrollView`
  flex: 1;
`

const PhotoWrapper = styled.View`
  position: relative;
`

const ChangePhoto = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  background: #5AC6D1;
  padding: 8px;
  border-radius: 4px;
`

const ChangePhotoText = styled.Text`
  color: #FFF;
  font-size: 10px;
  font-weight: 800;
`

const Edit = styled.TouchableOpacity`
  position: absolute;
  top: 24px;
  right: 8px;
  z-index: 1;
`

const EditIcon = styled.Image`
  height: 24px;
  width: 24px;
`

const Photo = styled.Image`
  height: 300px;
  width: 100%;
`

const Content = styled.View`
  padding: 16px;
`

const Information = styled.View`
  /* margin-bottom: 32px; */
`

const Name = styled.Text`
  font-size: 22px;
`

const Age = styled.Text`
  font-size: 20px;
  font-weight: 800;
`

const Location = styled.View`
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: 32px;
`

const LocationText = styled.Text`
  font-size: 14px;
  margin-top: 4px;
  color: #a1a1a1;
`

const LocationIcon = styled.Image`
  margin-top: 4px;
  margin-right: 4px;
  height: 14px;
  width: 14px;
`

const Row = styled.View`
  margin-bottom: 16px;
`

const Title = styled.Text`
  font-size: 12px;
  font-weight: 600;
  color: #383838;
`

const ActivitiesList = styled.View`
  flex-flow: row wrap;
  margin: 24px 0 0;
`

const AddActivity = styled.TouchableOpacity`
  width: 33%;
  align-items: center;
  margin-bottom: 24px;
`

const AddActivityIconWrapper = styled.View`
  height: 60px;
  width: 60px;
  background: #5AC6D1;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  margin-bottom: 8px;
`

const AddActivityIcon = styled.Image`
  height: 25px;
  width: 25px;
`

const Textarea = styled.TextInput`
  margin-top: 8px;
  padding: 8px 16px;
  width: 100%;
  border-radius: 4px;
  borderWidth: 1px;
  borderColor: #5AC6D1;
  background: #fff;
`

const Input = styled.TextInput`
  margin-top: 8px;
  padding: 8px 16px;
  width: 100%;
  border-radius: 4px;
  borderWidth: 1px;
  borderColor: #5AC6D1;
  background: #fff;
`
const SelectCityRow = styled.View`
  flex-flow: row nowrap;
  padding: 8px 0 0 0;
  justify-content: space-between;
`

const RowContainer = styled.View`

`

const AboutYourself = styled.Text`
  font-size: 16px;
  margin-top: 8px;
`
