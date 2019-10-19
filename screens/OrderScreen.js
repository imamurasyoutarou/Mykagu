import React from "react";
import {
    View,
    Text,
    TextInput,
    Dimensions,
    TouchableHighlight,
    Image,
    ScrollView,
    Alert,
    Modal,

} from "react-native";
import { CheckBox } from "react-native-elements";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import "@firebase/firestore";
import SwiperFlatList from "react-native-swiper-flatlist";
import { Dropdown } from "react-native-material-dropdown";
import uuid from "uuid"
import NavigationService from '../navigations/NavigationService'
const SCREEN_WIDTH = Dimensions.get("window").width;

class OrderScreen extends React.Component {
    state = {
        furniture_category: "",
        project_name: "",
        project_detail: "",
        offering_job_role: "",
        imageUrl1: "",
        imageUrl2: null,
        imageUrl3: null,
        imageUrl4: "",
        imageUrl5: null,
        imageUrl6: null,
        checked1: false,
        checked2: false,
        checked3: false,
        budget: "",
        delivery_desired_time: "",
        application_period: "",
        modalVisible: false,
        count: 1
    };
    // カメラの権限

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === "granted" });
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    } //Modalの処理

    // ストレージにバイナリーデータで格納、ダウンロードURLを取得してstateに値を格納
    uploadImage = async (uri, imageName) => {
        const postIndex = Date.now().toString();
        const storage = firebase.storage();

        const uploadRef = storage.ref("images").child(`${postIndex}`);

        const response = await fetch(uri);
        const blob = await response.blob();
        await uploadRef.put(blob).catch(() => {
            alert("画像の保存に失敗しました");
        });
        await uploadRef
            .getDownloadURL()
            .then(url => {
                this.setState({
                    imageUrl1: url,
                    postIndex
                });
            })
            .catch(() => {
                alert("失敗しました");
            });
    };
    uploadImage1 = async (uri, imageName) => {


        const postIndex = Date.now().toString();
        const storage = firebase.storage();

        const uploadRef = storage.ref("images").child(`${postIndex}`);

        const response = await fetch(uri);
        const blob = await response.blob();
        await uploadRef.put(blob).catch(() => {
            alert("画像の保存に失敗しました");
        });
        await uploadRef
            .getDownloadURL()
            .then(url => {
                this.setState({
                    imageUrl2: url,
                    postIndex
                });
            })
            .catch(() => {
                alert("失敗しました");
            });
    };
    uploadImage2 = async (uri, imageName) => {
        const postIndex = Date.now().toString();
        const storage = firebase.storage();

        const uploadRef = storage.ref("images").child(`${postIndex}`);
        const response = await fetch(uri);
        const blob = await response.blob();
        await uploadRef.put(blob).catch(() => {
            alert("画像の保存に失敗しました");
        });
        await uploadRef
            .getDownloadURL()
            .then(url => {
                this.setState({
                    imageUrl3: url,
                    postIndex
                });
            })
            .catch(() => {
                alert("失敗しました");
            });
    };

    // firestoreにstateの値を格納その後モーダルを非表示にしてordercheckscreenへ遷移
    handlePress() {
        const { currentUser } = firebase.auth();
        var db = firebase.firestore();
        var uuuu = uuid.v4();

        db.collection(`project`).doc(uuuu)
            .set({
                Participants: [],
                project_name: this.state.project_name,
                furniture_category: this.state.furniture_category,
                project_detail: this.state.project_detail,
                imageUrl1: this.state.imageUrl1,
                imageUrl2: this.state.imageUrl2,
                imageUrl3: this.state.imageUrl3,
                checked1: this.state.checked1,
                checked2: this.state.checked2,
                checked3: this.state.checked3,
                budget: this.state.budget,
                delivery_desired_time: this.state.delivery_desired_time,
                application_period: this.state.application_period,
                uuuu: uuuu,
                uid: currentUser.uid,
                createdOn: new Date()
            })
            .then(() => {
                // WORKAROUND: bodyもここで更新しておく
                this.setState({
                    project_name: this.state.project_name,
                    project_name: ""
                });
                this.setState({
                    furniture_category: this.state.furniture_category,
                    furniture_category: ""
                });
                this.setState({
                    project_detail: this.state.project_detail,
                    project_detail: ""
                })
                this.setState({ imageUrl1: "", imageUrl1: null });
                this.setState({ imageUrl2: null, imageUrl2: null });
                this.setState({ imageUrl3: null, imageUrl3: null });
                this.setState({ imageUrl4: "", imageUrl4: null });
                this.setState({ imageUrl5: null, imageUrl5: null });
                this.setState({ imageUrl6: null, imageUrl6: null });
                this.setState({ checked1: this.state.checked1, checked1: "" });
                this.setState({ checked2: this.state.checked2, checked2: "" });
                this.setState({ checked3: this.state.checked3, checked3: "" });
                this.setState({ budget: this.state.budget, budget: "" });
                this.setState({
                    delivery_desired_time: this.state.delivery_desired_time,
                    delivery_desired_time: ""
                });
                this.setState({
                    application_period: this.state.application_period,
                    application_period: ""
                });
                this.setModalVisible(false);
                NavigationService.navigate('ordercheck')
            })
            .catch(error => {
                global.console.log('エラー');
            });
    }
    // カメラロールを起動して端末のファイルの場所をこのページの表示用でstateに保持させる、(firestoreには入れない)
    pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });

        var user = firebase.auth().currentUser;
        var uid = user.uid;
        this.setState({ count: 2 })
        if (!result.cancelled) {
            this.setState({
                imageUrl4: result.uri
            });
            this.uploadImage(result.uri, uid);
        }
    };

    pickImage2 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });
        this.setState({ count: 3 })
        var user = firebase.auth().currentUser;
        var uid = user.uid;

        if (!result.cancelled) {
            this.setState({
                imageUrl5: result.uri
            });
            this.uploadImage1(result.uri, uid);
        }
    };

    pickImage3 = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });

        var user = firebase.auth().currentUser;
        var uid = user.uid;

        if (!result.cancelled) {
            this.setState({
                imageUrl6: result.uri
            });
            this.uploadImage2(result.uri, uid);
        }
    };





    render() {
        const hasCameraPermission = this.state && this.state.hasCameraPermission;
        // アラート用の配列作成
        const checked = [
            this.state.checked1,
            this.state.checked2,
            this.state.checked3
        ];
        const blank = [
            this.state.project_name,
            this.state.furniture_category,
            this.state.project_detail,
            this.state.imageUrl4,
            this.state.delivery_desired_time,
            this.state.application_period,
            this.state.budget
        ];
        let data = [
            {
                value: "テーブル"
            },
            {
                value: "椅子"
            },
            {
                value: "収納棚"
            },
            {
                value: "子供家具"
            }
        ];
        return (
            <ScrollView >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FEFEF0', padding: 30 }}>


                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>プロジェクト名</Text>

                        <TextInput
                            value={this.state.project_name}
                            onChangeText={text => {
                                this.setState({ project_name: text });
                            }}
                            placeholder='例 この部屋に合う机が欲しい'
                            clearButtonMode
                            style={{ width: SCREEN_WIDTH - 60, height: 44, padding: 8, borderColor: '#E5E5E5', borderWidth: 1, backgroundColor: 'white' }}
                        />
                    </View>


                    <View style={{ marginBottom: 30 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', }}>カテゴリー</Text>

                        <Dropdown
                            value={this.state.furniture_category}
                            containerStyle={{ height: 44, width: SCREEN_WIDTH - 60 }}
                            itemTextStyle={'キャンセル'}
                            onChangeText={text => {
                                this.setState({ furniture_category: text });
                            }}
                            data={data}
                        />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>こだわりたい内容</Text>

                        <TextInput
                            value={this.state.project_detail}
                            onChangeText={text => {
                                this.setState({ project_detail: text });
                            }}
                            placeholder='素材 色 形など'
                            clearButtonMode
                            multiline
                            style={{ width: SCREEN_WIDTH - 60, height: 150, padding: 8, borderColor: '#E5E5E5', borderWidth: 1, backgroundColor: 'white' }}
                        />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                textAlign: "center",
                                paddingBottom: 10
                            }}
                        >参考画像</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>

                        <TouchableHighlight
                            onPress={this.pickImage}>
                            <View style={{ margin: 5 }}>
                                <Avatar
                                    source={{
                                        uri: this.state.imageUrl4
                                    }}
                                    value={this.state.imageUrl1}
                                    size={100}
                                    activeOpacity={0.7}
                                />
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={this.pickImage2}>

                            <View style={{ margin: 5 }}>
                                <Avatar

                                    source={{
                                        uri: this.state.imageUrl5
                                    }}
                                    value={this.state.imageUrl2}

                                    size={100}
                                    activeOpacity={0.7}
                                />
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            onPress={this.pickImage3}>

                            <View style={{ margin: 5 }}>
                                <Avatar


                                    source={{
                                        uri: this.state.imageUrl6
                                    }}

                                    value={this.state.imageUrl3}
                                    size={100}
                                    activeOpacity={0.7}
                                />
                            </View>
                        </TouchableHighlight>

                    </View>




                    <View style={{ marginBottom: 15, width: SCREEN_WIDTH - 60, height: 150, padding: 8 }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            textAlign: "center",
                            paddingBottom: 10
                        }}
                        >
                            募集メンバー
                        </Text>

                        <CheckBox
                            title="デザイナー"
                            checked={this.state.checked1}
                            onPress={() =>
                                this.setState({
                                    checked1: !this.state.checked1
                                })
                            }
                        />
                        <CheckBox
                            title="職人"
                            checked={this.state.checked2}
                            onPress={() =>
                                this.setState({
                                    checked2: !this.state.checked2
                                })
                            }
                        />
                        <CheckBox
                            title="買う人"
                            checked={this.state.checked3}
                            onPress={() =>
                                this.setState({
                                    checked3: !this.state.checked3
                                })
                            }
                        />
                    </View>


                    <View style={{ marginTop: 50, marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>予算</Text>

                        <TextInput
                            value={this.state.budget}
                            onChangeText={text => {
                                this.setState({ budget: text });
                            }}
                            placeholder='相談して決めるなど'
                            clearButtonMode
                            style={{ width: SCREEN_WIDTH - 60, height: 44, padding: 8, borderColor: '#E5E5E5', borderWidth: 1, backgroundColor: 'white' }}
                        />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>納品希望時期</Text>

                        <TextInput
                            value={this.state.delivery_desired_time}
                            onChangeText={text => {
                                this.setState({ delivery_desired_time: text });
                            }}
                            placeholder='相談して決めるなど'
                            clearButtonMode
                            style={{ width: SCREEN_WIDTH - 60, height: 44, padding: 8, borderColor: '#E5E5E5', borderWidth: 1, backgroundColor: 'white' }}
                        />
                    </View>

                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', paddingBottom: 10 }}>メンバー応募期限</Text>

                        <TextInput
                            value={this.state.application_period}
                            onChangeText={text => {
                                this.setState({ application_period: text });
                            }}
                            placeholder='1ヵ月以内など'
                            clearButtonMode
                            style={{ width: SCREEN_WIDTH - 60, height: 44, padding: 8, borderColor: '#E5E5E5', borderWidth: 1, backgroundColor: 'white' }}
                        />
                    </View>


                    <TouchableHighlight
                        onPress={() => {
                            if (blank.some(v => v == "")) {
                                Alert.alert("未記入の項目があります");
                            } else if (checked.every(v => v == false)) {
                                Alert.alert("募集するメンバーを一つ以上選んでください");
                            } else if (checked.every(v => v == true)) {
                                Alert.alert("募集メンバーのチェックは二つまでにしてください");
                            } else {
                                this.setModalVisible(true);
                                this.setState(() => ({ nameError: null }));
                            }
                        }}
                    >

                        <View style={{
                            marginTop: 170,
                            height: 40, width: 120, backgroundColor: '#56BD9A',
                            borderRadius: 10, alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>確認画面へ</Text>
                        </View>
                    </TouchableHighlight>


                    <Modal
                        animationType="none"
                        transparent={false}
                        visible={this.state.modalVisible}
                    >
                        <ScrollView>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <SwiperFlatList
                                    ViewPropTypes={null}
                                >
                                    <View style={{ backgroundColor: 'transparent' }}>
                                        <Image
                                            style={{ width: SCREEN_WIDTH, height: 300 }}
                                            value={this.state.imageUrl1}
                                            source={{
                                                uri: this.state.imageUrl4
                                            }}
                                            resizeMode='cover'
                                        />
                                    </View>
                                    <View style={{ backgroundColor: 'transparent' }}>
                                        <Image
                                            style={{ width: SCREEN_WIDTH, height: 300 }}
                                            value={this.state.imageUrl2}
                                            source={{
                                                uri: this.state.imageUrl5
                                            }}
                                            resizeMode='cover'
                                        />
                                    </View>
                                    <View style={{ backgroundColor: 'transparent', marginBottom: 20 }}>
                                        <Image
                                            style={{ width: SCREEN_WIDTH, height: 300 }}
                                            value={this.state.imageUrl3}
                                            source={{
                                                uri: this.state.imageUrl6
                                            }}
                                            resizeMode='cover'
                                        />
                                    </View>
                                </SwiperFlatList>

                                <Text
                                    style={{ marginTop: 30, fontWeight: "bold", fontSize: 18 }}
                                >
                                    {this.state.project_name}
                                </Text>



                                <View style={{ margin: 15, flexDirection: "row", }}>
                                    <Text>カテゴリー  {this.state.furniture_category}</Text>
                                </View>

                                <View
                                    style={{
                                        padding: 15,
                                        backgroundColor: "#FEFEF0",
                                        width: SCREEN_WIDTH,
                                        alignItems: "center"
                                    }}
                                >

                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                                        こだわり内容
              </Text>
                                </View>


                                <View
                                    style={{
                                        margin: 15,
                                        width: SCREEN_WIDTH - 50,
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ fontSize: 15 }}>{this.state.project_detail}</Text>
                                </View>


                                <View
                                    style={{
                                        padding: 15,
                                        backgroundColor: "#FEFEF0",
                                        width: SCREEN_WIDTH,
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                                        募集メンバー
              </Text>
                                </View>

                                <View style={{ margin: 15, width: SCREEN_WIDTH - 60, }}>

                                    <CheckBox title="デザイナー" checked={this.state.checked1} />
                                    <CheckBox title="職人" checked={this.state.checked2} />
                                    <CheckBox title="買う人" checked={this.state.checked3} />

                                </View>

                                <View
                                    style={{
                                        padding: 15,
                                        backgroundColor: "#FEFEF0",
                                        width: SCREEN_WIDTH,
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                                        募集メンバー
              </Text>
                                </View>
                                <View
                                    style={{
                                        margin: 15,
                                        width: SCREEN_WIDTH - 50,
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ fontSize: 15 }}>{this.state.budget}</Text>
                                </View>
                                <View
                                    style={{
                                        padding: 15,
                                        backgroundColor: "#FEFEF0",
                                        width: SCREEN_WIDTH,
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                                        納品希望時期
              </Text>
                                </View>
                                <View
                                    style={{
                                        margin: 15,
                                        width: SCREEN_WIDTH - 50,
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ fontSize: 15 }}>
                                        {this.state.delivery_desired_time}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        padding: 15,
                                        backgroundColor: "#FEFEF0",
                                        width: SCREEN_WIDTH,
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                                        メンバー応募期限
              </Text>
                                </View>
                                <View
                                    style={{
                                        margin: 15,
                                        width: SCREEN_WIDTH - 50,
                                        alignItems: "center"
                                    }}
                                >
                                    <Text style={{ fontSize: 15 }}>
                                        {this.state.application_period}
                                    </Text>
                                </View>
                                {/* handlepressの処理を実行する */}

                                <View style={{ alignItems: 'center', marginTop: 60 }}>
                                    <TouchableHighlight
                                        onPress={this.handlePress.bind(this)}>
                                        <View
                                            style={{
                                                margin: 15,
                                                height: 40,
                                                width: 120,
                                                backgroundColor: "#56BD9A",
                                                borderRadius: 10,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                                オーダーする
                                            </Text>
                                        </View>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        onPress={() => this.setModalVisible(false)}
                                    >
                                        <View
                                            style={{
                                                margin: 15,
                                                height: 40,
                                                width: 120,
                                                backgroundColor: "#E5E5E5",
                                                borderRadius: 10,
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Text style={{ color: "#fff", fontWeight: "bold" }}>

                                                編集
                                            </Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>


                            </View>
                        </ScrollView>
                    </Modal>
                </View>

            </ScrollView>
        );
    }
}

export default OrderScreen;