import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    bulletPoint: {
        width: 10,
        fontSize: 10,
    },
    itemContent: {
        flex: 1,
        fontFamily: "Montserrat Regular",
        fontSize: 9,
    },
});

const List: React.FC<any> = ({ children }) => children;

export const Item: React.FC<any> = ({ children }) => (
    <View style={styles.item}>
        <Text style={styles.bulletPoint}>-</Text>
        <Text style={styles.itemContent}>{children}</Text>
    </View>
);

export default List;