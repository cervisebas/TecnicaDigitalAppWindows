import React, { PureComponent, useEffect, useState } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp, TouchableOpacityProps } from "react-native-windows";

type IProps = {
    title: string;
    icon: React.ReactNode;
    color?: string;
    extend?: boolean;
    active: boolean;
    style?: StyleProp<ViewStyle>;
    onPress?: ()=>any;
};
type IState = {
    backgroundColor: string;
    showTitle: boolean;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default class ButtonBar extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            showTitle: false
        };
        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onPressIn = this._onPressIn.bind(this);
        this._onPressOut = this._onPressOut.bind(this);
    }
    _onMouseEnter() {
        this.setState({ backgroundColor: 'rgba(0, 0, 0, 0.2)' });
    }
    _onMouseLeave() {
        this.setState({ backgroundColor: 'rgba(0, 0, 0, 0)' });
    }
    _onPressIn() {
        this.setState({ backgroundColor: 'rgba(0, 0, 0, 0.5)' });
    }
    _onPressOut() {
        this.setState({ backgroundColor: 'rgba(0, 0, 0, 0)' });
    }
    componentDidUpdate(prevProps: Readonly<IProps>): void {
        if (this.props.extend && prevProps.extend !== this.props.extend && !this.state.showTitle) {
            setTimeout(()=>this.setState({ showTitle: true }), 250);
        } else if (!this.props.extend && prevProps.extend !== this.props.extend && this.state.showTitle) {
            setTimeout(()=>this.setState({ showTitle: false }), 50);
        }
    }
    render(): React.ReactNode {
        return(<AnimatedTouchable
            style={[this.props.style, (this.props.active)&&styles.activeContent, { backgroundColor: this.state.backgroundColor }]}
            // @ts-ignore
            onMouseEnter={this._onMouseEnter}
            onMouseLeave={this._onMouseLeave}
            onPress={this.props.onPress}
            onPressIn={this._onPressIn}
            onPressOut={this._onPressOut}
            activeOpacity={1}
            extend={!!this.props.extend}>
            <Text style={[styles.icon, { color: this.props.color }, (this.props.active)&&styles.activeText]}>{this.props.icon}</Text>
            <Text style={[styles.title, { display: (this.state.showTitle)? 'flex': 'none', color: this.props.color }, (this.props.active)&&styles.activeText]} numberOfLines={1}>{this.props.title}</Text>
        </AnimatedTouchable>);
    }
}

interface IProps2 extends TouchableOpacityProps {
    extend: boolean;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
};

function AnimatedTouchable(props: IProps2) {
    const widthBar = useSharedValue((props.extend)? 230: 40);
    const [justifyContentBar, setJustifyContentBar] = useState('center');
    const animatedStyles = useAnimatedStyle(()=>({ width: withSpring(widthBar.value, { mass: 0.5 }) }), [props.extend]);
    const extraStyle = useAnimatedStyle(()=>({ justifyContent: justifyContentBar as any }), [justifyContentBar]);
    useEffect(()=>{
        widthBar.value = (props.extend)? 230: 40;
        setTimeout(()=>setJustifyContentBar((props.extend)? 'flex-start': 'center'), (props.extend)? 0: 250);
    }, [props.extend]);
    return(<AnimatedTouchableOpacity {...props} style={[props.style, extraStyle, animatedStyles]}>
        {props.children}
    </AnimatedTouchableOpacity>);
}

const styles = StyleSheet.create({
    icon: {
        fontFamily: 'Segoe MDL2 Assets',
        fontSize: 20
    },
    title: {
        marginLeft: 12,
        fontSize: 14,
        textTransform: 'uppercase',
        overflow: 'hidden'
    },
    activeContent: {
        borderWidth: 1.5,
        borderColor: '#FF3232'
    },
    activeText: {
        color: '#FF3232'
    }
});