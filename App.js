import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import {Audio} from 'expo-av';
import SongBtn from "./components/SongBtn";
import InfoBtn from "./components/InfoBtn";
import * as ScreenOrientation from 'expo-screen-orientation';

const max_songs = 15;
let playing = false;

export default function App() {  
  const [sound, setSound] = useState();
  const [count, setCount] = useState(0);
  const [permissionStatus, setStatus] = useState();
  const song_buttons = [];
  const sounds = [];
  const [message, setMessage] = useState("")
  
  const changeScreenOrientation = async() => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }

  const info_alert = () => {
    Alert.alert(
      "Ohjeet",
      "Tänne vois kirjotaa jotain ohjeita ehkä\n\nplapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal plapal "  
    );
  }

  //Get permissions for MEDIA_LIBRARY
  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status === 'granted')  {
      setStatus("granted");
    }
    else {
      console.log('Permissions denied!');
    }
  }

  const get_sounds = async() => {
    const sn_albumi = await MediaLibrary.getAlbumAsync("snmusic");
    if(sn_albumi){
      const media = await MediaLibrary.getAssetsAsync({
        album: sn_albumi,
        mediaType: MediaLibrary.MediaType.audio,
      })
      console.log("BIISEJÄ YHTEENSÄ", media.assets.length);
      setCount(media.assets.length)
    }
  }

  //Push "sounds.length" times buttons to song_buttons array 
  const add_buttons = () => {
    let max_count = 15;
    if(count <= max_count){
      for (let i=0;i<count;i++){
        song_buttons.push(<SongBtn button_id={i+1} key={i} play={(test) => play_sound(i)}/>);
      }
    }else{
      for (let i=0;i<max_count;i++){
        song_buttons.push(<SongBtn button_id={i+1} key={i} play={(test) => play_sound(i)}/>);
      }
    }
  }
    
  //Plays audio files, - MAKE ERROR CHECK
  const play_sound = async (song_index) => {
    console.log("PLAYING ", song_index+1)
    try{
      if(!playing){
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
          {uri:`file:///storage/emulated/0/Music/snmusic/${song_index +1}.mp3`})
        setSound(sound);
        console.log('Playing Sound');
        await sound.playAsync();
        sound.setIsLoopingAsync(true);
        playing = true;
        setMessage(`${song_index +1}`);
      }
      else{
        sound.unloadAsync();
        playing = false;
        setMessage("");
      }
    }catch{
      setMessage("");
      Alert.alert('Väärä tiedoston nimi!',`Ei voida toistaa. Vaihda äänitiedoston nimi, jonka haluat toistaa tästä napista \n\n -> ${song_index +1}.mp3`);
    }
  }
  React.useEffect(() => {
    return sound 
    ? () => {
      console.log('Unloading Sound');
      sound.unloadAsync();
      playing = false;
    }
    : undefined;
  }, [sound]);

  changeScreenOrientation();

  if (permissionStatus === 'granted'){
    get_sounds();
    add_buttons();

  }
  else if (permissionStatus !== 'granted'){
    getPermissions();
  }
  
  return (
    <View style={styles.container}>
        <StatusBar/>
          
        <View style={styles.top}>
          <Text style={styles.headertext}>Sävelnappi </Text>
        </View>
        <View style={styles.infobtn}>
          <InfoBtn click={info_alert}/>
        </View>

        <View style={{height: "10%"}}>
          {playing 
            ? <Text style={styles.currentSong}>Nyt soi  <Text style={{fontSize: 25, fontWeight: 'bold'}}>{message}</Text>.mp3</Text>
            : <Text style={{fontSize: 20, fontWeight: 'bold'}}></Text>}
        </View>

        <View style={styles.bottom}>
          {song_buttons}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#bae1ff",
    flex: 1,
  },
  infobtn: {
    position: "absolute",
    right: "5%",
    top: "5.5%"
  },
  textcontainer: {
    backgroundColor: "#bae1ff",
    justifyContent: "center",
  },
  currentSong:{
    fontSize: 15,
    textAlign: 'center',
  },
  bottom: {
    height: "72.5%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    padding: 1,
  },
  top:{
    height: "10%",
    marginTop:"3%",
    justifyContent: "center",
  },
  headertext:{
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 40,
    textAlign: 'center',
    shadowColor: "#000",
    color: "#fff",
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
    textShadowColor: "#000"
  },
  buttonstyle:{
    justifyContent: 'center',
    flex:1,
    backgroundColor: "steelblue",
    borderRadius: 2,
    elevation: 5
  },
});