import { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const sickImage = require('../assets/sick.png');

const Sick = () => {
    const translateX = useRef(new Animated.Value(0)).current;
  
    useEffect(() => {
        const animate = () => {
            Animated.sequence([
                Animated.timing(translateX, {
                    toValue: -1, // reduced from -5
                    duration: 30,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 1, // reduced from 5
                    duration: 10,
                    useNativeDriver: true,
                }),
                Animated.timing(translateX, {
                    toValue: 0,
                    duration: 10,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setTimeout(animate, 0);
            });
        };
    
        animate();
    }, [translateX]);
    
  
    return (
      <View style={styles.container}>
        <Animated.Image
          source={sickImage}
          style={[
            styles.image,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default Sick;
