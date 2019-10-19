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
  Button
} from "react-native";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import "@firebase/firestore";
import NavigationService from "../navigations/NavigationService";

const SCREEN_WIDTH = Dimensions.get("window").width;

class CarenderEdit extends React.Component {
  state = {
    item: "",
    thread: "",
    image: null,
    imageUrl1: "",
    title: "",
    uuuu: ""
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ item: params.item });
    this.setState({ image: params.image });
    this.setState({
      title: params.title
    });
    this.setState({
      uuuu: params.uuuu
    });
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  } //Modalの処理

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

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    var user = firebase.auth().currentUser;
    var uid = user.uid;

    if (!result.cancelled) {
      this.setState({
        image: result.uri
      });
      this.uploadImage(result.uri, uid);
    }
  };

  pushdelete() {
    const { currentUser } = firebase.auth();
    var db = firebase.firestore();
    var u = this.state.item.item;
    var uu = JSON.stringify(u);
    var uuuu = uu.slice(1);
    var uuuuu = uuuu.slice(0, -1);
    var uuu = this.state.uuuu;
    db.collection(`project/${uuuuu}/diary`)
      .doc(uuu)
      .delete()
      .then(() => NavigationService.navigate("joinwork"))
      .catch(() => {
        alert("削除に失敗しました");
      });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    var db = firebase.firestore();
    var u = this.state.item.item;
    var uu = JSON.stringify(u);
    var uuuu = uu.slice(1);
    var uuuuu = uuuu.slice(0, -1);

    var uuu = this.state.uuuu;
    db.collection(`project/${uuuuu}/diary`)
      .doc(uuu)
      .update({
        title: this.state.title,
        imageUrl: this.state.imageUrl1
      })
      .then(() => {
        // WORKAROUND: bodyもここで更新しておく

        this.setState({ title: this.state.title, title: "" });
        this.setState({ imageUrl1: "", imageUrl1: null });
        this.setState({ imageUrl2: "", imageUrl2: null });
        NavigationService.navigate("joinwork")
      })
      .catch(error => {
        alert("失敗しました");
      });
  }
  showConfirmAlert = () => {
    Alert.alert(
      "確認",
      "削除しますか？",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "削除",
          onPress: this.pushdelete.bind(this),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const hasCameraPermission = this.state && this.state.hasCameraPermission;
    // アラート用の配列作成

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FEFEF0' }}>
        <TouchableHighlight onPress={this.pickImage}>
          <View style={{ margin: 5 }}>
            <Avatar
              source={{
                uri: this.state.image
              }}
              value={this.state.imageUrl1}
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
            defaultValue={this.state.title}
            value={this.state.title}
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
              margin: 30,
              height: 40,
              width: 120,
              backgroundColor: "#56BD9A",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>保存する</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => {
            this.showConfirmAlert();
          }}
        >
          <View
            style={{
              height: 40,
              width: 120,
              backgroundColor: "red",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>削除する</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default CarenderEdit;
