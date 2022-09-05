import React, { PureComponent } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native-windows";

type IProps = {
    text: string;
    color?: string;
    style?: StyleProp<ViewStyle>;
};
type IState = {};

export default class Chip extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render(): React.ReactNode {
        return(<View style={[styles.content, this.props.style, (!!this.props.color)&&{ borderColor: this.props.color }]}>
            <Text style={[styles.text, (!!this.props.color)&&{ color: this.props.color }]}>{this.props.text}</Text>
        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        minHeight: 36,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: '#FFFFFF',
        borderColor: '#FF3232',
        borderWidth: 1.2,
        overflow: 'hidden',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        color: '#FF3232',
        fontWeight: '400'
    }
});