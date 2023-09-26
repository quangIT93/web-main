/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet, Circle, Svg, Polygon } from '@react-pdf/renderer';

import moment from 'moment';

interface ICvExperience {
    color: any;
    profile: any;
}

const Activities: React.FC<ICvExperience> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: '24.235pt',
            // paddingLeft: '0.9cm',
            // border: '1px solid red',
        },
        activity: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '15.263pt',
            marginLeft: '5.954pt'
            // border: '1px solid red'
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '35%',
            // border: '1px solid red',
            position: 'relative',
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '65%',
            marginLeft: '0.671cm',
            // marginBottom: 5,
            // marginLeft: '34.638pt',
            // border: '1px solid red',
            position: 'relative',
        },
        time: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 11,
            // letterSpacing: '2px',
            // marginBottom: '2px',
            textAlign: 'justify',
            color: '#152D35',
        },
        school: {
            fontFamily: "OpenSans-Regular",
            fontSize: 11,
            textTransform: 'uppercase',
            textAlign: 'justify',
            width: '100%',
            color: '#3B3A3C'
            // border: '1px solid red',

        },
        detail: {
            fontFamily: "OpenSans-Regular",
            fontSize: 9,
            width: '100%',
            textAlign: 'justify',
            color: '#3B3A3C',
            // border: '1px solid red'
        },
        title: {
            fontFamily: 'OpenSans-Semi-Bold',
            fontSize: 15,
            width: '30%',
            marginBottom: '23.191pt',
            textTransform: 'uppercase',
            color: color === 1
                ? '#152D35'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000',
            paddingTop: '7.211pt',
            paddingBottom: '7.211pt',
            paddingLeft: '5.954pt',
            paddingRight: '5.954pt',
            backgroundColor: '#D4ECDD'
        },
        botInfo: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            // border: '1px solid red',
        },
        topInfo: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: '7.66pt',
        },
        timeContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
        },
        not: {
            width: 15,
            borderRadius: '50%',
        },
        line: {
            width: '4px',
            height: '1x',
            backgroundColor: '#777878'
        },
        timeCompany: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            marginBottom: '11.617pt',
            gap: '128pt',
        },
        company: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 11,
            // letterSpacing: '2px',
            // marginBottom: '2px',
            textAlign: 'justify',
            color: '#152D35',
            width: '100%',
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activities</Text>
            {
                profile?.profileActivities && profile?.profileActivities.map((item: any, i: any) => {
                    return (
                        <View style={styles.activity} key={i}>
                            <View style={styles.left}>
                                <View style={styles.timeContainer}>
                                    <Text style={styles.time}>
                                        {moment(item?.startDate).format('YYYY')}
                                    </Text>
                                    <View style={styles.line}></View>
                                    <Text style={styles.time}>
                                        {moment(item?.endDate).format('YYYY')}
                                    </Text>
                                </View>
                                <View style={styles.timeCompany}>
                                    <Text style={styles.company}>{item?.organization}</Text>
                                </View>
                            </View>
                            <View style={styles.right}>
                                <View style={styles.topInfo}>
                                    <Text style={styles.school}>{item?.title}</Text>
                                </View>
                                <View style={styles.botInfo}>
                                    <Text style={styles.detail}>{item?.description}</Text>
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