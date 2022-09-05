import React, { PureComponent } from "react";
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native-windows";

type IProps = {
    icon: React.ReactNode;
    size?: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
    onPress?: ()=>any;
};
type IState = {
    opacity: number;
};

export default class IconButton extends PureComponent<IProps, IState> {
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
            style={[
                styles.button,
                this.props.style,
                { opacity: this.state.opacity },
                (!!this.props.color)&&{ backgroundColor: this.props.color },
                (this.props.size !== undefined)&&{ width: this.props.size, height: this.props.size, borderRadius: this.props.size }
            ]}
            onPress={this.props.onPress}
            onPressIn={this._onPressIn}
            onPressOut={this._onPressOut}
            focusable={false}>
            <Text style={[styles.icon, (this.props.size !== undefined)&&{ width: (this.props.size - 10), height: (this.props.size - 10), fontSize: (this.props.size - 10) }]}>{this.props.icon}</Text>
        </Pressable>);
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF3232',
        minHeight: 34,
        minWidth: 34,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 34,
        width: 34,
        height: 34
    },
    icon: {
        fontFamily: 'Segoe MDL2 Assets',
        color: '#FFFFFF',
        fontSize: 20,
        width: 20,
        height: 20
    }
});