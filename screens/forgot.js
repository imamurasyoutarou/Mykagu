import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, TouchableHighlight, Modal } from 'react-native';
import firebase from 'firebase'
import "@firebase/firestore";

const SCREEN_WIDTH = Dimensions.get('window').width;
class forgot extends React.Component {
    state = {
        contact: "",
        modalVisible: false
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }


    handleUnsubscribe = () => {
        var auth = firebase.auth();
        var emailAddress = this.state.contact
        auth.
            sendPasswordResetEmail(emailAddress)
            .then(function () {
                alert('メールを送信しました')
            })
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEFEF0' }}>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>パスワードを忘れた方は</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>パスワード変更メールを受け取ってください</Text>

                    <View style={{ alignItems: 'center', backgroundColor: '#FEFEF0', marginBottom: 10 }}>
                        <TextInput
                            value={this.state.contact}
                            onChangeText={text => {
                                this.setState({ contact: text });
                            }}

                            style={{ width: SCREEN_WIDTH - 60, height: 44, padding: 8, borderColor: '#E5E5E5', borderWidth: 1, backgroundColor: 'white' }}
                        />
                    </View>
                </View>

                <TouchableHighlight
                    onPress={this.handleUnsubscribe}>
                    <View style={{
                        margin: 15,
                        height: 40, width: 120, backgroundColor: '#56BD9A',
                        borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>送信する</Text>
                    </View>
                </TouchableHighlight>



                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 18 }}>パスワード変更メールを送信しました</Text>

                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate('profile')}
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
                    </View>
                </Modal>
            </View>
        );
    }
}


export default forgot;