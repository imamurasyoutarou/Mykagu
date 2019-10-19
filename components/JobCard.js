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
import { Card } from "react-native-elements";
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

export default class JobCard extends React.Component {
  // フィールドの値をそれぞれ渡して表示させている、その後詳細画面に値を渡す。

  renderItem({ item }) {
    return (
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
    );
  }
  // 各ページから取得した配列を受け取ってフィールドそれぞれ配列にもう一度格納する
  render() {
    // console.log(this.props.jobCard);

    return (
      <View style={{ flexDirection: "row" }}>
        <FlatList
          data={this.props.jobCard}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
