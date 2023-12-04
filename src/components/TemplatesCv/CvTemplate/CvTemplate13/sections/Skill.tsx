import React from 'react';
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer';
import null_avatar from '../../images/null_avatar.png';
interface ICvSkill {
  color: any;
  profile: any;
  fontSize: any;
  profileMore: any;
}
const Skill: React.FC<ICvSkill> = (props) => {
  const { color, profile, fontSize, profileMore } = props;
  const styles = StyleSheet.create({
    container: {
      marginRight: -25,
    },
    title: {
      marginLeft: '20pt',
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color:
        color === 1
          ? '#377a40'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      letterSpacing: '4pt',
      fontFamily: 'Fahkwang Bold',
      fontWeight: 'extrabold',
    },
    divDes: {
      marginLeft: '20pt',
      marginTop: '9.338pt',
      width: '180pt',
    },
    TextTitleDes: {
      fontSize: '11pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
      color:
        color === 1
          ? '#377a40'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
    },
    textDes: {
      fontSize: '9pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
    },
    BorderLine: {
      width: '80px',
      height: '4pt',
      backgroundColor:
        color === 1
          ? '#f0f8eb'
          : color === 2
            ? '#D9EFFE'
            : color === 3
              ? '#FBF2DA'
              : color === 4
                ? '#E2FFE5'
                : '#FEE1E1',
      margin: '7pt 0 4pt 20pt',
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Skill</Text>
      </View>
      {profileMore?.profilesSkills?.map((skill: any) => (
        <View>
          <View style={styles.divDes}>
            <Text style={styles.TextTitleDes}>{skill?.skillName}</Text>
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
