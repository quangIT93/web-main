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
      marginRight: -30,
    },
    divTitle: {
      backgroundColor:
        color === 1
          ? '#e5f6fe'
          : color === 2
            ? '#D6EAF8'
            : color === 3
              ? '#FCF3CF'
              : color === 4
                ? '#D5F5E3'
                : '#FADBD8',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '5pt',
    },
    title: {
      padding: '9.209pt 0',
      fontSize: '16pt',
      width: '137pt',
      color:
        color === 1
          ? '#037385'
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
    divInfo: {
      marginTop: '10.408pt',
      marginLeft: '20pt',
    },
    textTitleDes: {
      fontSize: '11pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Petrona Bold',
      color:
        color === 1
          ? '#037385'
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
      fontFamily: 'Petrona Bold',
    },
    BorderLine: {
      width: '80px',
      height: '4pt',
      backgroundColor:
        color === 1
          ? '#037385'
          : color === 2
            ? '#0D99FF'
            : color === 3
              ? '#FBBC04'
              : color === 4
                ? '#5CB265'
                : '#D80000',
      margin: '7pt 0',
    },
    square: {
      marginLeft: '20pt',
      width: '10px',
      height: '10px',
      backgroundColor: color === 1
        ? '#037385'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.divTitle}>
        <View style={styles.square} />
        <Text style={styles.title}>Skill</Text>
      </View>
      {profile?.profilesSkills?.map((skill: any) => (
        <View style={styles.divInfo}>
          <View>
            <Text style={styles.textTitleDes}>{skill?.skillName}</Text>
          </View>
          <View style={styles.BorderLine}></View>
          <View>
            <Text style={styles.textDes}>{skill?.dataLevel?.data}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Skill;
