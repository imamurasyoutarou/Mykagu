import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';


class Explanation extends React.Component {
    render() {
        return (

            <ScrollView>


                <View style={styles.container}>

                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        borderBottomWidth: 3,
                        borderBottomColor: '#56BD9A',
                        marginTop: 30,
                        marginBottom: 30
                    }}>オーダーの流れ</Text>



                    <View style={styles.item}>
                        <Text style={styles.text}>プロジェクト名</Text>

                        <Image
                            style={{ width: 150, height: 150 }}
                            source={require('../assets/light-bulb-idea.png')}
                        />

                        <Text style={{
                            marginBottom: 10,
                            paddingLeft: 25,
                            paddingRight: 25,
                        }}>このお仕事を一言で表してみましょう</Text>

                        <Text style={{ marginBottom: 10 }}> 案件一覧で表示させる文章です</Text>

                        <Text style={{ marginBottom: 10 }}>例 このベランダに合う家具</Text>
                    </View>

                    <View style={styles.item}>
                        <Text style={styles.text}>家具のカテゴリ</Text>

                        <Image
                            style={{ width: 150, height: 150 }}
                            source={require('../assets/chair1.png')}
                        />

                        <Text style={{

                            marginBottom: 10,
                            paddingLeft: 25,
                            paddingRight: 25,
                        }}>家具の種類をカテゴリで選びましょう</Text>

                        <Text style={{ marginBottom: 10, }}>現段階でマイカグでは以下が選べます</Text>

                        <Text style={{ marginBottom: 10, }}>テーブル・椅子・収納棚・子供家具</Text>

                    </View>

                    <View style={styles.item}>
                        <Text style={styles.text}>こだわり内容</Text>

                        <Image
                            style={{ width: 170, height: 170 }}
                            source={require('../assets/sketch.png')}
                        />

                        <Text style={{
                            marginBottom: 10,
                        }}>寸法、素材などのこだわりを書きましょう</Text>

                        <Text style={{ marginBottom: 10, }}>ここでしっかりこだわりを記述しておくことで</Text>

                        <Text style={{ marginBottom: 10, }}>オーダーしてからがスムーズです</Text>

                    </View>

                    <View style={styles.item}>
                        <Text style={styles.text}>募集メンバーと時期</Text>

                        <Image
                            style={{ width: 170, height: 170 }}
                            source={require('../assets/value.png')}
                        />

                        <Text style={{

                            marginBottom: 10,
                        }}>募集したい職種を記述します</Text>

                        <Text style={{
                            marginBottom: 10,
                            marginLeft: 25,
                            marginRight: 25
                        }}>デザイナーと職人するから買う人だけ</Text>

                        <Text style={{ marginBottom: 10, }}>募集とかももちろんOKです</Text>

                    </View>

                    <View style={styles.item}>
                        <Text style={styles.text}>予算</Text>

                        <Image
                            style={{ width: 150, height: 150 }}
                            source={require('../assets/coin.png')}
                        />

                        <Text style={{

                            marginBottom: 10,
                        }}>現段階での予算を記述</Text>

                        <Text style={{
                            marginBottom: 10,
                            paddingLeft: 25,
                            paddingRight: 25
                        }}>どれくらいかかるのか分からない人は</Text>

                        <Text style={{ marginBottom: 10, }}>相談して決めると記述しましょう</Text>

                    </View>

                    <View style={styles.item}>
                        <Text style={styles.text}>納期</Text>

                        <Image
                            style={{ width: 150, height: 150 }}
                            source={require('../assets/calendar.png')}
                        />

                        <Text style={{

                            marginBottom: 10,
                        }}>いつまでに欲しいかを記述しましょう</Text>

                        <Text style={{ marginBottom: 10, }}>お仕事の進み具合で多少変動が出る場合</Text>

                        <Text style={{
                            marginBottom: 10,
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}>もあると思いますがご理解の方お願いします</Text>
                    </View>



                </View>
            </ScrollView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#FEFEF0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold'
    },
    item: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#56BD9A',
        margin: 10,
        padding: 20,
    },
});



export default Explanation;

