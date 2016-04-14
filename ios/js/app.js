import React, { AppRegistry } from 'react-native';
import Router from './router';
import styles from './styles';

class App extends React.Component {
    render() {
        return (
            <Router style={ styles.common.container } />
            );
    }
}

AppRegistry.registerComponent('ios', () => App);