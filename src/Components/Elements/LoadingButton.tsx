import React, { PureComponent } from "react";
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native-windows";

type IProps = {
    title: string;
    loading: boolean;
    disable?: boolean;
    style?: StyleProp<ViewStyle>;
    onPress?: ()=>any;
};
type IState = {
    opacity: number;
};

export default class LoadingButton extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            opacity: 1
        };
        this._onPressIn = this._onPressIn.bind(this);
        this._onPressOut = this._onPressOut.bind(this);
    }
    componentDidUpdate() {
        if (this.props.disable && this.state.opacity < 1) this.setState({ opacity: 1 });
    }
    _onPressIn() {
        (!this.props.disable)&&this.setState({ opacity: 0.7 });
    }
    _onPressOut() {
        (!this.props.disable)&&this.setState({ opacity: 1 });
    }
    render(): React.ReactNode {
        return(<Pressable
            style={[styles.button, this.props.style, { opacity: (this.props.disable)? 0.6: this.state.opacity }]}
            onPress={(!this.props.disable)? this.props.onPress: undefined}
            onPressIn={this._onPressIn}
            onPressOut={this._onPressOut}
            disabled={this.props.disable}
            focusable={true}>
            {(this.props.loading)&&<ActivityIndicator animating={true} style={styles.activity} size={'small'} color={'#FFFFFF'} />}
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
        borderRadius: 4,
        flexDirection: 'row'
    },
    activity: {
        marginRight: 12
    },
    text: {
        color: '#FFFFFF',
        fontSize: 12,
        textTransform: 'uppercase'
    }
});