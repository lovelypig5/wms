import { StyleSheet } from 'react-native';

var goods = StyleSheet.create({
    title: {
        color: 'white',
        marginTop: 30,
        textAlign: "center"
    },
    tableRow: {
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: "center"
    },
    tableTitle: {
        flex: 1,
        textAlign: "center"
    },
    tableText: {
        flex: 1,
        textAlign: "center"
    },
    label: {
        fontSize: 16,
        width: 80,
        margin: 10
    },
    input: {
        flex: 1
    }
});

export default goods;