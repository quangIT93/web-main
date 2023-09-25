import React, { useEffect } from 'react';
import { Text, View, StyleSheet, } from '@react-pdf/renderer';

interface ICvEducation {
    color: any;
    profile: any
}

const Awards: React.FC<ICvEducation> = (props) => {
    const { color, profile } = props;
    const styles = StyleSheet.create({
        container: {
            width: '100%',
            borderWidth: '1px',
            borderColor: color === 1
                ? '#213555'
                : color === 2
                    ? '#0D99FF'
                    : color === 3
                        ? '#FBBC04'
                        : color === 4
                            ? '#5CB265'
                            : '#D80000',
            borderTop: 'none',
            paddingTop: '19.996pt',
            paddingBottom: '19.996pt',
            paddingLeft: '15.463pt',
            paddingRight: '15.463pt',
        },
        content: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20.712pt',
        },
        language: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8pt',
            marginBottom: 5,
            // border: '1px solid red'
        },
        top: {
            marginBottom: '8.17pt',
        },
        bot: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            // marginLeft: '0.658cm'
        },
        line: {
            width: '126.84pt',
            height: '2px',
            backgroundColor: color === 1 ?
                "#252525" :
                color === 2 ?
                    "#0D99FF" :
                    color === 3 ?
                        "#FBBC04" :
                        color === 4 ?
                            "#5CB265" : "#D80000",
        },
        name: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 12,
            textAlign: 'justify',
            textTransform: 'uppercase',
        },
        detail: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 10,
            width: '100%',
            textAlign: 'justify',
            color: '#4A4747',
            // border: '1px solid red'
        },
        title: {
            fontFamily: "OpenSans-Semi-Bold",
            fontSize: 16,
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
    })

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Awards</Text>
                {
                    profile?.profileAwards && profile?.profileAwards?.map((item: any, i: any) => {
                        return (
                            <View style={styles.language} key={i}>
                                <Text style={styles.name}>{item?.title}</Text>
                                <Text style={styles.detail}>{item?.description}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    )
};

export default Awards