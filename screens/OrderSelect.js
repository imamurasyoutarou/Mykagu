import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    Dimensions
} from "react-native";
import firebase from "firebase";
import OrderCard from "../components/OrderCard";
const SCREEN_WIDTH = Dimensions.get("window").width;

class OrderSelect extends React.Component {
    state = {
        name: "",
        image: "",
        jobCard: []
    };

    componentWillMount() {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const db = firebase.firestore();
        db.collection(`users`)
            .where("uid", "==", uid)
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
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#FEFEF0"
                }}
            >
                <TouchableHighlight
                    onPress={() => this.props.navigation.navigate("explanation")}
                >
                    <Image
                        source={require("../assets/Explanation.png")}
                        style={{ width: SCREEN_WIDTH - 50, height: 160 }}
                    />
                </TouchableHighlight>
                <View style={{ marginTop: 20, }}>


                    <OrderCard item={this.state.jobCard} />
                </View>
            </View>
        );
    }
}

export default OrderSelect;
