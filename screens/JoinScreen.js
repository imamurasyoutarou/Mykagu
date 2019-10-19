import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Modal, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements'
import firebase from 'firebase'
import NavigationService from '../navigations/NavigationService'
class JionScreen extends React.Component {


    state = {
        modalVisible: false,
        imageUrl: ""
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    render() {

        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEFEF0' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>参加申請を受け付けました</Text>


                <TouchableHighlight
                    onPress={() => NavigationService.navigate('home')}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        margin: 15,
                        height: 40, width: 120, backgroundColor: 'red',
                        borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>戻る</Text>
                    </View>
                </TouchableHighlight>

            </View>
        );
    }
}


export default JionScreen;