import React, { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

var styles = StyleSheet.create({
    container: {
        width: 199,
        height: 200,
        top: 20,
        position: 'absolute',
        backgroundColor: '#F5FCFF',
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
});

export default class SecondPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    _pressButton() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    render() {
        return (
            <View>
              <TouchableOpacity
                                onPress={ this._pressButton.bind(this) }
                                style={ styles.container }>
                <Text>
                  点我跳回去
                </Text>
              </TouchableOpacity>
            </View>
            );
    }
}