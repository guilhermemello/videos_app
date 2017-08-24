import React from 'react';
import {
  View,
  ListView,
  TouchableOpacity,
  Image,
  Text,
  Dimensions,
  StatusBar,
  ActivityIndicator
} from 'react-native';

import _ from 'lodash';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'

import {VIDEO_API} from '../../data/video';

var {height, width} = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export class Aulas extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="home" size={20} color="#999999" />
    )
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      dataSource: ds,
      pagination: {},
      videos: []
    };

    this.showActionSheet = this.showActionSheet.bind(this);
  }

  componentWillMount() {
    this.setState({ isLoading: true });

    VIDEO_API.porDisciplina(2).then(response => {
      this.setState({ isLoading: false, pagination: response.meta, videos: response, dataSource: ds.cloneWithRows(response) })
    });
  }

  showActionSheet() {
    this.ActionSheet.show()
  }

  each(video) {
    return(
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Video', { videoId: video.id })} style={{height:295, width:width, borderBottomWidth:1, borderColor:'#e6e6e6'}}>
        <Image source={{uri : video.capa_url}} resizeMode="stretch" style={{width:350, alignSelf:'center', height:200, margin:15, marginBottom:0}} />

        <View style={{backgroundColor: '#2E2E2E', marginTop: -25, marginRight: 20, alignSelf: 'flex-end'}}>
          <Text style={{color: 'white', fontSize: 12, alignSelf: 'center', paddingHorizontal: 3}}>0:{video.duracao}</Text>
        </View>

        <View style={{padding:15, height:80, alignItems:'center', width:350, flexDirection:'row'}}>
          <Image source={{uri : video.autor.avatar}} resizeMode="contain" style={{height:40,width:40, borderRadius:20}} />

          <View style={{margin:2, marginLeft:10}}>
            <Text style={{color:'#333', margin:2, fontSize:13, width:260}}>
              {video.titulo}
            </Text>
            <Text style={{color:'#666', margin:2, marginTop:0, fontSize:12}}>
              {video.autor.nome} <MaterialIcon name="fiber-manual-record" color="#777" size={6} style={{margin:3}} /> {video.views} views <MaterialIcon name="fiber-manual-record" color="#777" size={6} style={{margin:5}} /> {video.publicado_em}
            </Text>
          </View>
          <TouchableOpacity>
            <MaterialIcon name="more-vert" style={{margin:5, marginBottom: 30}} size={20} onPress={this.showActionSheet} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  getVideos(page) {
    this.setState({ isLoading: true });

    VIDEO_API.getAll(page).then(response => {
      this.setState({ isLoading: false,
                      pagination: response.meta,
                      videos: this.state.videos.concat(response.videos),
                      dataSource: ds.cloneWithRows(this.state.videos.concat(response.videos)) })
    });
  }

  onEndReached() {
    if (!this.state.isLoading) {
      this.getVideos(this.state.pagination.current_page + 1)
    }
  }

  loadingIndicator() {
    if (this.state.isLoading) {
      return(<ActivityIndicator
             size="small"
             style={{padding: 10}} />
      )
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Text>...</Text>
      )
    } else {
      return (
        <View style={{flex:1, backgroundColor: 'white'}}>
          <ActionSheet
            ref={o => this.ActionSheet = o}
            options={[ 'Cancel', "Ver mais tarde", 'Compartilhar' ]}
            cancelButtonIndex={0}
            destructiveButtonIndex={4}
            onPress={this.handlePress}
          />

          <StatusBar barStyle="light-content" />

          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.each(rowData)}
          />

        </View>
      );
    }
  }
}
