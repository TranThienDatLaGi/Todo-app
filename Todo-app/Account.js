import { useNavigation,useRoute } from '@react-navigation/native';
import { useState,useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, FlatList,Button } from 'react-native';
import { MyContext } from './App';
export default function App() {
  let navigation = useNavigation();
  let { todolist, setTodolist } = useContext(MyContext)  
  const [showTextInput, setShowTextInput] = useState(false);
  const [showPassInput, setShowPassInput] = useState(false);
  const [showTB, setShowTB] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [type, setType] = useState('');
  

let update= (id)=>{
    fetch("https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist/"+id)
    .then(response=>{
      if (response.ok)
        return response.json()
    })
    .then(dat=>{
      setTodolist(dat)

    })
  }

  const handleLogOut= ()=> {
    navigation.navigate("Login");
  }

  const handleChangeTiTle = () => {
    setShowTextInput(!showTextInput);
    setType('changeTitle');   
  };

  const handleChangeName = () => {
    setShowTextInput(!showTextInput);
    setType('changeName');   
  };
  const handleChangePass = () => {
    setShowTextInput(!showTextInput);
    setShowPassInput(!showPassInput);
    setType('changePass');   
  };

  const handleSubmit = () => {
    if (type == "changeTitle") {
      todolist.description = inputValue;
      fetch('https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist/' + todolist.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: todolist.description }),
      })
        .then(response => {
          if (response.ok) {
            update(todolist.id);
          } else {
          }
        })
        .catch(error => {
        });

    }
    else if (type == "changeName") {
      todolist.name = inputValue;
      fetch('https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist/' + todolist.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: todolist.name }),
      })
        .then(response => {
          if (response.ok) {
            update(todolist.id);
          } else {
          }
        })
        .catch(error => {
        });

    }
    else if (type == "changePass") {
      if (todolist.password != inputValue) {
        setShowTB(!showTB);
      }
      else {
        todolist.password = passValue;
        fetch('https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist/' + todolist.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: todolist.password }),
        })
          .then(response => {
            if (response.ok) {
              update(todolist.id);
            } else {
            }
          })
          .catch(error => {
          });
        navigation.navigate("Login",{todolist:todolist})
      }
      
    }

    

  };



  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10}}>
        <TouchableOpacity style={{ paddingHorizontal: 10 }}
        onPress={()=>{navigation.navigate("Main",{todolist:todolist})}}
        >
          <Text style={{color:'black',fontSize:16}}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={{alignItems:'center'}}>
          <Image
            source={{uri:todolist.image}}
            style={{height:200,width:200,borderRadius:100}}
          />
          <View style={{flexDirection:'column'}}>
            <Text style={{ color: 'black', fontSize: 20,fontWeight:'bold' }}>{todolist.name}</Text>
            <Text style={{ color: 'gray', fontSize: 16, fontWeight: '500' }}>{todolist.description}</Text>
          </View>
      </View>
      {showTextInput && (
         <View style={{alignItems:'center', flexDirection:"row",justifyContent:"space-btween"}}>
            <TextInput
              style={{marginTop: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                width: 200,}}
              placeholder="Type something..."
              value={inputValue}
              onChangeText={setInputValue}
          />
          <TouchableOpacity style={{ marginLeft: 10, flexDirection: 'row', paddingHorizontal: 10, marginTop: 10, borderWidth: 1, height: 40, width: "20%", borderRadius: 10, backgroundColor: '#00BDD6' }}
          onPress={()=>handleSubmit()}
          >
            <Text style={{ marginTop:8,color: 'black', fontSize: 16 }}>Submit</Text>
        </TouchableOpacity>
          </View>
      )}
      {showPassInput && (
         <View style={{marginTop:10}}>
            <TextInput
              style={{marginTop: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                width: 200}}
              placeholder="Type something..."
              value={passValue}
              onChangeText={setPassValue}
          />
          </View>
      )}
      {showTB && (
         <View style={{marginTop:10}}>
          <Text style={{marginTop: 10,
                padding: 10,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                width: 200,color:'red',fontWeight:'bold'}}>
            Mật khẩu không khớp với mật khẩu hiện tại!!
            </Text>
              
          </View>
      )}
      <View style={{alignItems:'center'}}>
        <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 10, borderWidth: 1, height: 40, width: "100%", borderRadius: 10 }}
        onPress={()=>handleChangeName()}
        >
            <Text style={{ marginTop:8,color: 'black', fontSize: 16 }}>Change Name</Text>
            <Image source={require('./assets/triangle.png')} style={{marginTop:10,height:20,width:30,right:10,resizeMode:'contain',position:'absolute'}}></Image>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 10, borderWidth: 1, height: 40, width: "100%", borderRadius: 10 }}
        onPress={()=>handleChangePass()}
        >
            <Text style={{ marginTop:8,color: 'black', fontSize: 16 }}>Change Password</Text>
            <Image source={require('./assets/triangle.png')} style={{marginTop:10,height:20,width:30,right:10,resizeMode:'contain',position:'absolute'}}></Image>
          </TouchableOpacity>
        
        <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 10, borderWidth: 1, height: 40, width: "100%", borderRadius: 10 }}
        onPress={()=>handleChangeTiTle()}
        >
            <Text style={{ marginTop:8,color: 'black', fontSize: 16 }}>Change Description</Text>
            <Image source={require('./assets/triangle.png')} style={{marginTop:10,height:20,width:30,right:10,resizeMode:'contain',position:'absolute'}}></Image>
        </TouchableOpacity>
        
        <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: 10, marginTop: 10, borderWidth: 1, height: 40, width: "100%", borderRadius: 10 }}
        onPress={()=>handleLogOut()}
        >
            <Text style={{ marginTop:8,color: 'black', fontSize: 16 }}>Log Out</Text>
            <Image source={require('./assets/triangle.png')} style={{marginTop:10,height:20,width:30,right:10,resizeMode:'contain',position:'absolute'}}></Image>
          </TouchableOpacity>
        
      </View>
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
