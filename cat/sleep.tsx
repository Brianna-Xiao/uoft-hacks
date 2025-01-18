import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

import sleepImage from './sleep.png';

const Sleep = () => {
    const scale = useRef(new Animated.Value(0.9)).current;
    const zzzOpacity = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;
  
    useEffect(() => {
      const animate = () => {
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 0.8,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.9,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]).start(() => animate());
      };
  
      animate();
    }, [scale]);
  
    useEffect(() => {
      const animateZzz = () => {
        Animated.stagger(500, zzzOpacity.map(opacity => 
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          })
        )).start();
      };
  
      animateZzz();
    }, [zzzOpacity]);
  
    return (
      <View style={styles.container}>
        <Animated.Image 
          source={sleepImage} 
          style={[styles.image, { transform: [{ scale }] }]} 
          resizeMode="contain" 
        />
        <View style={styles.zzzContainer}></View>
          <Animated.Text style={[styles.zzz, { opacity: zzzOpacity[0] }]}>z</Animated.Text>
          <Animated.Text style={[styles.zzz, styles.zzzSecond, { opacity: zzzOpacity[1] }]}>z</Animated.Text>
          <Animated.Text style={[styles.zzz, styles.zzzThird, { opacity: zzzOpacity[2] }]}>z</Animated.Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '70%', 
      height: '55%', 
    },
    zzzContainer: {
      position: 'absolute',
      top: '50%',
      left: '20%',
    },
    zzz: {
      fontSize: 24,
      color: 'black',
    },
    zzzSecond: {
      position: 'absolute',
      top: -20,
      left: -10,
    },
    zzzThird: {
      position: 'absolute',
      top: -30, // Adjusted from -40 to -30
      left: -15, // Adjusted from -20 to -15
    },
  });
export default Sleep;  
