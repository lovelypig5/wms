import { StyleSheet } from 'react-native';

const common = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8
    },
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