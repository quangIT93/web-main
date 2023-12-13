/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet, Circle, Svg } from '@react-pdf/renderer';

import moment from 'moment';

interface ICvExperience {
    color: any;
    profile: any;
}

const Activities: React.FC<ICvExperience> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: '40.851pt',
            // paddingLeft: '0.9cm',
            // border: '1px solid red',
        },
        activity: {
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
            // border: '1px solid red',
            transform: 'translateX(-8%)',
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            // marginLeft: '0.671cm',
            // marginBottom: 5,
            // marginLeft: '34.638pt',
            // border: '1px solid red',
            position: 'relative',
        },
        time: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 10,
            // letterSpacing: '2px',
            // marginBottom: '2px',
            textAlign: 'justify',
            color: '#4A4747',
        },
        school: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 12,
            marginLeft: '4.862pt',
            textTransform: 'uppercase',
            textAlign: 'justify',
            width: '100%',
            color: color === 1 ?
                "#213555" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000"
            // border: '1px solid red',

        },
        detail: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 10,
            // width: '100%',
            textAlign: 'justify',
            color: '#4A4747',
            marginLeft: '8.261pt',
            // border: '1px solid blue'
        },
        achievements: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 9,
            // marginTop: '16.92pt',
            width: '100%',
            // border: '1px solid red'
        },
        title: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 16,
            marginBottom: '20.553pt',
            marginLeft: '11.79pt',
            textTransform: 'uppercase',
            color: color === 1 ?
                "#213555" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000"
        },
        botInfo: {
            display: 'flex',
            flexDirection: 'row',
            marginLeft: '30pt',
            gap: '10pt'
            // border: '1px solid red',
        },
        topInfo: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginBottom: '4.006pt',
        },
        timeContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '10%',
            gap: '5pt',
        },
        detailContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '90%',
            gap: '5pt',
        },
        not: {
            width: 15,
            borderRadius: '50%',
        },
        line: {
            width: '1px',
            height: '6px',
            backgroundColor: '#4A4747'
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activities</Text>
            {
                profile?.profileActivities && profile?.profileActivities.map((item: any, i: any) => {
                    return (
                        <View style={styles.activity} key={i}>
                            <View style={styles.right}>
                                <View style={styles.topInfo}>
                                    <View style={styles.left}>
                                        <Svg viewBox="0 0 2 2" style={styles.not}>
                                            <Circle
                                                cx="1"
                                                cy="1"
                                                r="1.4"
                                                fill="#ffffff"
                                                stroke={
                                                    color === 1 ?
                                                        "#213555" :
                                                        color === 2 ?
                                                            "#0D99FF" :
                                                            color === 3 ?
                                                                "#FBBC04" :
                                                                color === 4 ?
                                                                    "#5CB265" : "#D80000"
                                                }
                                            />
                                        </Svg>
                                    </View>
                                    <Text style={styles.school}>{item?.title}</Text>
                                </View>
                                <View style={styles.botInfo}>
                                    <View style={styles.timeContainer}>
                                        <Text style={styles.time}>
                                            {moment(item?.startDate).format('YYYY')}
                                        </Text>
                                        <View style={styles.line}></View>
                                        <Text style={styles.time}>
                                            {moment(item?.endDate).format('YYYY')}
                                        </Text>
                                    </View>
                                    <View style={styles.detailContainer}>
                                        <Text style={styles.detail}>{item?.description}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
};

export default Activities;