import React from 'react'
import styled from 'styled-components/native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Image } from 'react-native'
import { AppLoading, Asset } from 'expo';
import { editLocation } from '../../redux/modules/Match'

import Button from '../../components/Button'

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

class Location extends React.Component {
  static navigationOptions = {
    title: 'Select Location',
    // tabBarVisible: false
  }

  state = {
    isReady: false
  }

  async _loadAssetsAsync () {
    const imageAssets = cacheImages([
      require('../../assets/new-york.jpg'),
      require('../../assets/london.jpg'),
      require('../../assets/rome.jpg')
    ]);

    await Promise.all([...imageAssets]);
  }

  handleCityPress(city) {
    const { navigation: { navigate }, editLocation } = this.props

    navigate('SearchCards')
    editLocation(city)
  }

  render () {

    const styles = StyleSheet.create({
      townShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
      }
    })

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Container>
        <Wrapper>
          <Town style={styles.townShadow} onPress={() => this.handleCityPress('New York')}>
            <TownPhoto source={require('../../assets/new-york.jpg')} resizeMode="cover" />
            <TownTitle>NEW YORK</TownTitle>
          </Town>
          <Town disabled style={styles.townShadow} onPress={() => this.handleCityPress('London')}>
            <TownPhoto source={require('../../assets/london.jpg')} resizeMode="cover" />
            <TownTitle>LONDON</TownTitle>
          </Town>
          <Town disabled style={styles.townShadow} onPress={() => this.handleCityPress('Rome')}>
            <TownPhoto source={require('../../assets/rome.jpg')} resizeMode="cover" />
            <TownTitle>ROME</TownTitle>
          </Town>
        </Wrapper>
      </Container>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editLocation
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(Location)

const Container = styled.ScrollView`
  flex: 1;
`

const Wrapper = styled.View`
  padding: 24px 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Town = styled.TouchableOpacity`
  margin-bottom: 32px;
  opacity: ${props => props.disabled ? '0.4' : '1'};
  width: 80%;
  height: 200px;
  position: relative;
  justify-content: center;
  align-items: center;
`

const TownPhoto = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const TownTitle = styled.Text`
  background: #5AC6D1;
  padding: 8px 16px;
  font-size: 16px;
`
