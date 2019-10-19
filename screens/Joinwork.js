import React from "react";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import CalendarsScreen from "./CalendarsScreen";
import ProductionScreen from "./ProductionScreen";
import { ScrollableTabView } from "@valdio/react-native-scrollable-tabview";
import ThreadsScreen from "./ThreadsScreen";
const SCREEN_height = Dimensions.get("window").height; // Window height
class Joinwork extends React.Component {
  state = {
    item: "",
    name: ""
  };
  componentWillMount() {
    const { params } = this.props.navigation.state;
    this.setState({ item: params });
    this.setState({ name: params.name });

    if (SCREEN_height > 800) {
      this.setState({
        style: 44
      });
    } else {
      this.setState({
        style: 24
      });
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: this.state.style,
          backgroundColor: "white"
        }}
      >
        <View style={{ margin: 12, justifyContent: "center" }}>
          <Text
            style={{ textAlign: "center", fontSize: 16, fontWeight: "bold", color: '#56BD9A' }}
          >
            {this.state.name}
          </Text>
        </View>
        <ScrollableTabView
          tabBarUnderlineStyle={{ backgroundColor: "#56BD9A" }}
          tabBarInactiveTextColor={"#E5E5E5"}
          tabBarActiveTextColor={"#56BD9A"}
        >
          {/* <ThreadsScreen tabLabel='スレッド' /> */}
          <ThreadsScreen item={this.state.item} tabLabel="スレッド" />
          <CalendarsScreen item={this.state.item} tabLabel="制作日記" />
        </ScrollableTabView>
      </View>
    );
  }
}
export default Joinwork;