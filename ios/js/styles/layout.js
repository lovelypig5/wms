import { StyleSheet } from 'react-native';

const layout = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 20,
        width: 80
    },
    input: {
        flex: 1
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default layout;