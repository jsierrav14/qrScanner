import React, { FC } from 'react';
import {View, Text, StyleSheet} from 'react-native';
export const UserItem: FC<{name:string}>= ({name}) => {
  return (
    <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
  );
};



const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});