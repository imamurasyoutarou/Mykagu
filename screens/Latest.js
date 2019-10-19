import React from "react";
import {
  RefreshControl,
  ScrollView,
  View,
  FlatList,
  Text,
  Dimensions,
  Button,
  TouchableHighlight,
  Image
} from "react-native";
import NavigationService from "../navigations/NavigationService";
import firebase from "firebase";
const SCREEN_WIDTH = Dimensions.get("window").width;

class Latest extends React.Component {
  state = {
    jobCard: [],
    refreshing: false,
    limit: 5
  };
  // リフレッシュの処理
  _onRefresh() {
    this.setState({ limit: this.state.limit + 5 });
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();

    db.collection(`project`)
      .orderBy("createdOn", "desc")
      .limit(this.state.limit)
      .get()
      .then(snapshot => {
        const jobCard = [];
        snapshot.forEach(doc => {
          jobCard.push({ ...doc.data(), key: doc.id });

        });
        this.setState({ jobCard });
      })

      .catch(error => {
        console.log('なし');
      });
  }
  // コレクションからデータ取得後配列に格納
  componentWillMount() {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();

    db.collection(`project`)
      .orderBy("createdOn", "desc")
      .limit(5)

      .onSnapshot(snapshot => {
        const jobCard = [];
        snapshot.forEach(doc => {
          jobCard.push({ ...doc.data(), key: doc.id });

        });
        this.setState({ jobCard });
      });
  }

  render() {
    return (
      <View
        style={{ flex: 1, paddingVertical: 5, backgroundColor: "#FEFEF0" }}
      >
        <FlatList
          data={this.state.jobCard}
          extraData={this.state.jobCard}
          renderItem={({ item }) => (
            <View
              style={{
                alignItems: "center",
                margin: 5
              }}
            >
              <TouchableHighlight
                onPress={() =>
                  NavigationService.navigate("latestdetails", { item: item })
                }
              >
                <View
                  style={{
                    margin: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4
                  }}
                >
                  <Image
                    source={{ uri: item.imageUrl1 }}
                    style={{
                      width: SCREEN_WIDTH - 40,
                      borderRadius: 5,
                      resizeMode: "cover",
                      height: 250
                    }}
                  />

                  <View
                    style={{
                      backgroundColor: "black",
                      height: 30,
                      position: "absolute",
                      top: 220,
                      opacity: 0.1,
                      borderBottomEndRadius: 5,
                      borderBottomLeftRadius: 5,
                      width: SCREEN_WIDTH - 40
                    }}
                  ></View>
                  <View
                    style={{
                      position: "absolute",
                      top: 225,
                      left: 30,
                      alignItems: "center"
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 18,
                        color: "white",

                        shadowOffset: {
                          width: 2,
                          height: 2
                        },
                        shadowOpacity: 1,
                        shadowRadius: 2.62,
                        elevation: 4
                      }}
                    >
                      {item.project_name}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
          )}
          onEndReached={() => this._onRefresh()}
          onEndReachedThreshold={0}
        />
      </View>
    );
  }
}

export default Latest;
