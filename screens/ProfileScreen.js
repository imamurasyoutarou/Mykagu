import React from "react";
import {
  Text,
  View,
  Alert,
  TouchableHighlight,
  ScrollView
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import NavigationService from "../navigations/NavigationService";
const list = [
  {
    title: "お問い合わせ",
    screen: "setting2"
  },
  {
    title: "パスワードの変更",
    screen: "setting3"
  },
  {
    title: "退会",
    screen: "delete"
  }
];
export default class ProfileScreeen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      jobCard: []
    };
  }
  handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(result => alert("ログアウトしました"))
      .catch(error => console.error(error));
    //ログアウト
  };
  showConfirmAlert = () => {
    Alert.alert(
      "確認",
      "ログアウトしますか？",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "ログアウト",
          onPress: () => this.handleSignOut(),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };
  state = {
    modalVisible: false
  };
  // ここがtureになればモーダルが表示
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  } //Modalの処理
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    firebase
      .storage()
      .ref()
      .child("users/" + uid)
      .getDownloadURL()
      .then(url => {
        this.setState({ imageUrl: url });
      })
      .catch(() => {
        this.setState({ imageUrl: null });
      });
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

  render() {
    const hasCameraPermission = this.state && this.state.hasCameraPermission;
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 40,
          paddingBottom: 50,
          backgroundColor: "#FEFEF0"
        }}
      >
        <View style={{ alignItems: "center" }}>
          <View>
            {this.state.jobCard.map((item, i) => (
              <Avatar
                rounded
                source={{
                  uri: item.photoURL
                }}
                size="xlarge"
              />
            ))}
          </View>
          <View>
            {this.state.jobCard.map((item, i) => (
              <Text style={{ margin: 15, fontWeight: "bold", fontSize: 20 }}>
                {item.name}
              </Text>
            ))}
          </View>
          {this.state.jobCard.map((item, i) => (
            <TouchableHighlight
              style={{ marginBottom: 40 }}
              onPress={() =>
                NavigationService.navigate("profilenameedit", {
                  image: item.photoURL,
                  name: item.name
                })
              }
            >
              <View
                style={{
                  height: 30,
                  width: 150,
                  backgroundColor: "#56BD9A",
                  borderRadius: 26.5,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  プロフィール編集
                </Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
        <View
          style={{ flex: 1, backgroundColor: "#F3F1F1", height: 30 }}
        ></View>
        <View style={{ flex: 2, marginBottom: 10 }}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              onPress={() => this.props.navigation.navigate(item.screen)}
              containerStyle={{ backgroundColor: "#FEFEF0" }}
              chevron
              bottomDivider
            />
          ))}
          <ListItem
            title="ログアウト"
            onPress={this.showConfirmAlert}
            containerStyle={{ backgroundColor: "#FEFEF0" }}
            chevron
            bottomDivider
          />
        </View>
      </View>
    );
  }
}