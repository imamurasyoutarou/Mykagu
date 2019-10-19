import React from 'react';
import { TouchableHighlight, Modal, View, Text, Alert, ScrollView } from 'react-native'
import {
    Form, Item, Input,
} from 'native-base';

import { Button } from 'react-native-elements'
import firebase from 'firebase';
import Privacy from '../components/Privacy'
import { CheckBox } from "react-native-elements";


export default class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            modalVisible: false,
            checked: false
        };
    }

    // ここがtureになればモーダルが表示

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }//Modalの処理



    handleSignUp = (user) => {
        const email = this.state.email
        const password = this.state.password
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)//ファイヤベースにメールとパスワードを入れる
            .then(
                this.props.navigation.navigate('Home'),
            )
            .catch(error => alert('エラー'));
    };

    // 追加
    handleShowLogin = () => {
        this.props.navigation.navigate('login');//ログイン画面に飛ばす
    };


    render() {
        const checked = [this.state.checked];
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {/* <Content style={{ justifyContent: 'center', alignItems: 'center' }}> */}
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



                    <View style={{ margin: 5 }}></View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckBox
                            style={{ padding: 8 }}
                            checked={this.state.checked}
                            onPress={() =>
                                this.setState({
                                    checked: !this.state.checked
                                })
                            }

                        />
                        <TouchableHighlight
                            onPress={() => { this.setModalVisible(true) }}
                        ><Text style={{
                            color: 'red',
                        }}>利用規約</Text></TouchableHighlight>
                        <Text>に同意する</Text>

                    </View>
                    <Button
                        title='登録する'
                        button
                        onPress={() => {
                            if (checked.some(v => v == "")) {
                                Alert.alert("利用規約を読んで同意してください");
                            } else {
                                this.handleSignUp();
                            }
                        }}
                        buttonStyle={{
                            height: 45, width: 295, backgroundColor: '#56BD9A', justifyContent: 'center', alignItems: 'center',
                            borderRadius: 26.5,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                    />

                    <View style={{ margin: 5 }}></View>

                    <Button
                        title='ログイン画面'
                        button
                        onPress={() => this.handleShowLogin()}
                        buttonStyle={{
                            height: 45, width: 295, backgroundColor: '#56BD9A', justifyContent: 'center', alignItems: 'center',
                            borderRadius: 26.5,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                    />

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                    >
                        <ScrollView style={{ flex: 1 }}>

                            <Privacy />

                            <View style={{ alignItems: 'center' }}>


                                <TouchableHighlight
                                    onPress={() => { this.setModalVisible(false) }}
                                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{
                                        margin: 15,
                                        height: 40, width: 120, backgroundColor: '#D8D8D8',
                                        borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>戻る</Text>
                                    </View>
                                </TouchableHighlight>

                            </View>
                        </ScrollView>

                    </Modal>


                </Form>
                {/* </Content> */}


            </View>
        );
    }
}