import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Designer from './Designer'
import Latest from './Latest'
import Craftsman from './Craftsman'
import { ScrollableTabView, ScrollableTabBar } from '@valdio/react-native-scrollable-tabview'


const SCREEN_height = Dimensions.get('window').height; // Window height
class HomeScreen extends React.Component {
    state = {
        style: null
    };


    componentWillMount() {
        if (SCREEN_height > 800) {
            this.setState({
                style: 44
            });
        } else {
            this.setState({
                style: 24
            });
        }
    }



    render() {

        return (
            <View style={{ flex: 1, marginTop: this.state.style, marginBottom: 24, backgroundColor: 'white' }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        style={{ width: 100, height: 20 }}
                        source={require('../assets/Hometop.png')}
                        resizeMode='stretch'
                    />
                </View>

                <ScrollableTabView
                    initialPage={1}
                    // renderTabBar={() => <ScrollableTabView />}
                    tabBarUnderlineStyle={{ backgroundColor: '#56BD9A' }}
                    tabBarInactiveTextColor={'#E5E5E5'}
                    tabBarActiveTextColor={'#56BD9A'}
                    style={{}}
                >

                    <Craftsman tabLabel='家具職人' />
                    <Latest tabLabel='最新' />
                    <Designer tabLabel='デザイナー' />

                </ScrollableTabView>
            </View >
        )
    }
}


export default HomeScreen;