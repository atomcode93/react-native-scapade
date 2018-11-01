import React from 'react'
import styled from 'styled-components/native'
import { UIManager, findNodeHandle, Dimensions, Alert } from 'react-native'
//redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { matchBlock, matchReport } from '../redux/modules/Match'

class ReportActions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      actionsSize: {}
    };
    this._button = null;
    this._buttonOffset = null;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  render() {
    const { isOpen } = this.state;
    const { user } = this.props;
    console.log('REPORTACTIONS USER', user);
    if (!user) { return null };
    return (
      <Wrapper>
        <TriggerButton onPress={ this.open } ref={ btn => this._button = btn}>
          <Icon source={require('../assets/icons/flag.png')} resizeMode="contain"/>
        </TriggerButton>

        <Menu visible={ isOpen } transparent animationType='fade' >
          <MenuOverlay onPress={ this.close }>
            <ActionsWrapper style={ this.getPosition() } onLayout={ (e) => this.getActionsSize(e) }>
              <ActionButton onPress={ () => this._handleReport(user) }><Text>Report</Text></ActionButton>
              <ActionButton onPress={ () => this._handleBlock(user) }><Text>Block</Text></ActionButton>
            </ActionsWrapper>
          </MenuOverlay>
        </Menu>
      </Wrapper>

    )
  }

  _handleBlock(user) {
    console.log('BLOCK USER', user);
    this.close();
    Alert.alert(
      'Block User',
      user.fullname,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Submit', onPress: () => this.props.matchBlock(user.id) }
      ],
      { cancelable: true }
    );
  }

  _handleReport(user) {
    console.log('REPORT USER', user);
    this.close();
    Alert.alert(
      'Report User',
      user.fullname,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Submit', onPress: () => this.props.matchReport(user.id) }
      ],
      { cancelable: true }
    );
  }


  getPosition() {
    const { actionsSize } = this.state;
    // const dimensions    = Dimensions.get('window');
    // const windowWidth   = dimensions.width;
    // const windowHeight  = dimensions.height;
    // const actionsHeight = actionsSize.height || 0;
    const actionsWidth  = actionsSize.width || 0;
    const styles = {};
    if (this._buttonOffset) {
      styles.top = this._buttonOffset.y;
      styles.left = this._buttonOffset.x - actionsWidth + this._buttonOffset.w;
    }

    return styles;
  }

  getActionsSize(e) {
    this.setState({ actionsSize: e.nativeEvent.layout });
  }

  getButtonOffset(callback) {
    UIManager.measure(findNodeHandle(this._button), (x, y, w, h, px,py) => {
      this._buttonOffset = {x: px, y: py, w: w, h: h};
      callback && callback();
    })
  }


  open(state) {
    this.getButtonOffset(() => {
      this.setState({ isOpen: true });
    });
  }

  close() {
    this.setState({ isOpen: false });
  }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      matchReport,
      matchBlock
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ReportActions)

const Wrapper = styled.View`
  position: relative;
  height: 24px;
  width: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-right: 16px;
`

const TriggerButton = styled.TouchableOpacity`
  height: 100%;
  width: 100%;
`

const Icon = styled.Image`
  width: 100%;
  height: 100%;
`

const Menu = styled.Modal`
`;

const MenuOverlay = styled.TouchableOpacity`
  flex: 1;
`;

const ActionsWrapper = styled.View`
  position: absolute;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #fff;
  shadow-opacity: 0.15;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-radius: 5px;
`

const ActionButton = styled.TouchableOpacity`
  padding: 10px;
  min-width: 100px;
`

const Text = styled.Text`
`
