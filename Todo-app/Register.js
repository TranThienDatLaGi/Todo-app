import { useNavigation } from '@react-navigation/native';
import { useState,useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList,Button } from 'react-native';
import { MyContext } from './App';
export default function App() {
  let navigation = useNavigation();
  let { todolist, setTodolist } = useContext(MyContext)  
  let [DATA, setData] = useState([])
  const [showTB, setShowTB] = useState(false);
  
  

   fetch("https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist")
    .then(response=>{
      if (response.ok)
        return response.json()
    })
    .then(dataO=>{
      if(DATA.length==0)
        setTodolist(dataO)
    })
  
  
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2 }}></View>
      <TouchableOpacity style={{ paddingHorizontal: 10 }}
        onPress={() => { navigation.navigate("Login") }}>
        <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}>Back</Text>
      </TouchableOpacity>
      <View style={{ flex: 1 }}></View>
      <Text style={{ textAlign: 'center', fontSize: 24, color: '#8353E2', fontWeight: 'bold' }}>REGISTER</Text>
      <View style={{ flex: 2 }}></View>    
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft: 40 }} placeholder='Enter your name'></TextInput>
      <View style={{ flex: 0.5 }}></View>    
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft: 40 }} placeholder='Enter your Email'></TextInput>
      <View style={{ flex: 0.5 }}></View>    
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft: 40 }} placeholder='Enter your Password'></TextInput>
      <View style={{ flex: 0.5 }}></View>    
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft: 40 }} placeholder='Confirm your Password'></TextInput>
      <View style={{ flex: 0.5 }}></View>
      {showTB && (
         <View style={{marginTop:10}}>
          <Text style={{marginTop: 10,
                padding: 10,
                width: "100%",color:'red',fontWeight:'bold'}}>
            "Mật khẩu không khớp"
            </Text>
              
          </View>
      )}
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft: 40 }} placeholder='Enter your Description'></TextInput>
    <View style={{ flex: 2 }}></View>    
      <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#00BDD6',
            borderRadius: 30,
            justifyContent: 'center',
            height: 40,
          }}>
      <Text style={{ color: 'white', fontSize: '14px', textAlign:'center' }}>
        GET START
      </Text>
    </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: '2%',
    paddingRight:'2%'
  },
});
