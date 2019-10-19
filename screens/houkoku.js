import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Modal
} from "react-native";
import firebase from "firebase";
import "@firebase/firestore";
import NavigationService from "../navigations/NavigationService";

const SCREEN_WIDTH = Dimensions.get("window").width;
class houkoku extends React.Component {
  state = {
    contact: "",
    modalVisible: false,
    item: "",
    name: ""
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ item: params.item });
    this.setState({ name: params.name });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  handlePress() {
    const { currentUser } = firebase.auth();
    var db = firebase.firestore();

    db.collection(`contact/${currentUser.uid}/contact`)
      .add({
        contact: this.state.contact,
        uuid: this.state.item,
        name: this.state.name,
        createdOn: new Date()
      })
      .then(() => {
        // WORKAROUND: bodyもここで更新しておく

        this.setState({ contact: this.state.contact, contact: "" });
        this.setState({ item: this.state.item, item: "" });
        this.setState({ name: this.state.name, name: "" });
        this.setModalVisible(true);
      })
      .catch(error => {
        // global.console.log(error);
        alert("エラー");
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 100,
          alignItems: "center",
          backgroundColor: "#FEFEF0"
        }}
      >
        <View style={{ margin: 15 }}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 5,
              fontWeight: "bold",
              textAlign: 'center'
            }}
          >
            プロジェクト名
          </Text>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 18,
              textAlign: 'center'

            }}
          >
            {this.state.name}
          </Text>
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
            報告内容を記入してください
          </Text>

          <TextInput
            value={this.state.contact}
            onChangeText={text => {
              this.setState({ contact: text });
            }}
            multiline
            style={{
              width: SCREEN_WIDTH - 60,
              height: 70,
              padding: 8,
              borderColor: "#E5E5E5",
              borderWidth: 1,
              backgroundColor: "white"
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
            <Text style={{ color: "#fff", fontWeight: "bold" }}>送信する</Text>
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
                お問い合わせを受け付けました
              </Text>

              <TouchableHighlight
                onPress={() => NavigationService.navigate("home")}
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

export default houkoku;
