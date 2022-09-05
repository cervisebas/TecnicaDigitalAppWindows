import React, { memo, useEffect } from "react";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { StyleSheet, Text } from "react-native-windows";

export default memo((props: { visible: boolean; message: string; onClose: ()=>any; })=>{
    const animatedStyles = useAnimatedStyle(()=>({
        opacity: withSpring((props.visible)? 1: 0),
        marginRight: withSpring((props.visible)? 16: -30)
    }), [props.visible]);
    useEffect(()=>{
        if (props.visible) setTimeout(props.onClose, 4000);
    }, [props.visible]);
    return(<Animated.View style={[styles.content, animatedStyles]}>
        <Text style={styles.message}>{props.message}</Text>
    </Animated.View>);
});

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        right: 0,
        top: 0,
        marginTop: 16,
        marginRight: -30,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 12,
        paddingRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 4
    },
    message: {
        maxWidth: 200,
        fontSize: 14
    }
});