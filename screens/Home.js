import React from 'react';
import { View, Alert, StyleSheet, TouchableOpacity, Platform, Image, TouchableHighlight, Text } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import JoinScreen from './JoinScreen'
import HomeScreen from './HomeScreen';
import Latestdetails from './Latestdetails'
import ProfileScreen from './ProfileScreen';
import OrderScreen from './OrderScreen'
import OrderCheckScreen from './OrderCheckScreen'
import MyjobsScreen from './MyjobsScreen'
import Joinwork from './Joinwork'
import Thread1Screen from './Thread1Screen'
import ThreadaddScreen from './ThreadaddScreen'
import ProductionScreen from './ProductionScreen'
import NavigationService from '../navigations/NavigationService'
import OrderSelect from './OrderSelect'
import Explanation from './Explanation'
import ProfileNameedit from './NewNameedit'
import firebase from 'firebase'
import Setting2Screen from './Setting2Screen'
import Setting3Screen from './Setting3Screen'
import Delete from './Delete'
import ProjectEdit from './ProjectEdit'
import CalemdarEdit from './CarenderEdit'
import ThreadEdit from "./THreadEdit";
import houkoku from '../screens/houkoku'
export default class Home extends React.Component {



    render() {

        const headerNavigationOptions = {
            headerStyle: {
                marginTop: (Platform.OS === 'android' ? 24 : 0)
            },
            headerTitleStyle: { color: '#56BD9A' },
            headerTintColor: '#56BD9A',
        };//ヘッダーの見た目



        const HomeStack = createStackNavigator({
            home: {
                screen: HomeScreen,
                navigationOptions: {
                    title: '',
                    headerTransparent: true,
                    headerBackTitle: null,
                }
            },
            join: {
                screen: JoinScreen,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerTransparent: true,
                    headerBackTitle: null, //<-ここでヘッダーを透明に
                })
            },
            latestdetails: {
                screen: Latestdetails,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerBackTitle: null
                })
            },
            projectedit: {
                screen: ProjectEdit,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: "",
                    headerBackTitle: null

                })
            },
            joinwork: {
                screen: Joinwork,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerTransparent: true,
                    headerBackTitle: null  //<-ここでヘッダーを透明に
                })
            }, thread1: {
                screen: Thread1Screen,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerBackTitle: null,
                    //<-ここでヘッダーを透明に
                })
            }, threadadd: {
                screen: ThreadaddScreen,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerTransparent: true,
                    headerBackTitle: null,
                })
            }, production: {
                screen: ProductionScreen,

                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerBackTitle: null,
                    headerTransparent: true, //<-ここでヘッダーを透明に
                })
            },
            threadedit: {
                screen: ThreadEdit,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: "",
                    headerBackTitle: null,
                    headerTransparent: true,//<-ここでヘッダーを透明に
                })
            }, calemdarEdit: {
                screen: CalemdarEdit,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerBackTitle: null, //<-ここでヘッダーを透明に
                    headerTransparent: true,
                })
            }, houkoku: {
                screen: houkoku,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: "",
                    headerBackTitle: null,
                    headerTransparent: true,
                })
            },
        });


        HomeStack.navigationOptions = ({ navigation }) => {
            return {
                tabBarVisible: (navigation.state.index === 0)//ホーム画面から奥にいくとHome画面のオプションが消える
            }
        }

        const MyjobStack = createStackNavigator({
            Myjobs: {
                screen: MyjobsScreen,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '参加中',
                    headerBackTitle: null
                    //<-ここでヘッダーを透明に
                })
            }, joinwork: {
                screen: Joinwork,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerTransparent: true,
                    headerBackTitle: null  //<-ここでヘッダーを透明に
                })
            }, thread1: {
                screen: Thread1Screen,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerTransparent: true,
                    headerBackTitle: null //<-ここでヘッダーを透明に
                })
            }, threadadd: {
                screen: ThreadaddScreen,
                navigationOptions: () => ({
                    title: '',
                    headerTransparent: true,
                    headerBackTitle: null
                })
            }, production: {
                screen: ProductionScreen,

                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerTransparent: true,
                    headerBackTitle: null //<-ここでヘッダーを透明に
                })
            },
            threadedit: {
                screen: ThreadEdit,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: "",
                    headerTransparent: true,
                    headerBackTitle: null //<-ここでヘッダーを透明に
                })
            }, calemdarEdit: {
                screen: CalemdarEdit,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerTransparent: true,
                    headerBackTitle: null //<-ここでヘッダーを透明に
                })
            }
        });
        // Myjobの画面遷移の処理



        MyjobStack.navigationOptions = ({ navigation }) => {
            return {
                tabBarVisible: (navigation.state.index === 0)
                //Myjob画面から奥にいくとプロフィール画面のオプションが消える
            }
        }


        const OrderStack = createStackNavigator({

            orderselect: {
                screen: OrderSelect,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: 'オーダーする',
                    headerBackTitle: null,
                })
            },

            explanation: {
                screen:
                    Explanation,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: 'オーダーガイドライン',
                    headerBackTitle: null,
                })
            },
            order: {
                screen: OrderScreen,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: 'オーダーする',
                    headerBackTitle: null,

                })
            },
            ordercheck: {
                screen: OrderCheckScreen,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                    title: '',
                    headerBackTitle: null,
                })
            },
        });//オーダー画面の画面繊維

        OrderStack.navigationOptions = ({ navigation }) => {
            return {
                tabBarVisible: (navigation.state.index === 0)//プロフィール画面から奥にいくとプロフィール画面のオプションが消える
            }
        }


        const ProfileStack = createAppContainer(createStackNavigator({
            profile: {
                screen: ProfileScreen,
                navigationOptions: {//プロフィール画面のヘッダー
                    ...headerNavigationOptions,
                    headerBackTitle: null,
                    headerTitle: 'プロフィール',
                }

            }, profilenameedit: {
                screen: ProfileNameedit,
                navigationOptions: {
                    ...headerNavigationOptions,
                    title: null,
                    headerBackTitle: null,
                }

            }, setting2: {
                screen: Setting2Screen,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                })
            },
            setting3: {
                screen: Setting3Screen
                ,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                })
            },
            delete: {
                screen: Delete,
                navigationOptions: () => ({
                    ...headerNavigationOptions,
                })
            }


        }));

        ProfileStack.navigationOptions = ({ navigation }) => {
            return {
                tabBarVisible: (navigation.state.index === 0)//プロフィール画面から奥にいくとプロフィール画面のオプションが消える
            }
        }


        const NavigatorTab = createAppContainer(
            createBottomTabNavigator({//フッターのオプション
                homeStack: {
                    screen: HomeStack,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Image
                                style={{
                                    height: 25, width: 25, tintColor: tintColor
                                }}
                                source={require('../assets/home.png')}
                            />
                        ),
                        title: 'home'
                    },

                },

                MyjobStack: {
                    screen: MyjobStack,

                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Image
                                style={{ height: 25, width: 25, tintColor: tintColor }}
                                source={require('../assets/myjobs.png')}
                            />
                        ),
                        title: 'Myjob',
                    },

                },
                orderStack: {
                    screen: OrderStack,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Image
                                style={{ height: 25, width: 25, tintColor: tintColor }}
                                source={require('../assets/chair.png')}
                            />
                        ),
                        title: 'order'
                    },

                },

                profileStack: {
                    screen: ProfileStack,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => (
                            <Image
                                style={{ height: 25, width: 25, tintColor: tintColor }}
                                source={require('../assets/user.png')} />
                        ),

                        title: 'profile'
                    },

                }
            },
                {
                    tabBarOptions: {
                        activeTintColor: '#56BD9A',
                    }
                }

            )
        )





        return (
            <View style={styles.container} >

                <NavigatorTab ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef);
                }} />

            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        justifyContent: 'center'
    }
});