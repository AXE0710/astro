import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image } from 'react-native';
import logo from './assests/logo.png';

const AstrologyApp = () => {
  // Animation references
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in (logo)
  const slideAnim = useRef(new Animated.Value(-300)).current; // Slide-in from the left
  
  // Separate rotation animation values for each option
  const rotateAnim1 = useRef(new Animated.Value(0)).current;
  const rotateAnim2 = useRef(new Animated.Value(0)).current;
  const rotateAnim3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in animation for the logo
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Slide-in animation for the options
    Animated.timing(slideAnim, {
      toValue: 0, // Move to the center
      duration: 1000, // Slide-in slower for better effect
      delay: 500, // Slide-in starts after logo fades in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, slideAnim]);

  // Rotation animation function for individual options
  const handleOptionClick = (rotateAnim) => {
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Interpolation for each option's rotation
  const rotateInterpolation1 = rotateAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotateInterpolation2 = rotateAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotateInterpolation3 = rotateAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Logo with fade-in animation */}
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image source={logo} style={styles.logoImage} />
      </Animated.View>

      {/* Options with slide-in animation */}
      <Animated.View style={[styles.optionsContainer, { transform: [{ translateX: slideAnim }] }]}>
        
        {/* Option 1 */}
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation1 }] }}>
          <TouchableOpacity onPress={() => handleOptionClick(rotateAnim1)} style={styles.option}>
            <Text style={styles.optionText}>Talk with Guru Ji</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Option 2 */}
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation2 }] }}>
          <TouchableOpacity onPress={() => handleOptionClick(rotateAnim2)} style={styles.option}>
            <Text style={styles.optionText}>Contact</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Option 3 */}
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation3 }] }}>
          <TouchableOpacity onPress={() => handleOptionClick(rotateAnim3)} style={styles.option}>
            <Text style={styles.optionText}>About</Text>
          </TouchableOpacity>
        </Animated.View>

      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  logoContainer: {
    marginBottom: 20, 
  },
  logoImage: {
    width: 200, 
    height: 200,
  },
  optionsContainer: {
    alignItems: 'center',
  },
  option: {
    padding: 15,
    backgroundColor: 'lightblue',
    marginVertical: 10,
    borderRadius: 10,
    width: 200,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
  },
});

export default AstrologyApp;
