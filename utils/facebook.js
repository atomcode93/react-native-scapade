import { Facebook } from 'expo'

const facebookAppId = '2032429613643619'
const permissions = ['public_profile', 'email', 'user_friends', 'user_location', 'user_birthday']

export function login () {
  return Facebook.logInWithReadPermissionsAsync(facebookAppId, {
    permissions
  })
}