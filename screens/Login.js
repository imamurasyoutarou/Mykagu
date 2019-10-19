import React from 'react';
import { TouchableHighlight } from 'react-native'
import {

    Item,
    Input,
    Text,
    View,
    Form

} from 'native-base';
import { SocialIcon, Button } from 'react-native-elements'
import firebase from 'firebase';
import * as Facebook from 'expo-facebook';


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    async  logInFB() {
        try {
            const {
                type,
                token
            } = await Facebook.logInWithReadPermissionsAsync('number', {
                permissions: ['public_profile', 'email'], behavior: 'web'
            });

            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                firebase.auth().signInAndRetrieveDataWithCredential(credential);
            }
        } catch ({ }) {
            alert('ログインに失敗しました');
        }
    }

    handleLogin = () => {
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                alert('ログインに失敗しました');
            });
    };//ログインが成立するとホーム画面に飛ぶ

    render() {
        return (


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Form>
                    <Item>
                        <Input
                            placeholder='Email'
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            onChangeText={email => this.setState({ email })}
                        />
                    </Item>
                    <Item>
                        <Input
                            placeholder='Password'
                            autoCapitalize={'none'}
                            secureTextEntry
                            onChangeText={password => this.setState({ password })}
                        />
                    </Item>
                    <View style={{ margin: 7 }}>

                        <Button
                            title='ログイン'
                            button
                            onPress={this.handleLogin}
                            buttonStyle={{
                                height: 45, width: 295, backgroundColor: '#56BD9A', justifyContent: 'center', alignItems: 'center',
                                borderRadius: 26.5,
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                        />

                    </View>

                    <View style={{ marginTop: 5 }}></View>


                    <SocialIcon
                        title='Sign In With Facebook'
                        button
                        type='facebook'
                        onPress={this.logInFB}
                        style={{
                            height: 45, width: 295
                        }}
                    />

                </Form>
                <TouchableHighlight
                    color='black'
                    style={{
                        borderBottomColor: '#47315a',
                        borderBottomWidth: 1,
                        textAlign: 'center', alignItems: 'center'
                    }}
                    onPress={() => this.props.navigation.navigate('forgot')}>
                    <Text

                    >パスワードを忘れた方</Text>
                </TouchableHighlight>


            </View>
        );
    }
}
