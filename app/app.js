import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import SearchBar from 'react-native-searchbar';

import Icon from 'react-native-vector-icons/Ionicons';
import Iconz from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import * as Screens from './screens';

const Tab = TabNavigator({
  Home: {
    screen: Screens.Home
  },
  MaisAcessados: {
    screen: Screens.MaisAcessados
  },
  Biblioteca: {
    screen: Screens.Biblioteca
  }
},
{
  navigationOptions: {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#CD201F'
    },
    headerLeft: <Text style={{color:'#fff', margin:15, marginTop: 20, fontWeight:'500', fontSize:17}}>QC Videos</Text>,
    headerRight:
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity>
          <Iconz name="search" style={{margin:5}} size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconFontAwesome name="user-circle" style={{margin:5}} size={20} color="#fff" />
        </TouchableOpacity>
      </View>
  }
});

const App = StackNavigator({
  Home: { screen: Tab },
  Video: {
    screen: Screens.VideoDetalhe,
  },
  Search: {
    screen: Screens.Search
  },
  Aulas: {
    screen: Screens.Aulas
  }
},
{
  mode: 'modal',
  navigationOptions: ({ navigation }) => ({
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#CD201F'
    },
    headerRight:
      <View style={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity>
          <Iconz name="search" style={{margin:5}} size={23} color="#fff" onPress={() => navigation.navigate('Search')}  />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{uri: 'https://res.cloudinary.com/qconcursos/image/upload/t_perfil/v9/production/002/533/269/avatar.jpg'}} style={{height:28, width:28, margin:5, borderRadius:15}} />
        </TouchableOpacity>

        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={[]}
          handleResults={this._handleResults}
        />
      </View>
  })
});

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const {navigate} = this.props.navigation;

    return (
      <App />
    )
  }
}

export default HomeScreen;
