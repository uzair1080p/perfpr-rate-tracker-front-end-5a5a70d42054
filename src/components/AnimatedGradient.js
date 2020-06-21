import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated } from 'react-native';

class AnimatedGradient extends React.Component {
  render() {
    const { style, colors, opacity, children } = this.props;

    return (
      <LinearGradient
        style={[style, { opacity }]}
        colors={colors}
        locations={[0, 1]}
        start={[0.5, 1]}
        end={[0.5, 0]}
      >
        {children}
      </LinearGradient>
    );
  }
}

export default Animated.createAnimatedComponent(AnimatedGradient);