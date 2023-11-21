import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState, useContext} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { MyContext } from './App';
export default function App() {
  let navigation = useNavigation();
  let { todolist, setTodolist } = useContext(MyContext)
  let [user0, setUser0] = useState(todolist.todo)
  let [valueSearch, setValueSearch] = useState('')
  let [userIn, setUserIn] = useState(user0)
  
  let update= (id)=>{
    fetch("https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist/"+id)
    .then(response=>{
      if (response.ok)
        return response.json()
    })
    .then(dat=>{
      setTodolist(dat)
      setUserIn(dat.todo)
    })
  }
if (!(user0 === todolist.todo)){
    setUserIn(todolist.todo)
    setUser0(todolist.todo)
  }
  
useEffect(
    ()=>{
      let temp = todolist.todo.filter(i => {
        return i.desc.includes(valueSearch)
      })
      if (valueSearch != "")
        setUserIn(temp)
      else setUserIn(todolist.todo)
    }, [valueSearch]
  )

  const [checkboxes, setCheckboxes] = useState([false, false, false, false,false,false]);

  const handleCheckboxPress = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };
  const handleButtonPress = (index) => {
    handleCheckboxPress(index.id);
    index.state = !checkboxes[index.id]
      fetch('https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist/' + todolist.id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({ todo: todolist.todo }), 
        })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            return response.statusText("Error")
          }
        })
        .catch((error) => console.log(error))
  };

  let Item = ({ i }) => {
    if (i.state == false) {  
      checkboxes[i.id]=false;
      return (
        <View style={{ flex: 1, height: 30, backgroundColor: '#6AEBF9', marginBottom: 10, borderRadius: 10, justifyContent: 'center',flexDirection:'row',justifyContent:'space-between' }}>
          <TouchableOpacity style={{ flex: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => handleButtonPress(i)}
          >
            {checkboxes[i.id] && <Image style={{ left: 20, width: 20, height: 20, resizeMode: 'contain', position: 'absolute' }} source={require('./assets/check.png')}></Image>}
            {!checkboxes[i.id] && <Image style={{ left: 20, width: 20, height: 20, resizeMode: 'contain', position: 'absolute' }} source={require('./assets/Frame.png')}></Image>}
            <Text style={{ flex: 1, padding: 20, marginLeft: 40 }}>{i.desc}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              navigation.navigate("Screen04", {  id: i.id, todolist: todolist })
            }}
          >
            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('./assets/edit.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
           onPress={()=>{
            for (let j = 0; j < userIn.length; j++) 
              if (userIn[j].id === i.id)
                userIn.splice(j, 1);
            todolist.todo = userIn

            fetch('https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist/'+todolist.id, {
              method: 'PUT',
              headers: {'content-type':'application/json'},
              body: JSON.stringify(todolist)
              }).then(oke=>{
                update(todolist.id);
              }) 
            }}
          >
            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('./assets/delete.png')}></Image>
          </TouchableOpacity>
         
        </View>
      )
    }
    else {
      checkboxes[i.id]=true;
      return (
        <View style={{ flex: 1, height: 30, backgroundColor: '#6AEBF9', marginBottom: 10, borderRadius: 10, justifyContent: 'center',flexDirection:'row',justifyContent:'space-between' }}>
          <TouchableOpacity style={{ flex: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => handleButtonPress(i)}
          >
            {checkboxes[i.id] && <Image style={{ left: 20, width: 20, height: 20, resizeMode: 'contain', position: 'absolute' }} source={require('./assets/check.png')}></Image>}
            {!checkboxes[i.id] && <Image style={{ left: 20, width: 20, height: 20, resizeMode: 'contain', position: 'absolute' }} source={require('./assets/Frame.png')}></Image>}
            <Text style={{ flex: 1, padding: 20, marginLeft: 40 }}>{i.desc}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              navigation.navigate("Screen04", {  id: i.id, todolist: todolist })
            }}
          >
            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('./assets/edit.png')}></Image>
          </TouchableOpacity>

          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
           onPress={()=>{
            for (let j = 0; j < userIn.length; j++) 
              if (userIn[j].id === i.id)
                userIn.splice(j, 1);
            todolist.todo = userIn

            fetch('https://65435c0201b5e279de2039f4.mockapi.io/api/v1/todolist/'+todolist.id, {
              method: 'PUT',
              headers: {'content-type':'application/json'},
              body: JSON.stringify(todolist)
              }).then(oke=>{
                update(todolist.id);
              }) 
            }}
          >
            <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('./assets/delete.png')}></Image>
          </TouchableOpacity>
         
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:10}}>
        <TouchableOpacity style={{ paddingHorizontal: 10 }}
        onPress={()=>{navigation.navigate("Screen01")}}
        >
          <Text style={{color:'black',fontSize:16}}>Back</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image
            source={{uri:todolist.image}}
            style={{height:40,width:40,borderRadius:20,marginRight:10}}
          />
          <View style={{flexDirection:'column'}}>
            <Text style={{ color: 'black', fontSize: 20,fontWeight:'bold' }}>{todolist.name}</Text>
            <Text style={{ color: 'gray', fontSize: 16, fontWeight: '500' }}>{todolist.description}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center'}}>
        <Image source={require('./assets/search.png')} style={{ height: 20, width: 20, resizeMode: 'contain', left: 28 }}></Image>
        <TextInput style={{ borderWidth: 1, height: 40, flex: 1, paddingLeft: 40, marginRight: 20, borderRadius: 5 }} placeholder='Search'
        onChangeText={setValueSearch}
        ></TextInput>
      </View>
      <View style={{ marginTop: 50 }}></View>
      <FlatList
        data={userIn} renderItem={({ item }) => <Item i={item}></Item>}
      >
      </FlatList>
       
      
      <TouchableOpacity style={{ alignItems: 'center' }}
        onPress={() => {
          navigation.navigate("Screen03",
            { todolist: todolist });
      }}
      >
        <Image source={require('./assets/plus.png')} style={{height:60,width:60,resizeMode:'contain'}}></Image>
      </TouchableOpacity>
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
