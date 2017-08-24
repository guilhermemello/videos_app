import React from 'react';
import {
  View,
  FlatList,
  Text,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { List, ListItem } from 'react-native-elements'

import {DISCIPLINA_API} from '../../data/disciplina';

export class Biblioteca extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Biblioteca',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="folder" size={20} color="#999999" />
    ),
  }

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      disciplinas: []
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });

    DISCIPLINA_API.getAll().then(response => {
      this.setState({ isLoading: false, disciplinas: response })
    });
  }

  render() {
    if (this.state.isLoading) {
      return(
        <Spinner visible={this.state.isLoading} />
      )
    } else {
      return (
        <ScrollView>
          <List>
            {
              this.state.disciplinas.map((item, i) => (
                <ListItem
                key={i}
                title={item.nome}
                onPress={() => this.props.navigation.navigate('Aulas', { disciplinaId: item.id })}
                />
              ))
            }
          </List>
        </ScrollView>
      );
    }
  }
}
