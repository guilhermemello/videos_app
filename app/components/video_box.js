import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'

export class VideoBox extends React.Component {
  constructor(props) {
    super(props);

    this.showActionSheet = this.showActionSheet.bind(this);
  }

  showActionSheet() {
    this.ActionSheet.show()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Video', { videoId: this.props.video.id })}>
          <View style={{width: 250, flexDirection: 'row'}}>
            <Image source={{uri : this.props.video.capa_url}} resizeMode="stretch" style={{width:95, height:55}} />

            <View style={{marginLeft:10}}>
              <Text style={{color:'#333', margin:2, fontSize:13, width:230}}>
                {this.props.video.titulo}
              </Text>
              <Text style={{color:'#666', margin:2, marginTop:0, fontSize:12}}>
                {this.props.video.autor.nome} <MaterialIcon name="fiber-manual-record" color="#777" size={6} style={{margin:3}} /> {this.props.video.views} views
              </Text>
            </View>
            <MaterialIcon name="more-vert" size={15} onPress={this.showActionSheet} />
          </View>
        </TouchableOpacity>

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={[ 'Cancel', "Ver mais tarde", 'Compartilhar' ]}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={this.handlePress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5
  }
});
