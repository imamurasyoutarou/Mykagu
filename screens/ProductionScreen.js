import React from "react";
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    Alert,
    Image,
    Dimensions,
    TextInput
} from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import "@firebase/firestore";
import uuid from "uuid";
const SCREEN_WIDTH = Dimensions.get("window").width;
class ProductionScreen extends React.Component {
    state = {
        title: "",
        imageUrl1: null,
        imageUrl2: null,
        item: [],
        modalVisible: false
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({ item: params.item });
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === "granted" });

    }

    handlePress() {
        const { currentUser } = firebase.auth();
        var db = firebase.firestore();
        var u = this.state.item.item;
        var uu = JSON.stringify(u);
        var uuuu = uu.slice(1);
        var uuuuu = uuuu.slice(0, -1);

        var uuu = uuid.v4();

        db.collection(`project/${uuuuu}/diary`)
            .doc(uuu)
            .set({
                title: this.state.title,
                imageUrl: this.state.imageUrl2,
                createdOn: new Date(),
                uuuu: uuu
            })
            .then(() => {
                // WORKAROUND: bodyもここで更新しておく

                this.setState({ title: this.state.title, title: "" });
                this.setState({ imageUrl1: "", imageUrl1: null });
                this.setState({ imageUrl2: "", imageUrl2: null });
                this.setModalVisible(true);
            })
            .catch(error => {
                console.log('なし')
            });
    }
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
                    imageUrl2: url,
                    postIndex
                });
            })
            .catch(() => {
                alert("失敗しました");
            });
    };
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [4, 3],
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        });

        var user = firebase.auth().currentUser;
        var uid = user.uid;
        this.setState({ count: 2 });
        if (!result.cancelled) {
            this.setState({
                imageUrl1: result.uri
            });
            this.uploadImage(result.uri, uid);
        }
    };
    render() {
        const hasCameraPermission = this.state && this.state.hasCameraPermission;
        const blank = [this.state.imageUrl1, this.state.title];
        return (
            <View style={{ flex: 1, alignItems: "center", backgroundColor: '#FEFEF0', justifyContent: 'center' }}>
                <TouchableHighlight onPress={this.pickImage}>
                    <View style={{ margin: 40 }}>
                        <Avatar
                            source={{
                                uri: this.state.imageUrl1
                            }}
                            value={this.state.imageUrl2}
                            size={200}
                            activeOpacity={0.7}
                        />
                    </View>
                </TouchableHighlight>

                <View style={{ marginBottom: 10 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            textAlign: "center",
                            paddingBottom: 10
                        }}
                    >
                        コメント
          </Text>

                    <TextInput
                        value={this.state.project_name}
                        onChangeText={text => {
                            this.setState({ title: text });
                        }}
                        clearButtonMode
                        style={{
                            width: SCREEN_WIDTH - 60,
                            height: 44,
                            padding: 8,
                            borderColor: "#E5E5E5",
                            borderWidth: 1,
                            backgroundColor: 'white'
                        }}
                    />
                </View>

                <TouchableHighlight onPress={this.handlePress.bind(this)}>
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
                        <Text style={{ color: "#fff", fontWeight: "bold" }}>投稿する</Text>
                    </View>
                </TouchableHighlight>

                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                >
                    <View
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                        <View>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                                日記受け付けました
              </Text>

                            <TouchableHighlight
                                onPress={() => this.props.navigation.navigate("joinwork")}
                                style={{ alignItems: "center", justifyContent: "center" }}
                            >
                                <View
                                    style={{
                                        margin: 15,
                                        height: 40,
                                        width: 120,
                                        backgroundColor: "red",
                                        borderRadius: 10,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                        戻る
                  </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default ProductionScreen;
