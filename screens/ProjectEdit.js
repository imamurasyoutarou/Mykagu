import React from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Image,
  ScrollView,
  Alert,

} from "react-native";
import { CheckBox } from "react-native-elements";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import "@firebase/firestore";
import NavigationService from "../navigations/NavigationService";
import { Dropdown } from "react-native-material-dropdown";
const SCREEN_WIDTH = Dimensions.get("window").width;

class ProjectEdit extends React.Component {
  state = {
    furniture_category: "",
    project_name: "",
    project_detail: "",
    offering_job_role: "",
    imageUrl1: "",
    imageUrl2: null,
    imageUrl3: null,
    imageUrl4: "",
    imageUrl5: null,
    imageUrl6: null,
    checked1: false,
    checked2: false,
    checked3: false,
    budget: "",
    delivery_desired_time: "",
    application_period: "",
    uuuu: ""
  };

  componentWillMount() {
    const { params } = this.props.navigation.state;


    this.setState({
      project_name: params.item.project_name
    });
    this.setState({
      uuuu: params.item.uuuu
    });
    this.setState({
      furniture_category: params.item.furniture_category
    });
    this.setState({
      project_detail: params.item.project_detail
    });
    this.setState({ imageUrl1: params.item.imageUrl1 });
    this.setState({ imageUrl2: params.item.imageUrl2 });
    this.setState({ imageUrl3: params.item.imageUrl3 });
    this.setState({ imageUrl4: params.item.imageUrl1 });
    this.setState({ imageUrl5: params.item.imageUrl2 });
    this.setState({ imageUrl6: params.item.imageUrl3 });

    this.setState({ checked1: params.item.checked1 });
    this.setState({ checked2: params.item.checked2 });
    this.setState({ checked3: params.item.checked3 });
    this.setState({ budget: params.item.budget });
    this.setState({
      delivery_desired_time: params.item.delivery_desired_time
    });
    this.setState({
      application_period: params.item.application_period
    });
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === "granted" });
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  } //Modalの処理

  uploadImage = async (uri, imageName) => {
    const postIndex = Date.now().toString();
    const storage = firebase.storage();

    const uploadRef = storage.ref("images").child(`${postIndex}`);

    const response = await fetch(uri);
    const blob = await response.blob();
    await uploadRef.put(blob).catch(() => {
      alert("画像の保存に失敗しました");
    });
    await uploadRef
      .getDownloadURL()
      .then(url => {
        this.setState({
          imageUrl4: url,
          postIndex
        });
      })
      .catch(() => {
        alert("失敗しました");
      });
  };
  uploadImage1 = async (uri, imageName) => {
    const postIndex = Date.now().toString();
    const storage = firebase.storage();

    const uploadRef = storage.ref("images").child(`${postIndex}`);

    const response = await fetch(uri);
    const blob = await response.blob();
    await uploadRef.put(blob).catch(() => {
      alert("画像の保存に失敗しました");
    });
    await uploadRef
      .getDownloadURL()
      .then(url => {
        this.setState({
          imageUrl5: url,
          postIndex
        });
      })
      .catch(() => {
        alert("失敗しました");
      });
  };
  uploadImage2 = async (uri, imageName) => {
    const postIndex = Date.now().toString();
    const storage = firebase.storage();

    const uploadRef = storage.ref("images").child(`${postIndex}`);
    const response = await fetch(uri);
    const blob = await response.blob();
    await uploadRef.put(blob).catch(() => {
      alert("画像の保存に失敗しました");
    });
    await uploadRef
      .getDownloadURL()
      .then(url => {
        this.setState({
          imageUrl6: url,
          postIndex
        });
      })
      .catch(() => {
        alert("失敗しました");
      });
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    var user = firebase.auth().currentUser;
    var uid = user.uid;

    if (!result.cancelled) {
      this.setState({
        imageUrl1: result.uri
      });
      this.uploadImage(result.uri, uid);
    }
  };

  pickImage2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    var user = firebase.auth().currentUser;
    var uid = user.uid;

    if (!result.cancelled) {
      this.setState({
        imageUrl2: result.uri
      });
      this.uploadImage1(result.uri, uid);
    }
  };

  pickImage3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });

    var user = firebase.auth().currentUser;
    var uid = user.uid;

    if (!result.cancelled) {
      this.setState({
        imageUrl3: result.uri
      });
      this.uploadImage2(result.uri, uid);
    }
  };


  pushdelete() {
    const uuuu = this.state.uuuu;
    var db = firebase.firestore();

    db.collection(`project`)
      .doc(uuuu)
      .delete()
      .then(() => NavigationService.navigate("home"));
  }

  handlePress() {
    const uuuu = this.state.uuuu;
    var db = firebase.firestore();
    db.collection(`project`)
      .doc(uuuu)
      .update({
        project_name: this.state.project_name,
        furniture_category: this.state.furniture_category,
        project_detail: this.state.project_detail,
        imageUrl1: this.state.imageUrl4,
        imageUrl2: this.state.imageUrl5,
        imageUrl3: this.state.imageUrl6,
        checked1: this.state.checked1,
        checked2: this.state.checked2,
        checked3: this.state.checked3,
        budget: this.state.budget,
        delivery_desired_time: this.state.delivery_desired_time,
        application_period: this.state.application_period,

        createdOn: new Date()
      })
      .then(() => {
        // WORKAROUND: bodyもここで更新しておく
        this.setState({
          project_name: this.state.project_name,
          project_name: ""
        });
        this.setState({
          furniture_category: this.state.furniture_category,
          furniture_category: ""
        });
        this.setState({
          project_detail: this.state.project_detail,
          project_detail: ""
        });
        this.setState({ imageUrl1: "", imageUrl1: null });
        this.setState({ imageUrl2: null, imageUrl2: null });
        this.setState({ imageUrl3: null, imageUrl3: null });
        this.setState({ imageUrl4: "", imageUrl4: null });
        this.setState({ imageUrl5: null, imageUrl5: null });
        this.setState({ imageUrl6: null, imageUrl6: null });
        this.setState({ checked1: this.state.checked1, checked1: "" });
        this.setState({ checked2: this.state.checked2, checked2: "" });
        this.setState({ checked3: this.state.checked3, checked3: "" });
        this.setState({ budget: this.state.budget, budget: "" });
        this.setState({
          delivery_desired_time: this.state.delivery_desired_time,
          delivery_desired_time: ""
        });
        this.setState({
          application_period: this.state.application_period,
          application_period: ""
        });

        NavigationService.navigate("home");
      })
      .catch(error => {
        global.console.log('エラー');
      });
  }
  showConfirmAlert = () => {
    Alert.alert(
      "確認",
      "削除しますか？",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "削除",
          onPress: this.pushdelete.bind(this),
          style: "destructive"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const hasCameraPermission = this.state && this.state.hasCameraPermission;
    // アラート用の配列作成
    const checked = [
      this.state.checked1,
      this.state.checked2,
      this.state.checked3
    ];
    const blank = [
      this.state.project_name,
      this.state.furniture_category,
      this.state.project_detail,
      this.state.imageUrl1,
      this.state.delivery_desired_time,
      this.state.application_period,
      this.state.budget
    ];
    let data = [
      {
        value: "テーブル"
      },
      {
        value: "椅子"
      },
      {
        value: "収納棚"
      },
      {
        value: "子供家具"
      }
    ];
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FEFEF0",
            padding: 30
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10
              }}
            >
              プロジェクト名
            </Text>

            <TextInput
              defaultValue={this.state.project_name}
              value={this.state.project_name}
              onChangeText={text => {
                this.setState({ project_name: text });
              }}
              clearButtonMode
              style={{
                width: SCREEN_WIDTH - 60,
                height: 44,
                padding: 8,
                borderColor: "#E5E5E5",
                borderWidth: 1,
                backgroundColor: 'white'
              }}
            />
          </View>

          <View style={{ marginBottom: 30 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}
            >
              カテゴリー
            </Text>

            <Dropdown
              defaultValue={this.state.furniture_category}
              value={this.state.furniture_category}
              containerStyle={{ height: 44, width: SCREEN_WIDTH - 60 }}
              itemTextStyle={"キャンセル"}
              onChangeText={text => {
                this.setState({ furniture_category: text });
              }}
              data={data}
            />

          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10
              }}
            >
              こだわりたい内容
            </Text>

            <TextInput
              defaultValue={this.state.project_detail}
              value={this.state.project_detail}
              onChangeText={text => {
                this.setState({ project_detail: text });
              }}
              clearButtonMode
              multiline
              style={{
                width: SCREEN_WIDTH - 60,
                height: 150,
                padding: 8,
                borderColor: "#E5E5E5",
                borderWidth: 1,
                backgroundColor: 'white'
              }}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10
              }}
            >
              参考画像
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 10 }}>
            <TouchableHighlight onPress={this.pickImage}>
              <View style={{ margin: 5 }}>
                <Avatar
                  source={{
                    uri: this.state.imageUrl1
                  }}
                  value={this.state.imageUrl4}
                  size={100}
                  activeOpacity={0.7}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.pickImage2}>
              <View style={{ margin: 5 }}>
                <Avatar
                  source={{
                    uri: this.state.imageUrl2
                  }}
                  value={this.state.imageUrl5}
                  size={100}
                  activeOpacity={0.7}
                />
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={this.pickImage3}>
              <View style={{ margin: 5 }}>
                <Avatar
                  source={{
                    uri: this.state.imageUrl3
                  }}
                  value={this.state.imageUrl6}
                  size={100}
                  activeOpacity={0.7}
                />
              </View>
            </TouchableHighlight>
          </View>

          <View
            style={{
              marginBottom: 15,
              width: SCREEN_WIDTH - 60,
              height: 150,
              padding: 8
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10
              }}
            >
              募集メンバー
            </Text>

            <CheckBox
              title="デザイナー"
              checked={this.state.checked1}
              onPress={() =>
                this.setState({
                  checked1: !this.state.checked1
                })
              }
            />
            <CheckBox
              title="職人"
              checked={this.state.checked2}
              onPress={() =>
                this.setState({
                  checked2: !this.state.checked2
                })
              }
            />
            <CheckBox
              title="買う人"
              checked={this.state.checked3}
              onPress={() =>
                this.setState({
                  checked3: !this.state.checked3
                })
              }
            />
          </View>

          <View style={{ marginTop: 50, marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10
              }}
            >
              予算
            </Text>

            <TextInput
              defaultValue={this.state.budget}
              value={this.state.budget}
              onChangeText={text => {
                this.setState({ budget: text });
              }}
              clearButtonMode
              style={{
                width: SCREEN_WIDTH - 60,
                height: 44,
                padding: 8,
                borderColor: "#E5E5E5",
                borderWidth: 1,
                backgroundColor: 'white'
              }}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10
              }}
            >
              納品希望時期
            </Text>

            <TextInput
              defaultValue={this.state.delivery_desired_time}
              value={this.state.delivery_desired_time}
              onChangeText={text => {
                this.setState({ delivery_desired_time: text });
              }}
              clearButtonMode
              style={{
                width: SCREEN_WIDTH - 60,
                height: 44,
                padding: 8,
                borderColor: "#E5E5E5",
                borderWidth: 1,
                backgroundColor: 'white'
              }}
            />
          </View>

          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 10
              }}
            >
              メンバー応募期限
            </Text>

            <TextInput
              defaultValue={this.state.application_period}
              value={this.state.application_period}
              onChangeText={text => {
                this.setState({ application_period: text });
              }}
              clearButtonMode
              style={{
                width: SCREEN_WIDTH - 60,
                height: 44,
                padding: 8,
                borderColor: "#E5E5E5",
                borderWidth: 1,
                backgroundColor: 'white'
              }}
            />
          </View>


          < View style={{ marginTop: 170, }}>
            <TouchableHighlight
              onPress={this.handlePress.bind(this)}

            >
              <View
                style={{
                  height: 40,
                  width: 120,
                  backgroundColor: "#56BD9A",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  編集する
              </Text>
              </View>
            </TouchableHighlight>


            <TouchableHighlight
              onPress={() => {
                this.showConfirmAlert();
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  height: 40,
                  width: 120,
                  backgroundColor: "red",
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  削除する
              </Text>
              </View>
            </TouchableHighlight>

          </View>
        </View>
      </ScrollView>
    );
  }
}

export default ProjectEdit;
