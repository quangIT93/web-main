import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Svg, Circle } from '@react-pdf/renderer';

import List, { Item } from './List';
import moment from 'moment';
interface ICvEducation {
    color: any;
    profile: any
}

const Skills: React.FC<ICvEducation> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: '24.69pt',
            paddingRight: '0.905cm'
            // marginLeft: '1.583cm',
        },
        education: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 5,
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
            // marginLeft: '0.658cm'
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
            textAlign: 'justify'
        },
        detail: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            wordBreak: "break-word",
            width: '100%',
            textAlign: 'justify'
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Skills</Text>
            {
                profile?.profilesSkills && profile?.profilesSkills.map((education: any, i: any) => {
                    return (
                        <View style={styles.education} key={i}>
                            {/* <View style={styles.left}>
                                <Svg viewBox="0 0 2 2" style={{ width: 10 }}>
                                    <Circle
                                        cx="1"
                                        cy="1"
                                        r="0.5"
                                        fill={
                                            color === 1 ?
                                                "#252525" :
                                                color === 2 ?
                                                    "#0D99FF" :
                                                    color === 3 ?
                                                        "#FBBC04" :
                                                        color === 4 ?
                                                            "#5CB265" : "#D80000"
                                        }
                                        stroke="none"
                                    />
                                </Svg>
                            </View> */}
                            <View style={styles.right}>
                                <Text style={styles.school}>{education?.skillName}</Text>
                                <Text style={styles.detail}>{education?.dataLevel?.data}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
};

export default Skills