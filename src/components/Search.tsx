import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BorderlessButton, TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../utils/colors';

interface SearchProps {
  colors: Colors;
  query: string;
  onChangeQuery: (text: string) => void;
  onClear: () => void;
}

const Search: React.FC<SearchProps> = ({
  colors,
  query,
  onChangeQuery,
  onClear,
}) => {
  // Memonizing styles so it will only be recalculated if colors changes
  const dynamicStyles = useMemo(() => styles(colors), [colors]);

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.icon}>
        <Icon name="magnify" size={25} color={colors.black} />
      </View>
      <TextInput
        value={query}
        onChangeText={onChangeQuery}
        placeholderTextColor={colors.black}
        placeholder="Search shows"
        style={dynamicStyles.input}
      />
      <View style={dynamicStyles.tailIcon}>
        <BorderlessButton onPress={onClear}>
          <Icon name="close" size={25} color={colors.black} />
        </BorderlessButton>
      </View>
    </View>
  );
};

const styles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      position: 'relative',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
      elevation: 8,
    },
    input: {
      width: '100%',
      borderRadius: 4,
      paddingStart: 50,
      color: colors.black,
    },
    icon: { position: 'absolute', zIndex: 2, left: 10 },
    tailIcon: {
      position: 'absolute',
      zIndex: 2,
      right: 10,
    },
  });

export default Search;
