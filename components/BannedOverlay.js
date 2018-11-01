import React from 'react'
import styled from 'styled-components/native'
import { Alert } from 'react-native'
import moment from 'moment';
 
 
export default class BannedOverlay extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    const isBanned = user.bannedUntil && (Date.parse(user.bannedUntil) > Date.now());
    if (!isBanned) { return null };
    return (
      <Placeholder visible={ true } transparent animationType='fade' >
        <PlaceholderOverlay>
          { this.showAlert(user) }
        </PlaceholderOverlay>
      </Placeholder>
    )
  }

  showAlert(user) {
    Alert.alert(
      'You are banned',
      'Ending: ' + moment(Date.parse(user.bannedUntil)).format('MM/DD/YYYY h:mm A'),
      [],
      { cancelable: false }
    );
  }
}


const Placeholder = styled.Modal`
`;

const PlaceholderOverlay = styled.TouchableOpacity`
  flex: 1;
`;
