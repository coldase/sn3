import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground} from 'react-native';

const SongBtn = (props) => {

    const [currentStyle, setStyle] = useState(styles.bottomInnerNo);

    const things = () => {
      setStyle(styles.bottomInnerNo);
      if(currentStyle === styles.bottomInnerYes){
        setStyle(styles.bottomInnerNo);
      }else{
        setStyle(styles.bottomInnerYes);
      }
      
      props.play();
    }
    
    const get_photo_url = (num) => {
      let test = {uri:`file:///storage/emulated/0/Pictures/snimages/${num}.jpg`};
      return test;
    }

   return (
      <View style={styles.bottomItem}>
          <TouchableOpacity style={styles.bottomInnerNo} onPress={props.play}>
            <ImageBackground source={get_photo_url(props.button_id)} style={styles.image}>
                  <Text style={styles.buttontext}>{props.button_id}</Text>
            </ImageBackground>
          </TouchableOpacity>
      </View>

  )
};

const styles = StyleSheet.create({
    image: {
      width: "100%",
      height: "100%"
    },
    bottomItem: {
        width: '32%',
        height: '20%',
        padding: 4,
        // margin: 2,
      },
      bottomInnerNo:{
        justifyContent: 'center',
        flex:1,
        backgroundColor: "steelblue",
        borderRadius: 2,
        elevation: 5
      },
      bottomInnerYes:{
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: "red",
        flex:1,
        borderRadius: 2,
        elevation: 5
      },
      buttontext: {
        fontSize: 30,
        // paddingTop: "25%",
        textAlign: 'center',
        shadowColor: "#000",
        color: "#fff",
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 10,
        textShadowColor: "#000"
      }
})

export default SongBtn;