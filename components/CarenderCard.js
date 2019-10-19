import React from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Button,
  TouchableHighlight,
  Image
} from "react-native";
import { Avatar } from "react-native-elements";
import NavigationService from "../navigations/NavigationService";
import { ListItem, Card, Tooltip } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";

const SCREEN_WIDTH = Dimensions.get("window").width;

const dateString = date => {
  if (date == null) {
    return "";
  }
  // firebaseのTimestamp型をDate型に変換する
  const dateObject = date.toDate();
  return dateObject.toISOString().split("T")[0];
};

export default class CarenderCard extends React.Component {
  // フィールドの値をそれぞれ渡して表示させている、その後詳細画面に値を渡す。


  // showConfirmAlert = () => {
  //   Alert.alert(
  //     "確認",
  //     "編集しますか？",
  //     [
  //       { text: "キャンセル", style: "cancel" },
  //       {
  //         text: "編集",
  //         onPress: this.pushdelete.bind(this),
  //         style: "destructive"
  //       }
  //     ],
  //     { cancelable: false }
  //   );
  // };

  renderItem({ item }) {
    var time = item.createdOn.toDate();
    var uu = JSON.stringify(time);
    var uuuu = uu.slice(6);
    var uuuuu = uuuu.slice(0, -15);
    var h = uuuuu.replace(/-/g, "/");


    return (
      <View
        style={{
          alignItems: "center"
        }}
      >

        <View>
          <View></View>
          <View>
            <Card
              containerStyle={{ width: SCREEN_WIDTH }}
              imageStyle={{ width: SCREEN_WIDTH, height: 300 }}
              image={{ uri: item.imageUrl }}>

              <Text style={{ marginBottom: 10 }}>
                {item.title}
              </Text>


              <View style={{ flexDirection: 'row' }}>

                <Text style={{ color: '#DCDCDC', fontSize: 10 }}>{h}</Text>

                <TouchableHighlight
                  onPress={() =>
                    NavigationService.navigate("calemdarEdit", {
                      item: this.props.item,
                      image: item.imageUrl,
                      title: item.title,
                      uuuu: item.uuuu
                    })
                  }>
                  <View style={{ marginLeft: SCREEN_WIDTH - 70 }}>
                    <Text style={{ fontWeight: "bold", color: '#DCDCDC', }}>･･･</Text>
                  </View>
                </TouchableHighlight>
              </View>



            </Card>
          </View>

        </View>

        <TouchableHighlight
          onPress={() =>
            NavigationService.navigate("calemdarEdit", {
              item: this.props.item,
              image: item.imageUrl,
              title: item.title,
              uuuu: item.uuuu
            })
          }>
          <View>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>編集</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  // 各ページから取得した配列を受け取ってフィールドそれぞれ配列にもう一度格納する
  render() {
    // console.log(this.props.jobCard);

    return (
      <View>
        <FlatList
          data={this.props.calender}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
