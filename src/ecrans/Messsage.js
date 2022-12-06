import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

function GetFCMToke() {
  let fcmtoken = AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      let fcmtoken = messaging().getToken();
      if (fcmtoken) {
        AsyncStorage.setItem('fcmtoken', fcmtoken);
      } else {
      }
    } catch (error) {
      console.log(error, 'error in fcmtoken');
    }
  }
}
