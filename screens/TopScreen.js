import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-elements'

class TopScreen extends React.Component {
    render() {
        return (
            <ImageBackground source={require('../assets/Top.jpg')} style={{ width: '100%', height: '100%' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 170, }}>
                    <Image
                        style={{ width: 295, height: 50 }}
                        source={require('../assets/タイトル.png')}
                    />
                    <View style={{ marginTop: 230, alignItems: 'center', }}>


                        <Button
                            title='始める'
                            button
                            onPress={() => this.props.navigation.navigate('Slideguide')}
                            buttonStyle={{
                                height: 45, width: 295, backgroundColor: '#56BD9A', justifyContent: 'center', alignItems: 'center',
                                borderRadius: 26.5, margin: 5
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                        />


                        <TouchableHighlight
                            color='black'
                            style={{
                                borderBottomColor: '#47315a',
                                borderBottomWidth: 1
                            }}
                            onPress={() => this.props.navigation.navigate('Login')}>
                            <Text

                            >アカウントをお持ちのかた</Text>
                        </TouchableHighlight>

                    </View >
                </View>
            </ImageBackground>
        );
    }
}


export default TopScreen;