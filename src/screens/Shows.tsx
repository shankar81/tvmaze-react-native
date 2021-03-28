import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { BorderlessButton, FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { AppStackParamList } from '../../App';
import Search from '../components/Search';
import { Colors } from '../utils/colors';
import GlobalContext from './../context/GlobalContext';
import { BASE_URL } from './../utils/constants';
import { debounce, parseDate } from './../utils/heloper';

type ShowsNavigationProps = StackNavigationProp<AppStackParamList, 'Shows'>;

type ShowsProps = {
  navigation: ShowsNavigationProps;
};

const Shows: React.FC<ShowsProps> = ({ navigation }) => {
  const { colors, isDarkMode, changeTheme } = useContext(GlobalContext);

  const [query, setQuery] = useState<string>('');
  const [shows, setShows] = useState<Array<any>>();

  // Memonizing styles so it will only be recalculated if colors changes
  const dynamicStyles = useMemo(() => styles(colors), [colors]);

  useEffect(() => {
    loadScheduledShows();
  }, []);

  function loadScheduledShows() {
    // Fetching data from API
    fetch(`${BASE_URL}/schedule?country=US&date=${parseDate(new Date())}`)
      .then(res => res.json())
      .then(response => setShows(response));
  }

  function searchShows(text: string) {
    // Searching shows as user types
    fetch(`${BASE_URL}/search/shows?q=${text}`)
      .then(res => res.json())
      .then(response => setShows(response));
  }

  function navigateToDetail(id: number) {
    navigation.navigate('ShowDetails', { id });
  }

  console.log(colors);
  // Single item in list
  function _renderItem({ item }: { item: any }) {
    return (
      <TouchableNativeFeedback onPress={() => navigateToDetail(item?.show?.id)}>
        <View style={dynamicStyles.item}>
          <Image
            style={dynamicStyles.itemImage}
            source={{ uri: item?.show?.image?.medium }}
            resizeMethod="scale"
            resizeMode="cover"
          />
        </View>
      </TouchableNativeFeedback>
    );
  }

  function onChangeQuery(text: string) {
    setQuery(text);

    if (text.length > 0) {
      // 0.4 Seconds Delay in API call while user types
      debounce(() => searchShows(text), 400);
    } else {
      loadScheduledShows();
    }
  }

  function onClear() {
    if (query.length !== 0) {
      onChangeQuery('');
    }
  }

  return (
    <View style={dynamicStyles.container}>
      <BorderlessButton onPress={changeTheme} style={dynamicStyles.theme}>
        <Icon
          size={25}
          color={colors.text}
          name={isDarkMode ? 'sun' : 'moon'}
        />
      </BorderlessButton>
      <View style={dynamicStyles.inputContainer}>
        <Search
          onClear={onClear}
          query={query}
          onChangeQuery={onChangeQuery}
          colors={colors}
        />
      </View>
      <FlatList
        keyboardShouldPersistTaps="always"
        style={dynamicStyles.flatlist}
        contentContainerStyle={dynamicStyles.flatlistContainerStyle}
        data={shows}
        keyExtractor={(_, index) => index.toString()}
        renderItem={_renderItem}
        numColumns={3}
      />
    </View>
  );
};

const styles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: 30,
    },
    flatlist: { width: '100%' },
    flatlistContainerStyle: { padding: 15 },
    item: {
      height: 200,
      width: '32%',
      marginBottom: 15,
      marginRight: 8,
      elevation: 4,
      backgroundColor: colors.white,
    },
    itemImage: { height: '100%', width: '100%', borderRadius: 4 },
    inputContainer: { padding: 15 },
    theme: {
      alignSelf: 'flex-end',
      marginRight: 5,
      marginTop: 15,
      padding: 10,
    },
  });

export default Shows;
