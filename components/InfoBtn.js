import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { Feather } from '@expo/vector-icons';

const InfoBtn = ({click}) => {
  return (
    <TouchableOpacity onPress={click} style={styles.infoBtnStyle}>
      <Feather name="help-circle" size={30} color="#4F4F4F" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  infoBtnStyle: {
    width: 30,
    height: 30
  }
})

export default InfoBtn;