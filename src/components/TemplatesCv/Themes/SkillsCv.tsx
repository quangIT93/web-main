import React from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// import List, { Item } from './List';

const styles = StyleSheet.create({
  title: {
    // fontFamily: 'Lato Bold',
    fontSize: 11,
    marginBottom: 10,
  },
  introduce: {
    // fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
  },
  image: {
    width: '1cm',
    height: '1cm',
  },
});

const SkillsCvEntry = ({ skills }: { skills: string[] }) => (
  <View style={{ marginTop: '0.626cm' }}>
    <Text style={styles.introduce}>{skills}</Text>
  </View>
);
const SkillsCv = () => {
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
        <Text
          style={{
            marginLeft: '0.4cm',
            fontSize: '13.67pt',
          }}
        >
          Skill
        </Text>
      </View>
      <View
        style={{
          border: '0.5pt solid black',
        }}
      ></View>
      <SkillsCvEntry skills={['qiamg', 'qiamg', 'qiag']} />
    </View>
  );
};

export default SkillsCv;
