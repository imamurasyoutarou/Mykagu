import React from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';



const TopButton = (props) => {
    return (

        <TouchableHighlight
            onPress={props.Press}
        >
            <View style={{
                height: 45, width: 295, backgroundColor: '#56BD9A', justifyContent: 'center', alignItems: 'center',
                borderRadius: 26.5
            }}>
                <Button
                    title={props.title}
                    color="white"
                    onPress={props.Press}
                />
            </View>

        </TouchableHighlight >



    )
}


export default TopButton;