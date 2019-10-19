import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';


import firebase from 'firebase'


class Setting3Screen extends React.Component {
    render() {

        handleUnsubscribe = async () => {
            var auth = firebase.auth();
            var emailAddress = firebase.auth().currentUser.email;
            auth.
                sendPasswordResetEmail(emailAddress)
                .then(function () {
                    this.props.navigetion.navigete('profile'),
                        alert('メールを送信しました')

                }).catch(function (error) {
                    alert('メールを送信できませんでした')
                });
        };

        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FEFEF0' }}>


                <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>下記の送信ボタンを押していただくと</Text>
                <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>登録しているメールアドレスに</Text>
                <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>パスワード変更メールが送られてきます</Text>

                <TouchableHighlight
                    onPress={() => handleUnsubscribe()}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        margin: 15,
                        height: 40, width: 120, backgroundColor: 'red',
                        borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>変更メールを送信</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}


export default Setting3Screen;