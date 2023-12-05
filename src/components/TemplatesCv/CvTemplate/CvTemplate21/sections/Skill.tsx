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
      width: '100%',
    },
    content: {
      borderBottom: `2px solid ${color === 1
        ? '#09009B'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000'
        }`,
      paddingBottom: '28.162pt'
    },
    divTitle: {
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
          ? '#09009B'
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
      marginTop: '9.338pt',
    },
    TextTitleDes: {
      fontSize: '11pt',
      wordwrap: 'break-word',
      textAlign: 'justify',
      lineHeight: '1.2',
      fontFamily: 'Fahkwang Medium',
      color:
        color === 1
          ? '#09009B'
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
          ? '#09009B'
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
      width: '10px',
      height: '10px',
      backgroundColor: color === 1
        ? '#09009B'
        : color === 2
          ? '#0D99FF'
          : color === 3
            ? '#FBBC04'
            : color === 4
              ? '#5CB265'
              : '#D80000',
    }
  });
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.divTitle}>
          <View style={styles.square} />
          <Text style={styles.title}>Skill</Text>
        </View>
        {profileMore?.profilesSkills?.map((skill: any) => (
          <View>
            <View style={styles.divDes}>
              <Text style={styles.TextTitleDes}>{skill?.skillName}</Text>
            </View>
            <View style={styles.BorderLine}></View>
            <View style={styles.divDes}>
              <Text style={styles.textDes}>{skill?.dataLevel?.data}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Skill;
