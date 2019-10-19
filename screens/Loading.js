import React from 'react';
import { View } from 'native-base';
import { ActivityIndicator, StyleSheet } from 'react-native';

import firebase from 'firebase';

export default class Loading extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Home' : 'Top');
        });//ファイヤベースにuser情報が入っていったらHome画面に飛ばす 入っていなかったらトップ画面に
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
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