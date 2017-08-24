import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import Spinner from 'react-native-loading-spinner-overlay';

import {VIDEO_API} from '../data/video';
import {VideoBox} from '../components/video_box';

export class VideosRelacionados extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      videos: []
    }

    this.showActionSheet = this.showActionSheet.bind(this);
  }

  componentWillMount() {
    this.setState({ isLoading: true });

    VIDEO_API.relacionados(this.props.videoId).then(response => {
      console.log(JSON.stringify(response))
      this.setState({ isLoading: false, videos: response })
    });
  }

  showActionSheet() {
    this.ActionSheet.show()
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner visible={this.state.isLoading} />
      )
    } else {
      if (this.state.videos.length > 0)
        return (
          <View style={styles.container}>
            <Text style={{paddingHorizontal: 5, paddingVertical: 10}}>A seguir</Text>

            {
              this.state.videos.map((video, i) => {
                return (
                  <VideoBox {...this.props} key={i} video={video} />
                );
              })
            }

            <ActionSheet
              ref={o => this.ActionSheet = o}
              options={[ 'Cancel', "Ver mais tarde", 'Compartilhar' ]}
              cancelButtonIndex={0}
              destructiveButtonIndex={4}
              onPress={this.handlePress}
            />
          </View>
        )
      else {
        return (
          <Text></Text>
        )
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});
