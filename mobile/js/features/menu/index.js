import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from '../../styles';

const Menu = React.createClass({

    render() {
        return (
            <ScrollView scrollsToTop={ false }
                        style={ styles.menu.menu }>
              <View style={ styles.menu.avatarContainer }>
                <Text style={ styles.menu.name }>
                  { this.props.user.name }
                </Text>
              </View>
              <Text onPress={ () => this.props.onItemSelected('goods') }
                    style={ styles.menu.item }>
                商品管理
              </Text>
              <Text onPress={ () => this.props.onItemSelected('logout') }
                    style={ styles.menu.item }>
                退出登录
              </Text>
            </ScrollView>
        )
    }

})

export default Menu;
