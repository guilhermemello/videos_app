import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Iconz from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

export class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={{color:'#fff', margin:15, marginTop: 20, fontWeight:'500', fontSize:17}}>QC Videos</Text>
        </View>

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity>
            <Iconz name="search" style={{margin:5}} size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity>
            <IconFontAwesome name="user-circle" style={{margin:5}} size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   height:60,
   paddingTop:13,
   flexDirection:'row',
   backgroundColor:'#CD201F',
   justifyContent:'space-between',
   borderBottomWidth:1,
   borderColor:'#e2777d'
  }
});
