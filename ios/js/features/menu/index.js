import React, { Component, ScrollView, Text, View } from 'react-native';
import styles from '../../styles';

class Menu extends Component {

    render() {
        return <ScrollView scrollsToTop={ false }
                           style={ styles.menu.menu }>
                 <View style={ styles.menu.avatarContainer }>
                   <Text style={ styles.menu.name }>
                     Your name
                   </Text>
                 </View>
                 <Text onPress={ () => this.props.onItemSelected('About') }
                       style={ styles.menu.item }>
                   About
                 </Text>
                 <Text onPress={ () => this.props.onItemSelected('Contacts') }
                       style={ styles.menu.item }>
                   Contacts
                 </Text>
               </ScrollView>
    }
}

export default new Menu();