import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  education_preview: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Education = ({ education }) => {
  return education.map((item) => (
    <View key={item.id} style={styles.education_preview}>
      <View>
        <Text>{item.degree}</Text>
        <Text>{item.university}</Text>
      </View>
      <View>
        <Text>
          {item.startDate} - {item.endDate}
        </Text>
      </View>
    </View>
  ));
};

export default Education;
