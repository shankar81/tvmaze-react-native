import { RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppStackParamList } from '../../App';
import RatingBar from '../components/RatingBar';
import GlobalContext from '../context/GlobalContext';
import { Colors, defaultColors } from '../utils/colors';
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
  const { colors } = useContext(GlobalContext);

  const [details, setDetails] = useState<any | null>(null);
  const [casts, setCasts] = useState<any[]>([]);

  // Memonizing styles so it will only be recalculated if colors changes
  const dynamicStyles = useMemo(() => styles(colors), [colors]);

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
      <View style={dynamicStyles.castItem}>
        <Image
          source={{ uri: item?.person?.image?.medium }}
          resizeMethod="scale"
          resizeMode="cover"
          style={dynamicStyles.image}
        />
      </View>
    );
  }

  function goBack() {
    navigation.goBack();
  }

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.imageContainer}>
        <Image
          resizeMethod="scale"
          resizeMode="cover"
          style={dynamicStyles.image}
          source={{ uri: details?.image?.medium }}
        />
        <View style={dynamicStyles.backButtonContainer}>
          <TouchableOpacity onPress={goBack} style={dynamicStyles.backButton}>
            <Icon name="chevron-left" size={30} color={defaultColors.white} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={dynamicStyles.content}>
        <View style={dynamicStyles.iconPrimary}>
          <Icon name="play" size={40} color={defaultColors.white} />
        </View>
        <View style={dynamicStyles.titleContainer}>
          <Text style={dynamicStyles.title}>{details?.name}</Text>
          <RatingBar
            rating={parseInt(details?.rating?.average, 10)}
            stars={5}
          />
        </View>
        <Text
          numberOfLines={casts.length > 0 ? 5 : 20}
          style={dynamicStyles.desc}>
          {/* The replace method replaces all html tags in summary with empty string */}
          {details?.summary?.replace(/(<([^>]+)>)/gi, '')}
        </Text>
        {casts.length > 0 && (
          <>
            <Text style={[dynamicStyles.title, dynamicStyles.titleWithSpacing]}>
              Cast
            </Text>
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

const styles = (colors: Colors) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.white },
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
      backgroundColor: colors.white,
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
      color: colors.black,
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
