import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import List, { Item } from './List';
interface ICvEducation {
    color: any;
}

const Education: React.FC<ICvEducation> = (props) => {
    const { color } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: 10,
        },
        time: {
            fontFamily: "Montserrat Regular",
            fontSize: 11,
            letterSpacing: '2px',
            marginBottom: '0.658cm'
        },
        school: {
            fontFamily: "Montserrat Bold",
            fontSize: 12,
        },
        detail: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
        },
        achievements: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            marginTop: '16.92pt'
        },
        degree: {
            fontFamily: 'Lato',
            fontSize: 10,
        },
        candidate: {
            fontFamily: 'Lato Italic',
            fontSize: 10,
        },
        title: {
            fontFamily: "Montserrat Bold",
            fontSize: 12,
            letterSpacing: '2px',
            marginBottom: '0.658cm',
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
    })

    const EducationEntry: React.FC<any> = ({ name, time, detail, achievements }) => (
        <View>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.school}>{name}</Text>
            <Text style={styles.detail}>{detail}</Text>
            <View style={styles.achievements}>
                <Text style={styles.detail}>
                    { }
                </Text>
                <List>
                    {achievements.map((iem: any, i: any) => (
                        <Item key={i}>{iem}</Item>
                    ))}
                </List>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Education</Text>
            <EducationEntry
                name="Greenwich University"
                time="2017-2020"
                detail={[
                    'Completed Jedi Master training and built a lightsaber from scratch in order to do battle against the Empire',
                    'Defeated the Rancor and rescued Princess Leia from Jabba the Hutt',
                    'Competent fighter pilot as well as an excelent shot with nearly any weapon',
                ]}
                achievements={[
                    'Completed Jedi Master training and built a lightsaber from scratch in order to do battle against the Empire'
                ]}
            />
        </View>
    )
};

export default Education