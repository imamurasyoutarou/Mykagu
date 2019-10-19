import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Button,
  TouchableHighlight,
  StyleSheet
} from "react-native";

import NavigationService from "../navigations/NavigationService";
import { ListItem, Card } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get("window").width;

const dateString = date => {
  if (date == null) {
    return "";
  }
  // firebaseのTimestamp型をDate型に変換する
  const dateObject = date.toDate();
  return dateObject.toISOString().split("T")[0];
};

export default class ChatCard extends React.Component {
  // フィールドの値をそれぞれ渡して表示させている、その後詳細画面に値を渡す。

  renderItem({ item }) {
    return (
      <Card containerStyle={{ padding: 2 }}>
        <ListItem
          roundAvatar
          title={item.text}
          titleStyle={{}}
          subtitleStyle={{ fontWeight: "bold" }}
          chevron
          onPress={() =>
            NavigationService.navigate("thread1", {
              item: this.props.item,
              thread: item.uuuu
            })
          }
        />
      </Card>
    );
  }
  // 各ページから取得した配列を受け取ってフィールドそれぞれ配列にもう一度格納する
  render() {
    // console.log(this.props.jobCard);

    return (
      <View>
        <FlatList
          data={this.props.message}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
