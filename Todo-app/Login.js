import { useNavigation } from '@react-navigation/native';
import { useState,useContext} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { MyContext } from './App';
export default function App() {
  let { todolist, setTodolist } = useContext(MyContext)
  let navigation = useNavigation()
  let [emailIn, setEmail] = useState('')
  let [passwordIn, setPassword] = useState('')
  let [showPassword, setShowPassword] = useState(false);
   let [TB, setTB] = useState('')
  let [image, setImage] = useState(require('./assets/eyeopen.png'));
  let [DATA, setData] = useState([])
   const [showTB, setShowTB] = useState(false);
  
  fetch("https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist")
    .then(response=>{
      if (response.ok)
        return response.json()
    })
    .then(dataO=>{
      if(DATA.length==0)
        setData(dataO)
    })
  return (
    <View style={styles.container}>
        <View style={{ flex: 1 }}></View>
        <Image source={require('./assets/Image_95.png')}
          style={{ flex: 3, height: '100%', width: 'auto',resizeMode:'contain',marginTop:20}}></Image>
      <View style={{flex:0.5}}></View>
      <Text style={{ textAlign: 'center', fontSize: 24, color: '#8353E2', fontWeight: 'bold' }}>MANAGE YOUR {"\n"}TASK</Text>
      <View style={{flex:1.2,alignItems:'center',flexDirection:'row'}}>
        <Image source={require('./assets/mail.jpg')} style={{height:30,width:30,left:10,resizeMode:'contain',position:'absolute'}}></Image>
        <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft: 40 }} placeholder='Enter your name'
          onChangeText={setEmail}></TextInput>
      </View>
      <View style={{flex:0.1}}></View>
      <View style={{flex:1.2,alignItems:'center',flexDirection:'row'}}>
        <Image source={require('./assets/padlock.png')} style={{height:30,width:30,left:10,resizeMode:'contain',position:'absolute'}}></Image>
        <TextInput secureTextEntry={!showPassword} style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft: 40 }} placeholder='Enter your name'
          onChangeText={setPassword}></TextInput>
        <TouchableOpacity style={{ right: 30, alignItems: 'center', paddingBottom: 30 }}
          onPress={() => { 
            if (showPassword == true) {
                  setImage(require('./assets/eyeopen.png'))
                  setShowPassword(!showPassword)
                } else { 
                  setImage(require('./assets/hide.png'))
                  setShowPassword(!showPassword)
                }
          }}>
          <Image source={image} style={{height:30,width:30,resizeMode:'contain',position:'absolute'}}></Image>
        </TouchableOpacity>
      </View>
      {showTB && (
         <View style={{marginTop:10}}>
          <Text style={{marginTop: 10,
                padding: 10,
                width: "100%",color:'red',fontWeight:'bold'}}>
            {TB}
            </Text>
              
          </View>
      )}
      <View style={{ flex: 1 }}></View>      
        <TouchableOpacity
          style={{
            flex: 0.7,
            backgroundColor: '#00BDD6',
            borderRadius: 30,
            justifyContent: 'center',
            height: 40,
          }}
          onPress={() => {
            for (let i = 0; i < DATA.length; i++) {
              if (DATA[i].email == emailIn && DATA[i].password != passwordIn) { 
                setTB("Email hoặc mật khẩu không đúng")
                setShowTB(true)
              }
              else if (DATA[i].email == emailIn && DATA[i].password == passwordIn) {
                 setTodolist(DATA[i]);
                navigation.navigate("Main", { todolist: DATA[i] });
              }
            }
          }}
        >
  <Text style={{ color: 'white', fontSize: '14px', textAlign: 'center' }}>
    GET START
  </Text>
</TouchableOpacity>

      
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: '3%',
    paddingRight:'3%'
  },
});
