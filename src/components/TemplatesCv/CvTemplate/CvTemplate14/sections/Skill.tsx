import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvSkill {
  color: any;
  profile: any;
  fontSize: any;
}
const Skill: React.FC<ICvSkill> = (props) => {
  const { color, profile, fontSize } = props;
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
    },
    divTitle: {},
    title: {
      marginLeft: '20pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color:
        color === 1
          ? '#000000'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      letterSpacing: '4pt',
      fontFamily: 'Petrona Bold',
      fontWeight: 'extrabold',
    },
    divDes: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '137pt',
    },
    textTitleDes: {
      fontSize: '11pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
      color:
        color === 1
          ? '#000000'
          : color === 2
            ? '#000000'
            : color === 3
              ? '#000000'
              : color === 4
                ? '#000000'
                : '#000000',
    },
    textDes: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
    },
    BorderLine: {
      width: '80px',
      height: '4pt',
      backgroundColor:
        color === 1
          ? '#000000'
          : color === 2
            ? '#D6EAF8'
            : color === 3
              ? '#FCF3CF'
              : color === 4
                ? '#D5F5E3'
                : '#FADBD8',
      margin: '7pt 0 4pt 20pt',
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <Text style={styles.title}>Skill</Text>
      </View>
      {profile?.profilesSkills?.map((skill: any) => (
        <View>
          <View style={styles.divDes}>
            <Text style={styles.textTitleDes}>{skill?.skillName}</Text>
          </View>
          <View style={styles.divDes}>
            <Text style={styles.textDes}>{skill?.dataLevel?.data}</Text>
          </View>
          <View style={styles.BorderLine}></View>
        </View>
      ))}
    </View>
  );
};

export default Skill;
