import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Dimensions } from 'react-native';
import { createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import AppIntroSlider from 'react-native-app-intro-slider';
import SignUp from './SignUp'
import Login from './Login'
import forgot from './forgot'
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;


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
    signup: {
        screen: SignUp,
        navigationOptions: {
            ...headerNavigationOptions,
            title: '',
            headerTransparent: true,
            headerBackTitle: null,
        }
    },
    login: {
        screen: Login,
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
    },

}))


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {

            show_Main_App: false

        };
    }





    on_Done_all_slides = () => {
        this.setState({ show_Main_App: true });
    };

    on_Skip_slides = () => {
        this.setState({ show_Main_App: true });
    };
    render() {
        if (this.state.show_Main_App) {
            return (
                <SignLogin />
            );
        } else {
            return (
                <AppIntroSlider
                    slides={slides}
                    onDone={this.on_Done_all_slides}
                    showSkipButton={true}
                    onSkip={this.on_Skip_slides}
                    buttonTextStyle={{ color: 'white' }}

                />
            );
        }
    }
}
const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#56BD9A'

    },

    image: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    }
});

const slides = [
    {
        key: 'k',
        image: require('../assets/topguide.png'),
        padding: 10,
        imageStyle: styles.image,
        backgroundColor: '#56BD9A'
    },
    {
        key: 'k1',

        image: require('../assets/guide.png'),
        imageStyle: styles.image,
        backgroundColor: '#56BD9A'


    },
    {
        key: 'k2',

        image: require('../assets/guide2.png'),

        imageStyle: styles.image,
        backgroundColor: '#56BD9A'

    },
    {
        key: 'k3',

        image: require('../assets/guide3.png'),

        imageStyle: styles.image,
        backgroundColor: '#56BD9A'

    },
    {
        key: 'k4',

        image: require('../assets/guide4.png'),
        imageStyle: styles.image,
        backgroundColor: '#56BD9A'

    },

];