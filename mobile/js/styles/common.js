import { StyleSheet } from 'react-native';

const common = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container_center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    navigator: {
        height: 55,
        backgroundColor: '#333'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8
    },
    title: {
        fontSize: 16,
        lineHeight: 20,
        marginTop: 10
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#AAA',
        borderStyle: 'solid'
    },
    button: {
        paddingTop: 5,
        paddingBottom: 5,
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