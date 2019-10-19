import React from "react";
import {
  View,
  FlatList,
  Dimensions,
  TouchableHighlight,
  Image
} from "react-native";
import NavigationService from "../navigations/NavigationService";

const SCREEN_WIDTH = Dimensions.get("window").width;

const dateString = date => {
  if (date == null) {
    return "";
  }
  // firebaseのTimestamp型をDate型に変換する
  const dateObject = date.toDate();
  return dateObject.toISOString().split("T")[0];
};

export default class OrderCard extends React.Component {
  // フィールドの値をそれぞれ渡して表示させている、その後詳細画面に値を渡す。

  renderItem({ item }) {
    var h = item.name;
    var b = item.photoURL;
    var r =
      "https://firebasestorage.googleapis.com/v0/b/fir-clone-1a266.appspot.com/o/default-user-icons%2F1.png?alt=media&token=b5e090f4-d2b1-4544-92bd-379a3d22b470";

    function Gree() {
      if (b == r && h == undefined) {
        return (
          //情報が入っていなかったら
          <View
            opacity={0.5}
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}>
            <TouchableHighlight
              onPress={() => alert('プロフィール情報を入力したらオーダーすることができます')}
            >

              <Image

                source={require("../assets/order.png")}
                style={{ width: SCREEN_WIDTH - 50, height: 160 }}
              />

            </TouchableHighlight>
          </View>
        );
      } else {
        return (
          <View style={{
            justifyContent: "center",
            alignItems: "center",
          }}>
            <TouchableHighlight
              onPress={() => NavigationService.navigate("order")}
            >
              <Image
                source={require("../assets/order.png")}
                style={{ width: SCREEN_WIDTH - 50, height: 160 }}
              />
            </TouchableHighlight>
          </ View>
        )//情報が入っていたら
      }
    }
    return <Gree />;
  }
  // 各ページから取得した配列を受け取ってフィールドそれぞれ配列にもう一度格納する
  render() {
    // console.log(this.props.jobCard);

    return (
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={this.props.item}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
