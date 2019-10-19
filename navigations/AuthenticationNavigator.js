import React from 'react'
import { Platform } from 'react-native'
import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/Home';
import LoadingScreen from '../screens/Loading';
import SignUpScreen from '../screens/SignUp';
import LoginScreen from '../screens/Login';
import TopScreen from '../screens/TopScreen'
import forgot from '../screens/forgot'
import Slideguide from '../screens/Slideguide'

// 参考
// https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs


const headerNavigationOptions = {
    headerStyle: {
        marginTop: (Platform.OS === 'android' ? 24 : 0)
    },
    headerTitleStyle: { color: '#56BD9A' },
    headerTintColor: '#56BD9A',
    title: '',

    headerBackTitle: null
};//ヘッダーの見た目


const SignLogin = createAppContainer(createStackNavigator({
    SignUp: {
        screen: SignUpScreen,
        navigationOptions: {
            ...headerNavigationOptions,
            title: '',
            headerTransparent: true,
            headerBackTitle: null,
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            ...headerNavigationOptions,
            title: '',
            headerTransparent: true,
            headerBackTitle: null,
        }
    }, forgot: {
        screen: forgot,
        navigationOptions: {
            ...headerNavigationOptions,
            title: '',
            headerTransparent: true,
            headerBackTitle: null,
        }
    }
}))



const TopLevelNavigator = createSwitchNavigator(
    {
        Top: { screen: TopScreen },
        Slideguide: { screen: Slideguide },
        Sigup: { screen: SignLogin },
        Loading: { screen: LoadingScreen },
        Home: { screen: HomeScreen },

    },
    {
        initialRouteName: 'Loading'
    }
)


const AuthenticationNavigator = createAppContainer(TopLevelNavigator);

export default AuthenticationNavigator;