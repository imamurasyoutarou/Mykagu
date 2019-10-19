import React from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Alert,

} from "react-native";
import { CheckBox } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import "@firebase/firestore";
import NavigationService from "../navigations/NavigationService";

const SCREEN_WIDTH = Dimensions.get("window").width;

class ThreadEdit extends React.Component {
  state = {
    item: "",
    thread: "",
    checked1: false,
    title: "",
    uuuu: "",
    check: false
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ item: params.item });
    this.setState({ thread: params.thread });
    this.setState({
      title: params.title
    });

    this.setState({
      check: params.check
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
          imageUrl4: url,
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
        imageUrl1: result.uri
      });
      this.uploadImage(result.uri, uid);
    }
  };

  pushdelete() {
    const uuuu = this.state.uuuu;
    var db = firebase.firestore();
    db.collection(`project`)
      .doc(uuuu)
      .delete()
      .then(() => NavigationService.navigate("joinwork"))
      .catch(() => {
        alert("削除に失敗しました");
      });
  }

  handlePress() {
    var huji = this.state.thread;
    var uuid = this.state.item;
    var db = firebase.firestore();

    db.collection(`project/${uuid}/thread/`)
      .doc(huji)
      .update({
        title: this.state.title,
        checked1: this.state.check
      })
      .then(() => {
        // WORKAROUND: bodyもここで更新しておく

        this.setState({ title: this.state.title, title: "" });
        this.setState({ check: this.state.check, check: "" });
        this.setModalVisible(true);
        this.setModalVisible(true);
        NavigationService.navigate("joinwork");
      })
      .catch(error => {
        console.log('失敗しました')
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
        <View style={{ margin: 15, width: SCREEN_WIDTH - 30 }}>
          <CheckBox
            title="このスレッドが完了後プロジェクトを終了する"
            checked={this.state.check}
            onPress={() =>
              this.setState({
                check: !this.state.check
              })
            }
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
          >
            {" "}
            スレッド
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
              margin: 50,
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

export default ThreadEdit;
