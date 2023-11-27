import { useNavigation } from '@react-navigation/native';
import { useState,useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList,Button } from 'react-native';
import { MyContext } from './App';
export default function App() {
  let navigation = useNavigation();
  let { todolist, setTodolist } = useContext(MyContext)  
  let [DATA, setData] = useState([])
  const [showTB, setShowTB] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [pass, setPass] = useState('')
  let [passAgain, setPassAgain] = useState('')
  let [description, setDescription] = useState('')
  let [TB, setTB] = useState('') 
  let [TBPass, setTBPass] = useState('Mật khẩu không khớp') 

  const isValidEmail = (email) => {
    const emailRegex = new RegExp( /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return emailRegex.test(email);
  };
  const isValidPassword = (pass) => {
    const emailRegex = new RegExp( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/);
    return emailRegex.test(pass);
  };
  

   fetch("https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist")
    .then(response=>{
      if (response.ok)
        return response.json()
    })
    .then(dataO=>{
      if(DATA.length==0)
        setData(dataO)
    })
  const handleRegister = () => {
    for (let i = 0; i < DATA.length; i++) {
      if (DATA[i].email == email) {
        setTB("Email đã được sử dụng")
        setShowEmail(true);
        return;
      }
      else if (isValidEmail(email) == false) {
        setTB("Email không hợp lệ")
        setShowEmail(true);
        return;
      }
      else if (isValidPassword(pass) == false) {
        setTBPass("Password không hợp lệ, password phải từ 8-32 kí tự bao gồm chữ cái, chữ hoa và số")
        setShowTB(true);
        return;
      }
      else if (pass != passAgain) {
        setShowEmail(false);
        setShowTB(true);
        return;
      }
        
      else { 
        setShowEmail(false);
        setShowTB(false);
      }
    }
    const newData = {
      id: DATA.length + 1+"",
      name: name,
      email: email,
      password: pass,
      description: description,
      image: "https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg",
      todo:[],
    }
    DATA.push(newData);
    fetch('https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist/', {
    method: 'POST', 
    headers: {
    'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
    .then(response => {
      if (response.ok) {
        // Handle successful update
      } else {
        // Handle error
      }
    })
    .catch(error => {
      // Handle connection or processing error
    });
        navigation.navigate("Login");

    
  }
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
      <Text style={{ height: 40, flex: 1,fontWeight:'bold',paddingLeft:30 }}>Name</Text>
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft:30,marginLeft: 20,marginRight:15 }} placeholder='Enter your name'
      onChangeText={setName}
      ></TextInput>
      {showEmail && (
         <View style={{marginTop:10}}>
          <Text style={{marginTop: 10,
                padding: 10,
                width: "100%",color:'red',fontWeight:'bold'}}>
            {TB}
            </Text>
              
          </View>
      )}
      <View style={{ flex: 0.5 }}></View>  
      <Text style={{ height: 40, flex: 1,fontWeight:'bold',paddingLeft:30 }}>Email</Text>
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft:30,marginLeft: 20,marginRight:15 }} placeholder='Enter your Email'
      onChangeText={setEmail}
      ></TextInput>
      <View style={{ flex: 0.5 }}></View>
      <Text style={{ height: 40, flex: 1,fontWeight:'bold',paddingLeft:30 }}>Password</Text>
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft:30,marginLeft: 20,marginRight:15 }} placeholder='Enter your Password'
      onChangeText={setPass}
      ></TextInput>
      <View style={{ flex: 0.5 }}></View>
      <Text style={{ height: 40, flex: 1,fontWeight:'bold',paddingLeft:30 }}>Confirm Password</Text>
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft:30,marginLeft: 20,marginRight:15 }} placeholder='Confirm your Password'
      onChangeText={setPassAgain}
      ></TextInput>
      <View style={{ flex: 0.5 }}></View>
      {showTB && (
         <View style={{marginTop:10}}>
          <Text style={{marginTop: 10,
                padding: 10,
                width: "100%",color:'red',fontWeight:'bold'}}>
            {TBPass}
            </Text>
              
          </View>
      )}
      <Text style={{ height: 40, flex: 1,fontWeight:'bold',paddingLeft:30 }}>Description</Text>
      <TextInput style={{ height: 40, flex: 1, borderRadius: 5, borderWidth: 1, paddingLeft:30,marginLeft: 20,marginRight:15 }} placeholder='Enter your Description'
      onChangeText={setDescription}
      ></TextInput>
    <View style={{ flex: 2 }}></View>    
      <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#00BDD6',
            borderRadius: 30,
            justifyContent: 'center',
            height: 40,
        }}
      onPress={()=>handleRegister()}
      >
      <Text style={{ color: 'white', fontSize: '14px', textAlign:'center' }}>
        REGISTER
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
