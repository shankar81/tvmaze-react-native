import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppStackParamList } from '../../App';
import RatingBar from '../components/RatingBar';
import { defaultColors } from '../utils/colors';
import { BASE_URL } from './../utils/constants';

type ShowDetailRouteProp = RouteProp<AppStackParamList, 'ShowDetails'>;

type ShowDetailNavigationProps = StackNavigationProp<
  AppStackParamList,
  'ShowDetails'
>;

type ShowDetailProps = {
  route: ShowDetailRouteProp;
  navigation: ShowDetailNavigationProps;
};

const ShowDetail: React.FC<ShowDetailProps> = ({ route, navigation }) => {
  const [details, setDetails] = useState<any | null>(null);
  const [casts, setCasts] = useState<any[]>([]);

  useEffect(() => {
    // Fetching show details
    fetch(`${BASE_URL}/shows/${route.params.id}`)
      .then(res => res.json())
      .then(response => {
        setDetails(response);
      });

    // Fetching cast
    fetch(`${BASE_URL}/shows/${route.params.id}/cast`)
      .then(res => res.json())
      .then(response => {
        setCasts(response);
      });
  }, [route.params.id]);

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

  function goBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMethod="scale"
          resizeMode="cover"
          style={styles.image}
          source={{ uri: details?.image?.medium }}
        />
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={goBack} style={styles.backButton}>
            <Icon name="chevron-left" size={30} color={defaultColors.white} />
          </TouchableOpacity>
        </View>
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
        <Text numberOfLines={casts.length > 0 ? 5 : 20} style={styles.desc}>
          {/* The replace method replaces all html tags in summary with empty string */}
          {details?.summary?.replace(/(<([^>]+)>)/gi, '')}
        </Text>
        {casts.length > 0 && (
          <>
            <Text style={[styles.title, styles.titleWithSpacing]}>Cast</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={casts}
              renderItem={_renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  imageContainer: {
    position: 'relative',
    height: '45%',
    width: '100%',
  },
  image: { height: '100%', width: '100%' },
  backButtonContainer: {
    position: 'absolute',
    top: 50,
    left: 15,
  },
  backButton: {
    backgroundColor: 'rgba(0, 0,0, 0.2)',
    borderRadius: 100,
    padding: 8,
  },
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
