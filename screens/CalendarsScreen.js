import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image
} from "react-native";
import { FloatingAction } from "react-native-floating-action";
import NavigationService from "../navigations/NavigationService";
import firebase from "firebase";
import "@firebase/firestore";
import CarenderCard from "../components/CarenderCard";
export default class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      calender: [],
      uuuu: ""
    };
  }
  componentWillMount() {
    var u = this.props.item.item;
    var uu = JSON.stringify(u);
    var uuuu = uu.slice(1);
    var uuuuu = uuuu.slice(0, -1);
    this.setState({ uuuu: uuuuu });
    const db = firebase.firestore();
    db.collection(`project/${uuuuu}/diary`).onSnapshot(snapshot => {
      const calender = [];
      snapshot.forEach(doc => {
        calender.push({ ...doc.data(), key: doc.id });
      });
      this.setState({ calender });
    });
  }
  render() {
    var h = this.state.calender.length;
    function Greeting() {
      if (h == 0) {
        return (
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 160,
              bottom: 0
            }}
          >
            <View
              style={{
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../assets/agendas.png")}
                style={{ width: 130, height: 130 }}
              />
              <Text
                style={{
                  marginTop: 30,
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                制作日記を追加してみよう
             </Text>
            </View>
          </View>
        );
      } else {
        return null;
      }
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#FEFEF0" }}>
        <ScrollView>
          <CarenderCard calender={this.state.calender} item={this.props.item} />
        </ScrollView>
        <Greeting />
        <FloatingAction
          onOpen={() =>
            NavigationService.navigate("production", {
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