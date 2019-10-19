import React from "react";
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    Alert,
    ScrollView,
    Image,
    Dimensions
} from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
class OrderCheckScreen extends React.Component {
    state = {};
    // ここがtureになればモーダルが表示

    render() {
        return (

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#FEFEF0'
                }}
            >
                <View>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                        オーダーを受け付けました
                </Text>

                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate("orderselect")}
                        style={{ alignItems: "center", justifyContent: "center" }}
                    >
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
                                戻る
                    </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>



        );
    }
}

export default OrderCheckScreen;
