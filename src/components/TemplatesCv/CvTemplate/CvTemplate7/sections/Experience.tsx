/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet, Line, Circle, Svg } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';
import moment from 'moment';

interface ICvExperience {
    color: any;
    profile: any;
}

const Experience: React.FC<ICvExperience> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginBottom: '15.468pt'
        },
        experience: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '15.263pt'
            // border: '1px solid red'
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '40%'
            // border: '1px solid red'
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '90%',
            // marginLeft: '0.671cm',
            // marginBottom: 5,
            marginLeft: '34.638pt',
            // border: '1px solid red',
            position: 'relative',
        },
        time: {
            fontFamily: "Montserrat Regular",
            fontSize: 11,
            letterSpacing: '2px',
            marginBottom: '2px',
            textAlign: 'justify'
        },
        school: {
            fontFamily: "Montserrat Bold",
            fontSize: 10,
            textAlign: 'justify',
            width: '100%',
        },
        companyName: {
            fontFamily: "Montserrat Bold",
            fontSize: 10,
            textAlign: 'justify',
            // wordBreak: "break-all",
            width: '100%',
            marginBottom: '7.761pt',
            color: color === 1 ?
                "#252525" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000"
        },
        detail: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            // wordBreak: "break-word",
            width: '100%',
            // flexGrow: 1,
            textAlign: 'justify'
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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Experience</Text>
            {
                profile?.profilesExperiences && profile?.profilesExperiences.map((experience: any, i: any) => {
                    return (
                        <View style={styles.experience} key={i}>
                            <View style={styles.left}>
                                <Text style={styles.companyName}>
                                    {moment(experience?.startDate).format('YYYY')}{"-"}
                                    {moment(experience?.endDate).format('YYYY')}
                                </Text>
                                <Text style={styles.time}>
                                    {experience?.companyName}
                                </Text>
                            </View>
                            <View style={styles.right}>
                                <Text style={styles.school}>{experience?.title}</Text>
                                <Text style={styles.detail}>{experience?.extraInformation}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
};

export default Experience;