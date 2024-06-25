import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

export default function Sungraph() {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const pathRef = useRef(null);

  const progress = useSharedValue(0);
  const [pathLength, setPathLength] = useState(0);
  const ref: any = useRef<typeof AnimatedPath>(null);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 8000,
      easing: Easing.linear,
    });
  }, [progress]);

  const animatedCircleProps = useAnimatedProps(() => {
    const lengthProgress = interpolate(progress.value, [0, 1], [0, pathLength]);
    const point = ref.current ? ref.current.getPointAtLength(lengthProgress) : { x: 0, y: 0 };
    return {
      cx: point.x,
      cy: point.y,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width="451" height="437">
        <AnimatedPath
          onLayout={() => setPathLength(ref.current.getTotalLength())}
          ref={ref}
          d="M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5"
          fill="transparent"
          strokeWidth="5"
          stroke="blue"
          strokeLinecap="round"
        />
        <AnimatedCircle r="5" fill="red" animatedProps={animatedCircleProps} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
