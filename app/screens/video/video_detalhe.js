import React from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Share,
  Button
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Video from "react-native-video"

var {height, width} = Dimensions.get('window');

import {VIDEO_API} from '../../data/video';
import {VideosRelacionados} from '../../components/videos_relacionados';

export class VideoDetalhe extends React.Component {
  static navigationOptions = {
    // title: 'Vídeo'
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      video: {},
      visible: false
    }
  }

  componentWillMount() {
    let {params} = this.props.navigation.state;

    VIDEO_API.get(params.videoId).then(video => {
      // alert(JSON.stringify(video))
      this.setState({ isLoading: false, video: video })
    });

    VIDEO_API.createView(params.videoId);
  }

  like(videoId) {
    VIDEO_API.like(videoId);
  }

  dislike(videoId) {
    VIDEO_API.dislike(videoId);
  }

  share(video) {
    Share.share({
      message: `Assista à videoaula sobre ${video.titulo}, ministrada por ${video.autor.nome}`,
      url: 'http://www.qconcursos.com',
      title: 'Compartilhe'
    });
  }

  render() {
    if (this.state.isLoading) {
      return (null)
    } else {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <TouchableOpacity delayPressIn={70} activeOpacity={0.8}>
            <Image source={{uri : this.state.video.capa_url}} resizeMode="stretch" style={{width: width,  height: 200}} />
          </TouchableOpacity>

          <Image source={require('../../assets/images/play.png')} style={{zIndex: 1, position: 'absolute', width: 50, height: 50, marginTop: 175, marginLeft: 300}} />

          <ScrollView>
            <View style={{padding: 10}}>
              <Text style={styles.titulo}>{this.state.video.titulo}</Text>

              <View style={{paddingVertical: 5}}>
                <Text style={styles.subTitulo}>{this.state.video.views} views</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <Icon name="thumbs-up" size={20} color="#555555" onPress={() => this.like(this.state.video.id)} />
              <Icon name="thumbs-down" size={20} color="#555555" onPress={() => this.dislike(this.state.video.id)} />
              <Icon name="share" size={20} color="#555555" onPress={() => this.share(this.state.video)} />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 5, marginBottom: 15}}>
              <Text style={{fontSize: 13, marginLeft: 7}}>{this.state.video.quantidade_votos_uteis}</Text>
              <Text style={{fontSize: 13, marginLeft: 19}}>{this.state.video.quantidade_votos_negativos}</Text>
              <Text style={{fontSize: 13, marginLeft: 5}}>Share</Text>
            </View>

            <View style={{flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#e6e6e6', paddingHorizontal: 10, paddingVertical: 5, alignItems:'center'}}>
              <Image source={{uri : this.state.video.autor.avatar}} resizeMode="contain" style={{height:25, width:25,borderRadius:15}} />
              <Text style={{paddingLeft: 10}}>{this.state.video.autor.nome}</Text>
            </View>

            <VideosRelacionados videoId={this.state.video.id} />
          </ScrollView>
        </View>
      );
    }
  }
}

let styles = StyleSheet.create({
  buttonPlay: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20
  },
  iconPlay: {
    opacity: 0.9,
    backgroundColor: 'transparent',
    position: 'relative'
  },

  titulo: {
    width: 280
  },
  subTitulo: {
    fontSize: 11,
    color: '#6B6B6B'
  }
});
