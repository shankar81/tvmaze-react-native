import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RatingBar from '../components/RatingBar';
import { defaultColors } from '../utils/colors';

interface ShowDetailProps {}

const ShowDetail: React.FC<ShowDetailProps> = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/img.jpg')} />
      </View>
      <View style={styles.content}>
        <View style={styles.iconPrimary}>
          <Icon name="play" size={40} color={defaultColors.white} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Stranger Things</Text>
          <RatingBar rating={4} stars={5} />
        </View>
        <Text style={styles.desc}>
          A love letter to the '80s classics that captivated a generation,{' '}
          Stranger Things is set in 1983 Indiana, where a young boy vanishes
          into thin air. As friends, family and local police search for answers,
          they are drawn into an extraordinary mystery involving top-secret
          government experiments, terrifying supernatural forces and one very
          strange little girl.
        </Text>
        <Text style={[styles.title, styles.titlePrimary]}>Cast</Text>
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
  titlePrimary: { marginTop: 20 },
});

export default ShowDetail;
