import React from 'react';
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
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Icon name="magnify" size={25} color={colors.text} />
      </View>
      <TextInput
        value={query}
        onChangeText={onChangeQuery}
        placeholder="Search shows"
        style={styles.input}
      />
      <View style={styles.tailIcon}>
        <BorderlessButton onPress={onClear}>
          <Icon name="close" size={25} color={colors.text} />
        </BorderlessButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 4,
  },
  input: {
    width: '100%',
    borderRadius: 4,
    paddingStart: 50,
  },
  icon: { position: 'absolute', zIndex: 2, left: 10 },
  tailIcon: {
    position: 'absolute',
    zIndex: 2,
    right: 10,
  },
});

export default Search;
