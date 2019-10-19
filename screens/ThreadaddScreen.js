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
import NavigationService from "../navigations/NavigationService";
import firebase from "firebase";
import uuid from "uuid";
import { CheckBox } from "react-native-elements";
const SCREEN_WIDTH = Dimensions.get("window").width;
class ThreadaddScreen extends React.Component {
  state = {
    modalVisible: false,
    item: "",
    title: "",
    checked1: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ item: params.item });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    var db = firebase.firestore();
    var u = this.state.item.item;
    var uu = JSON.stringify(u);
    var uuuu = uu.slice(1);
    var uuuuu = uuuu.slice(0, -1);

    var uuu = uuid.v4();
    db.collection(`project/${uuuuu}/thread`)
      .doc(uuu)
      .set({
        Participants: [],
        title: this.state.title,
        checked1: this.state.checked1,
        createdOn: new Date(),
        uuuu: uuu
      })
      .then(() => {
        // WORKAROUND: bodyもここで更新しておく

        this.setState({ title: this.state.title, title: "" });
        this.setState({ checked1: this.state.checked1, checked1: "" });
        this.setModalVisible(true);
      })

  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#FEFEF0' }}>
        <View style={{ margin: 15, width: SCREEN_WIDTH - 30 }}>
          <CheckBox
            title="このスレッドが完了後プロジェクトを終了する"
            checked={this.state.checked1}
            onPress={() =>
              this.setState({
                checked1: !this.state.checked1
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
              margin: 15,
              height: 40,
              width: 120,
              backgroundColor: "#56BD9A",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>追加する</Text>
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
                スレッドを追加しました
              </Text>

              <TouchableHighlight
                onPress={() => NavigationService.navigate("joinwork")}
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

export default ThreadaddScreen;
