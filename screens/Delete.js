import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';


import firebase from 'firebase'


class Delete extends React.Component {
    render() {


        showConfirmAlert = () => {
            Alert.alert(
                '最終確認',
                '本当に退会されますか？',
                [
                    { text: 'キャンセル', style: 'cancel' },
                    { text: '退会する', onPress: () => handleUnsubscribe(), style: 'destructive' },
                ],
                { cancelable: false }
            )
        }

        handleUnsubscribe = async () => {

            var user = firebase.auth().currentUser;
            await user
                .delete()
                .then(response => {
                    this.props.navigation.navigate("Top");
                })
                .catch(function () {
                    alert('エラー')
                });
        };

        return (
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#FEFEF0' }}>

                <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>下記の退会ボタンを押していただくと</Text>
                <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>登録している情報は全て削除されます</Text>


                <TouchableHighlight
                    onPress={() => showConfirmAlert()}
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{
                        margin: 15,
                        height: 40, width: 120, backgroundColor: 'red',
                        borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>退会</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}


export default Delete;