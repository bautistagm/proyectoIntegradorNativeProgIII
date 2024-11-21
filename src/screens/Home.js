import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { auth } from '../firebase/config';






export default class Home extends Component {

  constructor(props){
    super(props);
    this.state = {
      posts: [],
      loading:true,
    };
  }

 /* componentDidMount() {  //esto para verificar q este logueado, WIP
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.props.navigation.navigate('Login'); 
      }else{
        this.fetchPosts();
      }
    });
  } */

  fetchPosts = () => {
    db.collection('posts')
      .orderBy('createdAt', 'desc') // fechas ordenado
      .onSnapshot((snapshot) => {
        let posts = [];
        snapshot.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() });
        });
        this.setState({ posts, loading: false });
      });
  };



  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido a la aplicación!</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Ir a login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => auth.signOut()}>
          <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

});
