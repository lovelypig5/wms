import { StyleSheet, Dimensions } from 'react-native';

var {height, width} = Dimensions.get('window');

const menu = StyleSheet.create({
    menu: {
        width: width,
        height: height,
        backgroundColor: 'gray',
        padding: 20,
    },
    avatarContainer: {
        flex: 1,
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },
});

export default menu;