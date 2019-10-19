import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  formatDate
} from "react-native";
import firebase from "firebase";
import { Card, ListItem } from "react-native-elements";
import NavigationService from "../navigations/NavigationService";
import ChatCard from "../components/ChatCard";
import uuid from "uuid";

export default class App extends Component {
  state = {
    messages: [],
    message: [],
    item: "",
    thread: "",
    imageUrl: null,
    title: "",
    check: "",
    Participants: []
  };

  componentWillMount() {
    this.setState({ messages: [] });
    const { params } = this.props.navigation.state;
    this.setState({ item: params.item });
    this.setState({ thread: params.thread });
    this.setState({ title: params.title });
    this.setState({ Participants: params.Participants });
    this.setState({ check: params.checked1 });

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
  }

  componentDidMount() {
    // Firestoreの「messages」コレクションを参照 console.  console.log(this.state.Participants);
    var huji = this.state.thread;
    var uuid = this.state.item;
    var db = firebase.firestore();
    this.ref = db
      .collection(`project/${uuid}/thread/${huji}/chat`)
      .orderBy("user.createdAt", "desc")
      .limit(20);

    this.ref1 = db.collection(`project/${uuid}/thread/${huji}/chat`);
    // refの更新時イベントにonCollectionUpdate登録
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillunmount() {
    // onCollectionUpdateの登録解除
    this.unsubscribe();
  }


  onSend = (messages = []) => {
    // Firestoreのコレクションに追加
    this.setState(previousState => ({
      messages: GiftedChat.append(
        GiftedChat.append(previousState.messages, messages)
      )
    }));

    var h = uuid.v4();

    messages.forEach(message => {
      this.ref1.doc(h).set(message);
    });

    this.ref1.doc(h).update({
      createdAt: null
    });

    // onCollectionUpdateが呼ばれるので、ここではstateには渡さない
  };
  /**
   * Firestoreのコレクションが更新されたときのイベント
   */
  onCollectionUpdate = querySnapshot => {
    // docsのdataをmessagesとして取得
    const message = querySnapshot.docs.map(doc => {
      return doc.data();
    });

    // messagesをstateに渡す
    this.setState({ message: message });
  };

  handlePress() {
    const { currentUser } = firebase.auth();
    // Firestoreの「messages」コレクションを参照 console.log(this.state.massages);
    var huji = this.state.thread;
    var uuid = this.state.item;
    var db = firebase.firestore();
    db.collection(`project/${uuid}/thread`)
      .doc(huji)
      .update({
        Participants: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
      })
      .then(() => {
        // WORKAROUND: bodyもここで更新しておく
        NavigationService.navigate("joinwork");
      })
      .catch(error => {
        global.console.log('なし');
      });
  }
  pushdelete() {
    const { currentUser } = firebase.auth();
    // Firestoreの「messages」コレクションを参照 console.log(this.state.massages);
    var huji = this.state.thread;
    var uuid = this.state.item;
    var db = firebase.firestore();
    db.collection(`project`)
      .doc(uuid)
      .delete()
      .then(() => {
        // WORKAROUND: bodyもここで更新しておく
        NavigationService.navigate("home");
      })
      .catch(error => {
        global.console.log('なし');
      });
  }

  render() {
    const { currentUser } = firebase.auth();
    var p = this.state.Participants[0];
    var p1 = this.state.Participants[1];
    var p2 = this.state.Participants[2];
    var ch = this.state.check;
    var bbb = this.state.Participants.length;
    function Butt() {
      if (
        (p == currentUser.uid ||
          p1 == currentUser.uid ||
          p2 == currentUser.uid) &&
        ch == false
      ) {
        return (
          <TouchableHighlight
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                height: 30,
                width: 90,
                backgroundColor: "red",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                承認済み
              </Text>
            </View>
          </TouchableHighlight>
        );
      } else {
        return null;
      }
    }
    function Buttn() {
      if (
        p != currentUser.uid &&
        p1 != currentUser.uid &&
        p2 != currentUser.uid &&
        ch == false
      ) {
        return (
          <View
            style={{
              height: 30,
              width: 90,
              backgroundColor: "red",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              承認する
            </Text>
          </View>
        );
      } else {
        return null;
      }
    }
    function B() {
      if (
        (p == currentUser.uid ||
          p1 == currentUser.uid ||
          p2 == currentUser.uid) &&
        ch == true
      ) {
        return (
          <TouchableHighlight
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <View
              style={{
                height: 30,
                width: 90,
                backgroundColor: "red",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                承認済み
              </Text>
            </View>
          </TouchableHighlight>
        );
      } else {
        return null;
      }
    }
    function Bu() {
      if (
        p != currentUser.uid &&
        p1 != currentUser.uid &&
        bbb <= 1 &&
        ch == true
      ) {
        return (
          <View
            style={{
              height: 30,
              width: 90,
              backgroundColor: "red",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              承認する
            </Text>
          </View>
        );
      } else {
        return null;
      }
    }
    function BB() {
      if (
        p != currentUser.uid &&
        p1 != currentUser.uid &&
        bbb >= 2 &&
        ch == true
      ) {
        return (
          <View
            style={{
              height: 30,
              width: 90,
              backgroundColor: "red",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              プロジェクトを終了する
            </Text>
          </View>
        );
      } else {
        return null;
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <Card containerStyle={{ padding: 15 }}>
          <Text
            style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}
          >
            予算を確定してください
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 15
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Butt />
              <TouchableHighlight
                onPress={this.handlePress.bind(this)}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Buttn />
              </TouchableHighlight>
              <B />
              <TouchableHighlight
                onPress={this.handlePress.bind(this)}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Bu />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this.pushdelete.bind(this)}
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <BB />
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() =>
                  NavigationService.navigate("threadedit", {
                    item: this.state.item,
                    thread: this.state.thread,
                    title: this.state.title,
                    check: this.state.check
                  })
                }
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 5
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 90,
                    backgroundColor: "#56BD9A",
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
        </Card>

        <View style={{ flex: 1 }}>
          <GiftedChat
            showUserAvatar
            messages={this.state.message}
            renderDay={null}
            renderTime={null}
            onSend={this.onSend} //送信ボタン
            user={{
              //ユーザー情報
              _id: 1,
              createdAt: new Date(),
              name: "React Native",
              avatar: this.state.imageUrl
            }}
          />
        </View>
      </View>
    );
  }
}
