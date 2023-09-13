/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';

interface ICvSkills {
    color: any;
}


const Skills: React.FC<ICvSkills> = (props) => {
    const { color } = props;
    const styles = StyleSheet.create({
        title: {
            fontFamily: 'Lato Bold',
            fontSize: 14,
            marginBottom: 10,
            textTransform: 'uppercase',
            color: color === 1 ?
                "#252525" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000"
        },
        subTitle: {
            fontFamily: 'Lato Bold',
            fontSize: 11,
            marginBottom: 10,
            color: color === 1 ?
                "#252525" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000"
        },
        skills: {
            fontFamily: 'Lato',
            fontSize: 10,
            marginBottom: 10,
        },
    });

    const SkillEntry: React.FC<any> = ({ name, skills }) => (
        <View>
            <Text style={styles.subTitle}>{name}</Text>
            <List>
                {skills.map((skill: any, i: any) => (
                    <Item key={i}>{skill}</Item>
                ))}
            </List>
        </View>
    );
    return (
        <View>
            <Text style={styles.title}>Skills</Text>
            <SkillEntry
                name="Combat Abilities"
                skills={[
                    'Completed Jedi Master training and built a lightsaber from scratch in order to do battle against the Empire',
                    'Defeated the Rancor and rescued Princess Leia from Jabba the Hutt',
                    'Competent fighter pilot as well as an excelent shot with nearly any weapon',
                ]}
            />
        </View>
    )
};

export default Skills;