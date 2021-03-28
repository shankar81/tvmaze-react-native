import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingBar from '../components/RatingBar';
import { defaultColors } from '../utils/colors';
import { BASE_URL } from './../utils/constants';

interface ShowDetailProps {}

const ShowDetail: React.FC<ShowDetailProps> = () => {
  const [details, setDetails] = useState<any | null>(null);
  const [casts, setCasts] = useState<any[]>([]);

  useEffect(() => {
    // Fetching show details
    fetch(`${BASE_URL}/shows/1`)
      .then(res => res.json())
      .then(response => {
        setDetails(response);
      });

    // Fetching cast
    fetch(`${BASE_URL}/shows/1/cast`)
      .then(res => res.json())
      .then(response => {
        setCasts(response);
      });
  }, []);

  function _renderItem({ item }: { item: any }) {
    return (
      <View style={styles.castItem}>
        <Image
          source={{ uri: item?.person?.image?.medium }}
          resizeMethod="scale"
          resizeMode="cover"
          style={styles.image}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.imageContainer}>
        <Image
          resizeMethod="scale"
          resizeMode="cover"
          style={styles.image}
          source={{ uri: details?.image?.medium }}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.iconPrimary}>
          <Icon name="play" size={40} color={defaultColors.white} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{details?.name}</Text>
          <RatingBar
            rating={parseInt(details?.rating?.average, 10)}
            stars={5}
          />
        </View>
        <Text style={styles.desc}>
          {/* The replace method replaces all html tags in summary with empty string */}
          {details?.summary?.replace(/(<([^>]+)>)/gi, '')}
        </Text>
        <Text style={[styles.title, styles.titleWithSpacing]}>Cast</Text>
        <FlatList
          horizontal
          data={casts}
          renderItem={_renderItem}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  imageContainer: {
    height: '45%',
    width: '100%',
  },
  image: { height: '100%', width: '100%' },
  content: {
    backgroundColor: 'white',
    elevation: 8,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: -20,
    flex: 1,
    position: 'relative',
    padding: 15,
  },
  iconPrimary: {
    backgroundColor: defaultColors.primary,
    position: 'absolute',
    top: -30,
    right: 30,
    padding: 8,
    borderRadius: 100,
  },
  titleContainer: {
    marginBottom: 10,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  desc: { fontSize: 16, color: '#555', textAlign: 'left' },
  titleWithSpacing: { marginTop: 20, marginBottom: 10 },
  castItem: {
    height: 200,
    width: 150,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 15,
  },
});

export default ShowDetail;
