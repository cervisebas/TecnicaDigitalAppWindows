import React, { PureComponent } from "react";
import { ActivityIndicator, StyleProp, StyleSheet, View, ViewStyle } from "react-native-windows";

type IProps = {
    size?: number | "large" | "small";
    style?: StyleProp<ViewStyle>;
};
type IState = {};

export default class UniversalLoading extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }
    render(): React.ReactNode {
        return(<View style={[styles.content, this.props.style]}>
            <ActivityIndicator
                animating={true}
                size={(this.props.size !== undefined)? this.props.size: 'large'}
            />
        </View>);
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});