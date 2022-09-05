import React, { useEffect, useState } from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { View } from "react-native-windows";

type IProps = {
    visible: boolean;
    inmediateIn?: boolean;
    inmediateOut?: boolean;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
};

export default function (props: IProps) {
    return(<View focusable={false} style={[styles.modal, { display: (props.visible)? 'flex': 'none' }]}>
        {props.children}
    </View>);
}


const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        zIndex: 10,
        overflow: 'hidden'
    }
});