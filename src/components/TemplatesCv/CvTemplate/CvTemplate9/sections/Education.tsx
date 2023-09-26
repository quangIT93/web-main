/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet, Circle, Svg, Polygon } from '@react-pdf/renderer';

import moment from 'moment';

interface ICvExperience {
    color: any;
    profile: any;
}

const Education: React.FC<ICvExperience> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            marginBottom: '24.235pt',
            // paddingLeft: '0.9cm',
            // border: '1px solid red',
        },
        education: {
            display: 'flex',
            flexDirection: 'row',
            marginBottom: '15.263pt',
            marginLeft: '5.954pt'
            // border: '1px solid red'
        },
        arrow: {
            width: "0px",
            height: "0px",
            borderTop: '25px solid transparent',
            borderBottom: '25px solid transparent',

            borderLeft: '50px solid 404BA0',
            // border: '1px solid red',
            // transform: 'translateX(-8%)',
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
        left: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '35%',
            // marginLeft: '0.671cm',
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
            color: '#3B3A3C',
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
        achievements: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            // marginTop: '16.92pt',
            width: '100%',
            // border: '1px solid red'
        },
        title: {
            fontFamily: 'OpenSans-Semi-Bold',
            fontSize: 15,
            width: '34%',
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
            marginBottom: '11.617pt',
            gap: 2,
        },
        not: {
            width: 15,
            borderRadius: '50%',
        },
        line: {
            width: '4px',
            height: '1px',
            backgroundColor: '#505050'
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Education</Text>
            {
                profile?.profilesEducations && profile?.profilesEducations.map((item: any, i: any) => {
                    return (
                        <View style={styles.education} key={i}>
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
                            </View>
                            <View style={styles.right}>
                                <View style={styles.topInfo}>
                                    <Text style={styles.school}>{item?.companyName}</Text>
                                </View>
                                <View style={styles.botInfo}>
                                    <Text style={styles.detail}>{item?.extraInformation}</Text>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
};

export default Education;