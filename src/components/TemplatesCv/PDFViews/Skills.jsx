import React from 'react';
import { Text, View } from '@react-pdf/renderer';

const Skills = ({ skills }) => {
  return skills.map((item) => (
    <View key={item.id}>
      <Text>{item.skillValue}</Text>
    </View>
  ));
};

export default Skills;
