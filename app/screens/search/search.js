import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

import Video from "react-native-video"
import SearchBar from 'react-native-searchbar';
import { NavigationActions } from 'react-navigation'
import _ from 'lodash';

import {VIDEO_API} from '../../data/video';
import {VideoBox} from '../../components/video_box';

export class Search extends React.Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      videos: []
    };
  }

  search(query) {
    VIDEO_API.search(query).then(response => {
      this.setState({ videos: response });
    });
  }

  renderVideos() {
    return (
      <View style={{ marginTop: 90 }}>
        {
          this.state.videos.map((video, i) => {
            return (
              <VideoBox {...this.props} key={i} video={video} />
            );
          })
        }
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="dark-content" />

        <ScrollView>
          {this.renderVideos()}
        </ScrollView>

        <SearchBar
          ref={(ref) => this.searchBar = ref}
          showOnLoad
          placeholder="Pesquisar"
          onBack={() => this.props.navigation.dispatch(NavigationActions.back())}
          handleChangeText={(query) => this.search(query)}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
});
