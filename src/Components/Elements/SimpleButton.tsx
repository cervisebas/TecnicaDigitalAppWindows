import React, { PureComponent } from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native-windows";

type IProps = {
    title: string;
    style?: StyleProp<ViewStyle>;
    color?: string;
    onPress?: ()=>any;
};
type IState = {
    opacity: number;
};

export default class SimpleButton extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            opacity: 1
        };
        this._onPressIn = this._onPressIn.bind(this);
        this._onPressOut = this._onPressOut.bind(this);
    }
    _onPressIn() {
        this.setState({ opacity: 0.7 });
    }
    _onPressOut() {
        this.setState({ opacity: 1 });
    }
    render(): React.ReactNode {
        return(<Pressable
            style={[styles.button, this.props.style, { opacity: this.state.opacity }, (!!this.props.color)&&{ backgroundColor: this.props.color }]}
            onPress={this.props.onPress}
            onPressIn={this._onPressIn}
            onPressOut={this._onPressOut}
            focusable={false}>
            <Text style={styles.text}>{this.props.title}</Text>
        </Pressable>);
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF3232',
        minHeight: 34,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 4
    },
    text: {
        color: '#FFFFFF',
        fontSize: 12,
        textTransform: 'uppercase'
    }
});