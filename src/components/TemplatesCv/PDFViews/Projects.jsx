import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  project_header: {
    display: 'flex',
    flexDirection: 'row',
  },

  name: {
    fontWeight: 'bold',
  },

  technologiesUsed: {
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

const Projects = ({ projects }) => {
  return projects.map((item) => (
    <View key={item.id}>
      <View style={styles.project_header}>
        <Text style={styles.name}>{item.name} | </Text>
        <Text style={styles.technologiesUsed}>{item.technologiesUsed}</Text>
      </View>
      <ul style={styles.description}>
        {item.description.split('\n').map(
          (listItem) =>
            listItem !== '' && (
              <View key={uuidv4()} style={styles.list_item}>
                <View style={styles.bulletPoint} />
                <Text>{listItem}</Text>
              </View>
            )
        )}
      </ul>
    </View>
  ));
};

export default Projects;
