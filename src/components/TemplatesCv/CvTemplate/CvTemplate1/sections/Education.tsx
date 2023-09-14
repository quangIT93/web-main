import React from 'react';
import { Text, View, StyleSheet, Svg, Circle } from '@react-pdf/renderer';

import List, { Item } from './List';
interface ICvEducation {
    color: any;
}

const Education: React.FC<ICvEducation> = (props) => {
    const { color } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: 10,
            marginLeft: '1.583cm',
        },
        education: {
            display: 'flex',
            flexDirection: 'row',
            // border: '1px solid red'
        },
        not: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            // border: '1px solid red',
            // width: 10,
            // fontSize: 20,
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
            // border: '1px solid red'
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginLeft: '0.658cm'
        },
        time: {
            fontFamily: "Montserrat Regular",
            fontSize: 11,
            letterSpacing: '2px',
            marginBottom: '2px',
        },
        school: {
            fontFamily: "Montserrat Bold",
            fontSize: 10,
        },
        detail: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            wordBreak: "break-word",
            width: '100%',
            // border: '1px solid red'
        },
        achievements: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            marginTop: '16.92pt',
            width: '100%',
            // border: '1px solid red'
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

    const educations = [
        {
            "name": "Greenwich University",
            "time": "2017-2020",
            "detail": [
                'Completed Jedi Master training and built a lightsaber from scratch in order to do battle against the Empire',
                'Defeated the Rancor and rescued Princess Leia from Jabba the Hutt',
                'Competent fighter pilot as well as an excelent shot with nearly any weapon',
            ],
            "achievements": [
                'Completed Jedi Master training and built a lightsaber from scratch in order to do battle against the Empire'
            ],
        }
    ]

    const EducationEntry: React.FC<any> = ({ educations }) => (
        educations.map((education: any, i: any) => (
            <View style={styles.education} key={i}>
                <View style={styles.left}>
                    {/* <Text style={styles.not}>•</Text> */}
                    <Svg viewBox="0 0 2 2" style={{ width: 10 }}>
                        <Circle
                            cx="1"
                            cy="1"
                            r="0.5"
                            fill="#000000"
                            stroke="none"
                        />
                    </Svg>
                </View>
                <View style={styles.right}>
                    <Text style={styles.time}>{education.time}</Text>
                    <Text style={styles.school}>{education.name}</Text>
                    <Text style={styles.detail}>{education.detail}</Text>
                    <View style={styles.achievements}>
                        <Text style={styles.detail}>
                            {`(*)Achievements: `}
                        </Text>
                        <List>
                            {education.achievements.map((iem: any, i: any) => (
                                <Item key={i}>{iem}</Item>
                            ))}
                        </List>
                    </View>
                </View>
            </View>
        ))
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Education</Text>
            <EducationEntry educations={educations} />
        </View>
    )
};

export default Education