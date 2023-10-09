import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  job_header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  role: {
    fontWeight: 'bold',
  },

  company: {
    fontStyle: 'italic',
  },

  description: {
    marginLeft: 16,
  },

  list_item: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
    marginBottom: 1,
  },

  bulletPoint: {
    width: 3,
    height: 3,
    backgroundColor: '#1f1f1f',
    borderRadius: 50,
    marginTop: 4, // add margin to align with list content
  },
});

const Experience = ({ experience }) => {
  return experience.map((item) => (
    <View key={item.id}>
      <View style={styles.job_header}>
        <Text style={styles.role}>{item.role}</Text>
        <Text>
          {item.startDate} - {item.endDate}
        </Text>
      </View>
      <Text style={styles.company}>{item.company}</Text>
      <View style={styles.description}>
        {item.description.split('\n').map(
          (listItem) =>
            listItem !== '' && (
              <View key={uuidv4()} style={styles.list_item}>
                <View style={styles.bulletPoint} />
                <Text>{listItem}</Text>
              </View>
            )
        )}
      </View>
    </View>
  ));
};

export default Experience;
