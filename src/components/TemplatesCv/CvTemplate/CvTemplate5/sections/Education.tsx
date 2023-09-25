import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Svg, Circle } from '@react-pdf/renderer';

import List, { Item } from './List';
import moment from 'moment';
interface ICvEducation {
    color: any;
    profile: any
}

const Education: React.FC<ICvEducation> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: '24.69pt',
            paddingRight: '0.905cm',
            // marginLeft: '1.583cm',
        },
        education: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: 5,
            marginLeft: '9.141pt'
            // border: '1px solid red'
        },
        not: {
            // display: 'flex',
            // flexDirection: 'column',
            // alignItems: 'flex-end',
            // border: '1px solid red'
            // border: '1px solid red',
            width: 10,
            // fontSize: 20,
            // gap: '0.516cm'
            position: 'absolute',
            left: '-4.25px',
            top: 0,
            zIndex: 2
        },
        line: {
            width: 1,
            height: '90%',
            backgroundColor: color === 1 ?
                "#252525" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000",
            marginRight: '0.671cm',
        },
        lineWhite: {
            width: 1,
            height: '70%',
            backgroundColor: '#FFFFFF',
            marginRight: '0.671cm',
            zIndex: 1
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
            alignItems: 'flex-start',
            width: '100%',
            // marginLeft: '0.658cm'
            marginBottom: 5,
            position: 'relative',
        },
        time: {
            fontFamily: "Montserrat Regular",
            fontSize: 11,
            letterSpacing: '2px',
            marginBottom: '2px',
        },
        school: {
            fontFamily: "Montserrat Regular",
            fontSize: 12,
            textAlign: 'justify',
            width: '100%',
            color: color === 1
                ? '#112D4E'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000'
        },
        detail: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            color: '#777878',
            marginTop: '15.766pt',
            // wordBreak: "break-word",
            width: '100%',
            textAlign: 'justify',
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
            fontFamily: 'Montserrat Regular',
            fontSize: 13,
            width: '159.407pt',
            textAlign: 'center',
            letterSpacing: '2px',
            // marginBottom: '0.658cm',
            textTransform: 'uppercase',
            color: color === 1 ?
                "#112D4E" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000"
        },
        borderBot: {
            width: '159.407pt',
            height: 1.25,
            backgroundColor: color === 1 ?
                "#112D4E" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000",
            marginTop: '6.745pt',
            marginBottom: '0.476cm'
        },
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Education</Text>
            <View style={styles.borderBot}></View>
            {
                profile?.profilesEducations && profile?.profilesEducations.map((education: any, i: any) => {
                    return (
                        <View style={styles.education} key={i}>
                            <View style={styles.right}>
                                <Text style={styles.school}>{education?.companyName}</Text>
                                <Text style={styles.time}>
                                    {moment(education?.startDate).format('YYYY')}{" - "}
                                    {moment(education?.endDate).format('YYYY')}
                                </Text>
                                <Text style={styles.detail}>{education?.extraInformation}</Text>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
};

export default Education