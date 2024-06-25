import React, { useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Defs, Mask, Rect } from 'react-native-svg';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');
const svgWidth = 338;
const svgHeight = 176;

const SvgWithBackgroundVideo = () => {
  const videoRef = useRef(null);
  const localVideo = require('../assets/thunder.mp4'); // Replace with your video path

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Svg width={svgWidth} height={svgHeight} style={styles.svg}>
          <Defs>
            <Mask id="mask" x="0" y="0" width={svgWidth} height={svgHeight}>
              <Rect width="100%" height="100%" fill="white" />
              <Path
                d="M0 66.8589C0 31.8917 0 14.4081 11.3894 5.39978C22.7788 -3.60857 39.7923 0.4183 73.8194 8.47204L304.134 62.9844C320.385 66.8307 328.51 68.7539 333.255 74.753C338 80.752 338 89.1018 338 105.801V132C338 152.742 338 163.113 331.556 169.556C325.113 176 314.742 176 294 176H44C23.2582 176 12.8873 176 6.44365 169.556C0 163.113 0 152.742 0 132V66.8589Z"
                fill="black"
              />
            </Mask>
          </Defs>
          <Rect width="100%" height="100%" fill="none" mask="url(#mask)" />
        </Svg>
        <Video
          source={localVideo} // replace with your video path
          style={styles.backgroundVideo}
          ref={videoRef}
          resizeMode="cover"
          repeat
          muted
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: svgWidth,
    height: svgHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    position: 'relative',
    width: svgWidth,
    height: svgHeight,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: svgWidth,
    height: svgHeight,
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: svgWidth,
    height: svgHeight,
    zIndex: 1,
  },
});

export default SvgWithBackgroundVideo;
