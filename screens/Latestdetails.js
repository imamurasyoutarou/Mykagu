import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight,
  Button,
  Alert,

} from "react-native";
import { Avatar } from "react-native-elements";

import SwiperFlatList from "react-native-swiper-flatlist";
import NavigationService from "../navigations/NavigationService";
import firebase from "firebase";

const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = {
  wrapper: {
    height: 200
  },
  slide: {
    backgroundColor: "transparent"
  },

  paginationStyle: {
    position: "absolute",
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: "white",
    fontSize: 20
  }
};

const dateString = date => {
  if (date == null) {
    return "";
  }
  // firebaseのTimestamp型をDate型に変換する
  const dateObject = date.toDate();
  return dateObject.toISOString().split("T")[0];
};

const renderPagination = (index, total) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: "grey" }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  );
};

class LatestdetailsScreen extends React.Component {
  state = {
    item: [],
    imageUrl: "",
    uid: "",
    jobCard: [],
    modalVisible: false,
    imageUrl2: "",
    imageUrl3: ""
  };

  async componentWillMount() {
    const { params } = this.props.navigation.state;
    await this.setState({ item: params.item });
  }

  async componentDidMount() {
    const uid = this.state.item.uid;

    firebase
      .storage()
      .ref()
      .child("users/" + uid)
      .getDownloadURL()
      .then(url => {
        this.setState({ imageUrl: url });
      })
      .catch(() => {
        console.log('プロフィール写真がない')
      });

    const db = firebase.firestore();

    db.collection(`users`)
      .where("uid", "==", uid)
      .get()
      .then(snapshot => {
        const jobCard = [];
        snapshot.forEach(doc => {
          jobCard.push({ ...doc.data(), key: doc.id });
        });
        this.setState({ jobCard: jobCard });
      })

      .catch(error => {
        console.log('なし');
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }




  async handlePress() {
    const { currentUser } = firebase.auth();
    const uuuu = this.state.item.uuuu;
    var db = firebase.firestore();

    const user = firebase.auth().currentUser;
    const uid = user.uid;

    await firebase
      .storage()
      .ref()
      .child("users/" + uid)
      .getDownloadURL()
      .then(url => {
        this.setState({ imageUrl: url });
        const uuuu = this.state.item.uuuu;
        var db = firebase.firestore();
        db.collection(`project`)
          .doc(uuuu)
          .update({
            Participants: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
          })
          .then(() => {
            // WORKAROUND: bodyもここで更新しておく
            this.props.navigation.navigate("join");
          })
      })
      .catch(() => {
        alert("プロフィール欄を記述することでこの機能は行うことができます");
      });

  }

  pushdelete() {
    const uuuu = this.state.item.uuuu;
    var db = firebase.firestore();
    console.log(uuuu);
    db.collection(`project`)
      .doc(uuuu)
      .delete()
      .then(NavigationService.navigate("home"));
  }
  render() {
    showConfirmAlert = () => {
      Alert.alert(
        "",
        "編集しますか？",
        [
          { text: "キャンセル", style: "cancel" },
          {
            text: "編集",
            onPress: () =>
              NavigationService.navigate("projectedit", {
                item: item
              }),
            style: "destructive"
          }
        ],
        { cancelable: false }
      );
    };
    showConfirmAlert2 = () => {
      Alert.alert(
        "",
        "報告しますか？",
        [
          { text: "キャンセル", style: "cancel" },
          {
            text: "報告",
            onPress: () =>
              NavigationService.navigate("houkoku", {
                item: uuuu,
                name: this.state.item.project_name
              }),
            style: "destructive"
          }
        ],
        { cancelable: false }
      );
    };
    function Image2() {
      if (item.imageUrl2 === null) {
        return (
          <Image
            style={{ width: SCREEN_WIDTH, height: 300 }}
            source={require("../assets/noimage.png")}
            resizeMode="cover"
          />
        );
      } else {
        return (
          <Image
            style={{ width: SCREEN_WIDTH, height: 300 }}
            source={{ uri: item.imageUrl2 }}
            resizeMode="cover"
          />
        );
      }
    }
    function Image3() {
      if (item.imageUrl3 === null) {
        return (
          <Image
            style={{ width: SCREEN_WIDTH, height: 300 }}
            source={require("../assets/noimage.png")}
            resizeMode="cover"
          />
        );
      } else {
        return (
          <Image
            style={{ width: SCREEN_WIDTH, height: 300 }}
            source={{ uri: item.imageUrl3 }}
            resizeMode="cover"
          />
        );
      }
    }

    const { item } = this.state;
    var uuuu = item.uuuu;
    function Greeting1() {
      if (item.checked1 == true) {
        return <Text>デザイナー</Text>;
      } else {
        return null;
      }
    }
    function Greeting2() {
      if (item.checked2 == true) {
        return <Text>職人</Text>;
      } else {
        return null;
      }
    }
    function Greeting3() {
      if (item.checked3 == true) {
        return <Text>買う人</Text>;
      } else {
        return null;
      }
    }

    const { currentUser } = firebase.auth();

    function Buttonn() {
      if (
        item.Participants[0] == currentUser.uid ||
        item.Participants[1] == currentUser.uid ||
        item.uid == currentUser.uid
      ) {
        return (
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
              案件ページへ
            </Text>
          </View>
        );
      } else {
        return null;
      }
    }

    function Buttonn2() {
      if (
        item.Participants[0] != currentUser.uid &&
        item.Participants[1] != currentUser.uid &&
        item.uid != currentUser.uid &&
        item.Participants.length <= 1
      ) {
        return (
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
              参加申請する
            </Text>
          </View>
        );
      } else {
        return null;
      }
    }

    function Buttonn3() {
      if (
        item.Participants[0] != currentUser.uid &&
        item.Participants[1] != currentUser.uid &&
        item.uid != currentUser.uid &&
        item.Participants.length >= 2
      ) {
        return (
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
            <Text style={{ color: "#fff", fontWeight: "bold" }}>満員</Text>
          </View>
        );
      } else {
        return null;
      }
    }

    function Buttonn4() {
      if (item.uid == currentUser.uid) {
        return (
          <TouchableHighlight onPress={() => this.showConfirmAlert()}>
            <View
              style={{
                padding: 10,
                backgroundColor: "#E5E5E5",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>･･･</Text>
            </View>
          </TouchableHighlight>
        );
      } else {
        return (
          <TouchableHighlight onPress={() => this.showConfirmAlert2()}>
            <View
              style={{
                padding: 5,
                backgroundColor: "#E5E5E5",
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>･･･</Text>
            </View>
          </TouchableHighlight>
        );
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.9 }}>
          <ScrollView>
            <View style={{ alignItems: "center" }}>
              <SwiperFlatList ViewPropTypes={null}>
                <View style={styles.slide}>
                  <Image
                    style={{ width: SCREEN_WIDTH, height: 300 }}
                    source={{ uri: item.imageUrl1 }}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.slide}>
                  <Image2 />
                </View>
                <View style={styles.slide}>
                  <Image3 />
                </View>
              </SwiperFlatList>

              <Text
                style={{
                  marginTop: 30,
                  fontWeight: "bold",
                  fontSize: 18
                }}
              >
                {item.project_name}
              </Text>

              <View style={{ margin: 15, flexDirection: "row" }}>
                <Text>カテゴリー {item.furniture_category}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 30
                }}
              >
                <View>
                  <Avatar
                    rounded
                    source={{
                      uri: this.state.imageUrl
                    }}
                    size="small"
                  />
                </View>

                <View style={{ marginTop: 5 }}>
                  {this.state.jobCard.map((item, i) => (
                    <Text
                      style={{
                        marginLeft: 10,
                        marginTop: 5,
                        fontWeight: "bold"
                      }}
                    >
                      {" "}
                      {item.name}
                    </Text>
                  ))}
                </View>
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
                <Text style={{ fontSize: 15 }}>{item.project_detail}</Text>
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
              {/* チェックボックス */}
              <View style={{ margin: 15 }}>
                <Greeting1 />
                <Greeting2 />
                <Greeting3 />
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
                  希望予算
                </Text>
              </View>

              <View
                style={{
                  margin: 15,
                  width: SCREEN_WIDTH - 50,
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 15 }}>{item.budget}</Text>
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
                  {item.delivery_desired_time}
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
                  marginTop: 15,
                  marginBottom: 60,
                  width: SCREEN_WIDTH - 50,
                  alignItems: "center"
                }}
              >
                <Text style={{ fontSize: 15 }}>{item.application_period}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            right: 0,
            alignItems: "center"
          }}
        >
          <Buttonn4 />
          <TouchableHighlight
            onPress={() =>
              NavigationService.navigate("joinwork", {
                item: uuuu,
                name: item.project_name
              })
            }
          >
            <Buttonn />
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handlePress.bind(this)}>
            <Buttonn2 />
          </TouchableHighlight>
          <TouchableHighlight>
            <Buttonn3 />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default LatestdetailsScreen;
