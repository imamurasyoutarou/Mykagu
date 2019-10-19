import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,

} from "react-native";

import NavigationService from "../navigations/NavigationService";
import { ListItem, } from "react-native-elements";
const SCREEN_WIDTH = Dimensions.get("window").width;

const dateString = date => {
  if (date == null) {
    return "";
  }
  // firebaseのTimestamp型をDate型に変換する
  const dateObject = date.toDate();
  return dateObject.toISOString().split("T")[0];
};

export default class ThreadCard extends React.Component {
  // フィールドの値をそれぞれ渡して表示させている、その後詳細画面に値を渡す。

  renderItem({ item }) {

    var button = item.Participants.length;
    function Buttonn() {
      if (button == 0) {
        return <Text>0/3</Text>;
      }
      if (button == 1) {
        return <Text>1/3</Text>;
      }
      if (button == 2) {
        return <Text>2/3</Text>;
      }
      if (button == 1) {
        return <Text>完了</Text>;
      }
    } <Buttonn />
    return (

      <ListItem
        roundAvatar
        leftAvatar={{
          source: require("../assets/talk.png"),
        }}

        title={item.title}
        subtitle={<Buttonn />}
        titleStyle={{ fontWeight: "bold", fontSize: 17 }}
        onPress={() =>
          NavigationService.navigate("thread1", {
            item: this.props.item,
            thread: item.uuuu,
            title: item.title,
            checked1: item.checked1,
            Participants: item.Participants
          })
        }
        bottomDivider

      />

    );
  }
  // 各ページから取得した配列を受け取ってフィールドそれぞれ配列にもう一度格納する
  render() {
    // console.log(this.props.jobCard);

    return (
      <View>
        <FlatList
          data={this.props.thread}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
