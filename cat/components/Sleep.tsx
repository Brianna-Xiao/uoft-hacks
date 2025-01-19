import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const sleepImage = require('../assets/sleep.png');

const Sleep = () => {
    const scale = useRef(new Animated.Value(0.9)).current;
    const zzzOpacity = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;
  
    useEffect(() => {
      const animate = () => {
        // Reset Z's opacity
        zzzOpacity.forEach(opacity => opacity.setValue(0));

        Animated.sequence([
          // Shrink and show Z's
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 0.8,
              duration: 2000,
              useNativeDriver: true,
            }),
            // Stagger the Z's during shrinking
            Animated.stagger(500, [
              Animated.timing(zzzOpacity[0], {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(zzzOpacity[1], {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              }),
              Animated.timing(zzzOpacity[2], {
                toValue: 1,
                duration: 400,
                useNativeDriver: true,
              })
            ])
          ]),
          // Hide Z's and expand
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 0.9,
              duration: 2000,
              useNativeDriver: true,
            }),
            // Fade out all Z's
            ...zzzOpacity.map(opacity =>
              Animated.timing(opacity, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
              })
            )
          ])
        ]).start(() => animate());
      };
  
      animate();
    }, [scale, zzzOpacity]);
  
    return (
      <View style={styles.container}>
        <Animated.Image 
          source={sleepImage} 
          style={[styles.image, { transform: [{ scale }] }]} 
          resizeMode="contain" 
        />
        <View style={styles.zzzContainer}>
          <Animated.Text style={[styles.zzz, { opacity: zzzOpacity[0] }]}>z</Animated.Text>
          <Animated.Text style={[styles.zzz, styles.zzzSecond, { opacity: zzzOpacity[1] }]}>z</Animated.Text>
          <Animated.Text style={[styles.zzz, styles.zzzThird, { opacity: zzzOpacity[2] }]}>z</Animated.Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: 300,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '70%',
      height: '55%',
    },
    zzzContainer: {
      position: 'absolute',
      top: '35%',
      left: '20%',
    },
    zzz: {
      fontSize: 24,
      color: 'black',
      position: 'absolute',
    },
    zzzSecond: {
      top: -20,
      left: -10,
    },
    zzzThird: {
      top: -40,
      left: -20,
    },
});

export default Sleep;  
