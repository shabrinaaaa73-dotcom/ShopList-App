import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const formatPrice = (price) => {
  return 'Rp ' + price.toLocaleString('id-ID');
};

const renderStars = (rating) => {
  const full = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(i < full ? '★' : '☆');
  }
  return stars.join('');
};

const getBadgeStyle = (badge) => {
  switch (badge) {
    case 'Best Seller': return { bg: '#FF6B35', text: '#fff' };
    case 'Hot':         return { bg: '#FF3B5C', text: '#fff' };
    case 'New':         return { bg: '#00C49F', text: '#fff' };
    case 'Premium':     return { bg: '#7C5CBF', text: '#fff' };
    default:            return null;
  }
};

const ProductCard = ({ item, isGrid = false, onPress }) => {
  const badgeStyle = getBadgeStyle(item.badge);

  return (
    <TouchableOpacity
      style={[styles.card, isGrid && styles.cardGrid]}
      activeOpacity={0.82}
      onPress={() => onPress && onPress(item)}
    >
      {/* Badge */}
      {item.badge && badgeStyle && (
        <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
          <Text style={[styles.badgeText, { color: badgeStyle.text }]}>
            {item.badge}
          </Text>
        </View>
      )}

      {/* Image */}
      <View style={[styles.imageBox, isGrid && styles.imageBoxGrid]}>
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text
          style={[styles.name, isGrid && styles.nameGrid]}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        <View style={styles.categoryRow}>
          <Text style={styles.category}>{item.category}</Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.stars}>{renderStars(item.rating)}</Text>
          <Text style={styles.ratingNum}>{item.rating}</Text>
          <Text style={styles.sold}>· {item.sold.toLocaleString('id-ID')} terjual</Text>
        </View>

        <Text style={styles.price}>{formatPrice(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E2235',
    borderRadius: 16,
    marginBottom: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A3050',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  cardGrid: {
    flexDirection: 'column',
    flex: 1,
    margin: 5,
    padding: 12,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
    zIndex: 10,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  imageBox: {
    width: 72,
    height: 72,
    backgroundColor: '#252B45',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#353D60',
    overflow: 'hidden',
  },
  imageBoxGrid: {
    width: '100%',
    height: 110,
    marginRight: 0,
    marginBottom: 10,
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E8EAF6',
    lineHeight: 20,
    marginBottom: 4,
  },
  nameGrid: {
    fontSize: 13,
  },
  categoryRow: {
    marginBottom: 5,
  },
  category: {
    fontSize: 11,
    color: '#6C75A8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  stars: {
    fontSize: 11,
    color: '#FFD700',
    marginRight: 4,
  },
  ratingNum: {
    fontSize: 11,
    color: '#9BA3CC',
    fontWeight: '600',
    marginRight: 2,
  },
  sold: {
    fontSize: 10,
    color: '#5C6490',
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4FC3F7',
    letterSpacing: 0.3,
  },
});

export default ProductCard;