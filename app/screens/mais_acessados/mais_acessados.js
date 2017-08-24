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
import Spinner from 'react-native-loading-spinner-overlay';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'

import {VIDEO_API} from '../../data/video';

var {height, width} = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export class MaisAcessados extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Popular',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="fire" size={20} color="#999999" />
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

  showActionSheet() {
    this.ActionSheet.show()
  }

  componentWillMount() {
    this.setState({ isLoading: true });

    VIDEO_API.maisAcessados(1).then(response => {
      console.log(JSON.stringify(response))
      this.setState({ isLoading: false, pagination: response.meta, videos: response.videos, dataSource: ds.cloneWithRows(response.videos) })
    });
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

    VIDEO_API.maisAcessados(page).then(response => {
      this.setState({ isLoading: false,
                      pagination: response.meta,
                      videos: this.state.videos.concat(response.videos),
                      dataSource: ds.cloneWithRows(this.state.videos.concat(response.videos)) })
    });

    console.log("TAMANHO => " + JSON.stringify(this.state.videos.length))
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
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        <StatusBar barStyle="light-content" />

        <ActionSheet
          ref={o => this.ActionSheet = o}
          options={[ 'Cancel', "Ver mais tarde", 'Compartilhar' ]}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          onPress={this.handlePress}
        />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.each(rowData)}
          style={{marginTop:5}}
          onEndReachedThreshold={1}
          onEndReached={() => this.onEndReached() }
        />

        {this.loadingIndicator()}
      </View>
    );
  }
}
