import { StyleSheet } from 'react-native';

const common = StyleSheet.create({
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#AAA',
        borderStyle: 'solid'
    },
    button: {
        paddingLeft: 30,
        paddingRight: 30,
        height: 40,
        borderWidth: 1,
        borderColor: '#AAA',
        borderStyle: 'solid',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
    }
});

export default common;