/* eslint-disable react/no-array-index-key */

import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

import Title from './Title';
import List, { Item } from './List';

interface ICvSkills {
    color: any;
}


const Skills: React.FC<ICvSkills> = (props) => {
    const { color } = props;
    const styles = StyleSheet.create({
        container: {
            marginBottom: '1.852cm',
            marginLeft: '1.583cm',
            // border: '1px solid red'
        },
        title: {
            fontFamily: "Montserrat Bold",
            fontSize: 12,
            letterSpacing: '2px',
            marginBottom: '0.476cm',
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
        profile: {
            fontFamily: "Montserrat Regular",
            fontSize: 9,
            wordBreak: "break-word",
            width: '100%',
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>PROFILE</Text>
            <Text style={styles.profile}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, labore repudiandae commodi error distinctio laborum ex, quas placeat iste facilis nam. Numquam quo nihil quia velit! Repellendus recusandae cupiditate saepe?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est saepe minima ab ipsum repellat porro inventore velit necessitatibus quibusdam. Error magnam sequi consectetur amet beatae a illo accusamus id iste.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae eaque laboriosam molestiae numquam animi voluptatibus sit quisquam sapiente? Quas non ducimus quis ex amet, fugit molestiae nesciunt minima aliquam earum?
            </Text>
        </View>
    )
};

export default Skills;