import React from "react";
import {
    View,
    Text,
    TextInput,
    Dimensions,
    Image,
    ScrollView,
    TouchableHighlight,

} from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
const SCREEN_WIDTH = Dimensions.get("window").width;
export default class NewNameedit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: "",
            name: "",
            jobCard: [],
            imageUrl1: "",
            imageUrl4: ""
        };
    }
    async componentWillMount() {
        const { params } = this.props.navigation.state;
        await this.setState({ imageUrl4: params.image });
        this.setState({ name: params.name });
    }
    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: status === "granted" });
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const db = firebase.firestore();
        db.collection(`users`)
            .where("uid", "==", uid)
            .onSnapshot(snapshot => {
                const jobCard = [];
                snapshot.forEach(doc => {
                    jobCard.push({ ...doc.data(), key: doc.id });
                });
                this.setState({ jobCard });
            });
    }

    uploadImage = async (uri, imageName) => {
        const storage = firebase.storage();
        const uploadRef = storage.ref().child("users/" + imageName);
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
                imageUrl4: result.uri
            });
            this.uploadImage(result.uri, uid);
        }
    };
    handlePress() {
        const { currentUser } = firebase.auth();
        var db = firebase.firestore();
        db.collection(`users`)
            .doc(currentUser.uid)
            .update({
                name: this.state.name,
                photoURL: this.state.imageUrl1
            })
            .then(() => {
                // WORKAROUND: bodyもここで更新しておく
                this.setState({ name: this.state.name, name: "" });
                this.setState({ imageUrl1: "", imageUrl1: null });
                this.props.navigation.navigate("profile");
            })

    }
    render() {
        const hasCameraPermission = this.state && this.state.hasCameraPermission;
        return (
            <View
                style={{
                    backgroundColor: "#FEFEF0",
                    flex: 1,
                    padding: 50,
                    alignItems: "center"
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingBottom: 10
                    }}
                >
                    プロフィール画像と氏名を編集
        </Text>
                <Avatar
                    rounded
                    source={{
                        uri: this.state.imageUrl4
                    }}
                    value={this.state.imageUrl}
                    showEditButton
                    size="xlarge"
                    onEditPress={this.pickImage}
                />
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 30
                    }}
                >
                    <View style={{ marginBottom: 10 }}>
                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "bold",
                                textAlign: "center",
                                paddingBottom: 10
                            }}
                        >
                            氏名
            </Text>
                        {this.state.jobCard.map((item, i) => (
                            <TextInput
                                defaultValue={item.name}
                                value={this.state.name}
                                onChangeText={text => {
                                    this.setState({ name: text });
                                }}
                                style={{
                                    width: SCREEN_WIDTH - 60,
                                    height: 44,
                                    padding: 8,
                                    borderColor: "#E5E5E5",
                                    borderWidth: 1
                                }}
                            />
                        ))}
                    </View>
                    <TouchableHighlight onPress={this.handlePress.bind(this)}>
                        <View
                            style={{
                                margin: 50,
                                height: 40,
                                width: 120,
                                backgroundColor: "#56BD9A",
                                borderRadius: 10,
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Text style={{ color: "#fff", fontWeight: "bold" }}>
                                編集する
              </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
