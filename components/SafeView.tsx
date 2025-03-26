import { Platform, StyleSheet, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '@/app/theme/theme';

interface SafeViewProps extends ViewProps {
  edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
}

export default function SafeView({ 
  children, 
  style, 
  edges = ['top', 'right', 'bottom', 'left'],
  ...props 
}: SafeViewProps) {
  return (
    <SafeAreaView
      edges={edges}
      style={[
        styles.container,
        typeof Platform !== 'undefined' && Platform.OS === 'android' && { paddingTop: SIZES.statusBarHeight },
        style
      ]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});