import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';

const Paper = ({ children }: any) => {
  const insets = useSafeAreaInsets();
  const style = functionStyle(insets);
  return <View style={style.container}>{children}</View>;
};
const functionStyle = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      // borderWidth: 1,
      // borderColor: 'red',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
  });
export default Paper;