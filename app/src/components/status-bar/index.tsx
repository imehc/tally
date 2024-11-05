import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  StatusBarProps,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * @link https://stackoverflow.com/questions/39297291/how-to-set-ios-status-bar-background-color-in-react-native
 */
export const TallyStatusBar: React.FC<StatusBarProps> = ({
  backgroundColor,
  ...props
}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <LinearGradient
      colors={['#2b2b2b', 'transparent']}
      // 通过透明度观察状态栏变化
      className="opacity-0"
      style={[StyleSheet.absoluteFillObject]}>
      <SafeAreaView>
        <StatusBar
          animated
          translucent
          backgroundColor="transparent"
          // backgroundColor={backgroundColor}
          {...props}
        />
      </SafeAreaView>
    </LinearGradient>
  </View>
);

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#79B45D',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});
