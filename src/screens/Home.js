import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth,db } from '../firebase/config';
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
        posts.push({ id: doc.id, data:doc.data() });
      });
      this.setState({ posts, loading: false });
    });
  }


  render() {
    return (
      <View style={styles.container}>
        

        <FlatList 
        data = {this.state.posts}
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
    marginTop:10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    
  },

});
