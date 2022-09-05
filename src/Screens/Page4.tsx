import React, { PureComponent } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native-windows";

type IProps = {
    style?: StyleProp<ViewStyle>;
};
type IState = {};

export default class Page4 extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render(): React.ReactNode {
        return(<View style={[styles.content, this.props.style]}>
            <View style={styles.appBar}>
                <Text style={styles.title}>Lista de estudiantes</Text>
            </View>
            <View style={styles.content2}>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    content2: {
        flex: 2
    },
    appBar: {
        position: 'relative',
        height: 52,
        width: '100%',
        backgroundColor: '#FF3232',
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        marginLeft: 16
    }
});