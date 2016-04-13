import { StyleSheet } from 'react-native';

const layout = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8
    },
    button: {
        marginTop: 12
    },
    label: {
        fontSize: 20,
        width: 80
    },
    input: {
        flex: 1
    },
    navigator: {
        height: 30
    }
});

export default layout;