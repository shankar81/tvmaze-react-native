import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Search from '../components/Search';
import { Colors } from '../utils/colors';
import GlobalContext from './../context/GlobalContext';
import { BASE_URL } from './../utils/constants';
import { debounce } from './../utils/heloper';

interface ShowsProps {}

const Shows: React.FC<ShowsProps> = () => {
  const { colors } = useContext(GlobalContext);

  const [query, setQuery] = useState<string>('');
  const [shows, setShows] = useState<Array<any>>();

  useEffect(() => {
    loadScheduledShows();
  }, []);

  function loadScheduledShows() {
    // Fetching data from API
    fetch(`${BASE_URL}/schedule?country=US&date=2021-03-20`)
      .then(res => res.json())
      .then(response => setShows(response));
  }

  function searchShows(text: string) {
    // Searching shows as user types
    fetch(`${BASE_URL}/search/shows?q=${text}`)
      .then(res => res.json())
      .then(response => setShows(response));
  }

  // Memonizing the function call
  const dynamicStyles = useMemo(() => styles(colors), [colors]);

  // Single item in list
  function _renderItem({ item }: { item: any }) {
    return (
      <TouchableNativeFeedback>
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
      <View style={dynamicStyles.inputContainer}>
        <Search
          onClear={onClear}
          query={query}
          onChangeQuery={onChangeQuery}
          colors={colors}
        />
      </View>
      <FlatList
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
    container: { flex: 1, backgroundColor: colors.white },
    flatlist: { width: '100%' },
    flatlistContainerStyle: { padding: 15 },
    item: {
      height: 200,
      width: '32%',
      marginBottom: 15,
      marginRight: 8,
      elevation: 4,
      backgroundColor: 'white',
    },
    itemImage: { height: '100%', width: '100%', borderRadius: 4 },
    inputContainer: { padding: 15 },
  });

export default Shows;
