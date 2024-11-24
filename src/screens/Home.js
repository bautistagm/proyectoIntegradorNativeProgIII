import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import { FlatList } from 'react-native-web';
import Post from '../components/Post';





export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
    };
  }


  componentDidMount() {
    db.collection('posts')
      .orderBy('createdAt', 'desc') // fechas ordenado
      .onSnapshot((snapshot) => {
        let posts = [];
        snapshot.forEach((doc) => {
          posts.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ posts, loading: false });
      });
  }

  handleLogout() {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => console.log('Error al cerrar sesión:', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => this.handleLogout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Post datos={item} />
          )}

        />




      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#41C9E2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#F95454',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',

  },
  logoutButton: {  //colocamos el boton de logout por mas que la consigna no lo  pedia, nos parecio mas practico. Lo ubicamos a la izquierda y arriba a proposito
    color: '#F95454',
    position: 'absolute',
    top: 10,
    left: 10, 
    zIndex: 10, 
  },

});
