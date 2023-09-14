import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// import List, { Item } from './List';

const styles = StyleSheet.create({
  title: {
    // fontFamily: 'Lato Bold',
    fontSize: '13.67pt',
    marginBottom: '1.530cm',
  },
  introduce: {
    // fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
    // fontFamily: 'Montserrat',
  },
  image: {
    width: '1cm',
    height: '1cm',
  },
});

const ProfileEntry = ({ introduce }: { introduce: string }) => (
  <View
    style={{
      marginTop: '0.626cm',
      flexGrow: 1,
      textAlign: 'justify', // Căn đều văn bản
    }}
  >
    <Text style={styles.introduce}>{introduce}</Text>
  </View>
);
const ProfileCv = () => {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: '0.226cm',
          marginTop: '1.53cm',
        }}
      >
        <Image src="./images/image 51.png" style={styles.image} />
        <Text style={styles.title}>Profile</Text>
      </View>
      <View
        style={{
          border: '0.5pt solid black',
        }}
      ></View>
      <View style={{ flexDirection: 'row', fontFamily: 'Montserrat Regular' }}>
        <ProfileEntry introduce="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio provident officia debitis. Ad saepe nam culpa ipsum rem earum enim adipisci minima alias illo blanditiis minus ut, quaerat, recusandae pariatur." />
      </View>
    </View>
  );
};

export default ProfileCv;
