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
            marginBottom: '22.426pt',
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
            fontFamily: "Montserrat Semi Bold",
            fontSize: 9,
            // letterSpacing: '2px',
            // marginBottom: '2px',
            textAlign: 'justify',
            color: '#777878',
        },
        school: {
            fontFamily: "Montserrat Bold",
            fontSize: 10,
            marginLeft: '4.213pt',
            textTransform: 'uppercase',
            textAlign: 'justify',
            width: '100%',
            color: '#505050'
            // border: '1px solid red',

        },
        detail: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            width: '100%',
            textAlign: 'justify',
            color: '#777878',
            // border: '1px solid red'
        },
        achievements: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 9,
            // marginTop: '16.92pt',
            width: '100%',
            // border: '1px solid red'
        },
        title: {
            fontFamily: 'Montserrat Bold',
            fontSize: 14,
            marginBottom: '15.447pt',
            width: '100%',
            textTransform: 'uppercase',
            color: color === 1 ?
                "#505050" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000",
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
            fontFamily: "OpenSans-Semi-Bold-Italic",
            fontSize: 9,
            maxWidth: '40%',
            // letterSpacing: '2px',
            // marginBottom: '2px',
            textAlign: 'justify',
            color: '#777878',
            // border: '1px solid red',
            // fontStyle: 'italic'
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
                                    <Svg height="6" width="5">
                                        <Polygon
                                            points="0,0 5,3 0,6"
                                            fill={
                                                color === 1 ?
                                                    "#404BA0" :
                                                    color === 2 ?
                                                        "#0D99FF" :
                                                        color === 3 ?
                                                            "#FBBC04" :
                                                            color === 4 ?
                                                                "#5CB265" : "#D80000"
                                            }
                                            stroke="none"
                                            strokeWidth={1}
                                        />
                                    </Svg>
                                    <Text style={styles.school}>{item?.title}</Text>
                                </View>
                                <View style={styles.botInfo}>
                                    <View style={styles.timeCompany}>
                                        <Text style={styles.company}>{item?.organization}</Text>
                                        <View style={styles.timeContainer}>
                                            <Text style={styles.time}>
                                                {moment(item?.startDate).format('MMMM')}
                                                {" '"}
                                                {moment(item?.startDate).format('YY')}
                                            </Text>
                                            <View style={styles.line}></View>
                                            <Text style={styles.time}>
                                                {moment(item?.endDate).format('MMMM')}
                                                {" '"}
                                                {moment(item?.endDate).format('YY')}
                                            </Text>
                                        </View>
                                    </View>
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