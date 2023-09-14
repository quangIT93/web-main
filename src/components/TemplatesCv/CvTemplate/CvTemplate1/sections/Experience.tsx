/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet, Line, Circle, Svg } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';

interface ICvExperience {
    color: any;
}

const Experience: React.FC<ICvExperience> = (props) => {
    const { color } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: 10,
            marginLeft: '0.9cm',
        },
        experience: {
            display: 'flex',
            flexDirection: 'row',
            // border: '1px solid red'
        },
        not: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            // border: '1px solid red',
            width: 10,
            // fontSize: 20,
            gap: '0.516cm'
        },
        line: {
            width: '1px',
            height: '100%',
            // backgroundColor: '#000000',
            "&:last-child": {
                backgroundColor: '#FFFFFF',
            }
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            // border: '1px solid red'
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginLeft: '0.671cm',

            // border: '1px solid red',
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
            // marginTop: '16.92pt',
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
    });



    const experiences = [
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
        },
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
        },
    ]

    const ExperienceEntry: React.FC<any> = ({ experiences }) => (
        experiences.map((experience: any, i: any) => (
            <View style={styles.experience} key={i}>
                <View style={styles.left}>
                    {/* <Text style={styles.not}>•</Text> */}
                    {/* <View style={styles.line}></View> */}
                    <Svg viewBox="0 0 2 2" style={{ width: 10 }}>
                        <Circle
                            cx="1"
                            cy="1"
                            r="0.5"
                            fill="#000000"
                            stroke="none"
                        />
                    </Svg>
                    <Svg height={i + 1 === experiences.length ? "0" : "160"} width="5" >
                        <Line
                            x1="5"
                            y1="-2"
                            x2="5"
                            y2={i + 1 === experiences.length ? "0" : "160"}
                            strokeWidth={0.5}
                            stroke="#282828"
                        />
                    </Svg>
                </View>
                <View style={styles.right}>
                    <Text style={styles.time}>{experience.time}</Text>
                    <Text style={styles.school}>{experience.name}</Text>
                    <Text style={styles.detail}>{experience.detail}</Text>
                    <View style={styles.achievements}>
                        <Text style={styles.detail}>
                            {`(*)Achievements: `}
                        </Text>
                        <List>
                            {experience.achievements.map((iem: any, i: any) => (
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
            <Text style={styles.title}>Experience</Text>
            <ExperienceEntry experiences={experiences} />
        </View>
    )
};

export default Experience;