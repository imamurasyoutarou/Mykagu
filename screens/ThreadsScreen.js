import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

import firebase from "firebase";
import { FloatingAction } from "react-native-floating-action";
import NavigationService from "../navigations/NavigationService";
import ThreadCard from "../components/ThreadCard";
class ThreadsScreen extends React.Component {
  state = {
    item: "",
    thread: []
  };
  componentWillMount() {
    var u = this.props.item.item;
    var uu = JSON.stringify(u);
    var uuuu = uu.slice(1);
    var uuuuu = uuuu.slice(0, -1);
    var thread = this.state.thread;
    const db = firebase.firestore();
    db.collection(`project/${uuuuu}/thread`).onSnapshot(snapshot => {
      const thread = [];
      snapshot.forEach(doc => {
        thread.push({ ...doc.data(), key: doc.id });
      });
      this.setState({ thread: thread });
    });
  }
  render() {
    var h = this.state.thread.length;
    function Greeting() {
      if (h == 0) {
        return (
          <View
            style={{
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",

            }}
          >
            <Image
              source={require('../assets/talk1.png')}
              style={{ width: 200, height: 200 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold"
              }}
            >
              スレッドを追加してみよう
           </Text>
          </View>
        );
      } else {
        return null;
      }
    }
    return (
      <View style={{
        flex: 1,
        backgroundColor: "#FEFEF0"
      }}>
        <View style={{ position: 'absolute', left: 0, right: 0, top: 120, bottom: 0 }}>
          <Greeting />
        </View>
        <View>
          <ThreadCard item={this.props.item.item} thread={this.state.thread} />

        </View>

        <FloatingAction
          onOpen={() =>
            NavigationService.navigate("threadadd", {
              item: this.props.item
            })
          }
          animated
          buttonSize={56}
          color={"#56BD9A"}
        />
      </View>
    );
  }
}
export default ThreadsScreen;