import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { defaultColors } from '../utils/colors';

interface RatingBarProps {
  rating: number;
  stars: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ stars, rating }) => {
  return (
    <View style={styles.container}>
      {Array(stars)
        .fill(0)
        .map((_, index) => {
          return (
            <Icon
              key={index}
              name={index < rating ? 'star' : 'star-outline'}
              color={defaultColors.primary}
              size={20}
            />
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
});

export default RatingBar;
