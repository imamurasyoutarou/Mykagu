import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from './config/firebase';
import AuthenticationNavigator from './navigations/AuthenticationNavigator';
import 'react-native-gesture-handler';

firebase.initializeApp(firebaseConfig);

StatusBar.setBarStyle('white', true);

export default class App extends React.Component {




  componentWillMount() {
    this.loadFonts();
  }
  async loadFonts() {
    await Expo.Font.loadAsync({
      Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ isReady: true });
  }

  render() {
    return <AuthenticationNavigator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});