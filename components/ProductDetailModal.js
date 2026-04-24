import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

const formatPrice = (price) => 'Rp ' + price.toLocaleString('id-ID');

const renderStars = (rating) => {
  const full = Math.floor(rating);
  return Array.from({ length: 5 }, (_, i) => (i < full ? '★' : '☆')).join('');
};

const getStockInfo = (stock) => {
  if (stock === 0)  return { label: 'Habis',         color: '#FF3B5C' };
  if (stock <= 5)   return { label: `Sisa ${stock}`, color: '#FF6B35' };
  if (stock <= 20)  return { label: `Sisa ${stock}`, color: '#FFD700' };
  return              { label: `Stok ${stock}`,       color: '#00C49F' };
};

const ProductDetailModal = ({ visible, item, onClose }) => {
  if (!item) return null;

  const stockInfo = getStockInfo(item.stock);

  const handleAddToCart = () => {
    Alert.alert('🛒 Berhasil!', `${item.name} ditambahkan ke keranjang.`, [
      { text: 'OK' },
    ]);
  };

  const handleBuyNow = () => {
    Alert.alert('⚡ Beli Sekarang', `Lanjut ke checkout untuk ${item.name}?`, [
      { text: 'Batal', style: 'cancel' },
      { text: 'Lanjut', onPress: () => Alert.alert('✅', 'Fitur checkout segera hadir!') },
    ]);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>

          {/* Handle bar */}
          <View style={styles.handleBar} />

          {/* Close button */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>

            {/* Product Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
                resizeMode="cover"
              />
              {/* Badge overlay */}
              {item.badge && (
                <View style={styles.imageBadge}>
                  <Text style={styles.imageBadgeText}>{item.badge}</Text>
                </View>
              )}
            </View>

            {/* Content */}
            <View style={styles.content}>

              {/* Category */}
              <Text style={styles.category}>{item.category}</Text>

              {/* Name */}
              <Text style={styles.name}>{item.name}</Text>

              {/* Rating + Sold */}
              <View style={styles.ratingRow}>
                <Text style={styles.stars}>{renderStars(item.rating)}</Text>
                <Text style={styles.ratingNum}>{item.rating}</Text>
                <Text style={styles.dot}> · </Text>
                <Text style={styles.sold}>{item.sold.toLocaleString('id-ID')} terjual</Text>
              </View>

              {/* Price */}
              <Text style={styles.price}>{formatPrice(item.price)}</Text>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Stock info */}
              <View style={styles.stockRow}>
                <Text style={styles.stockLabel}>Ketersediaan Stok</Text>
                <View style={[styles.stockBadge, { borderColor: stockInfo.color }]}>
                  <View style={[styles.stockDot, { backgroundColor: stockInfo.color }]} />
                  <Text style={[styles.stockValue, { color: stockInfo.color }]}>
                    {stockInfo.label}
                  </Text>
                </View>
              </View>

              {/* Stock bar */}
              <View style={styles.stockBarBg}>
                <View
                  style={[
                    styles.stockBarFill,
                    {
                      width: `${Math.min((item.stock / 100) * 100, 100)}%`,
                      backgroundColor: stockInfo.color,
                    },
                  ]}
                />
              </View>

              <View style={styles.divider} />

              {/* Info rows */}
              <View style={styles.infoGrid}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoIcon}>⭐</Text>
                  <Text style={styles.infoValue}>{item.rating} / 5.0</Text>
                  <Text style={styles.infoKey}>Rating</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoIcon}>📦</Text>
                  <Text style={styles.infoValue}>{item.sold.toLocaleString('id-ID')}</Text>
                  <Text style={styles.infoKey}>Terjual</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoIcon}>🏷️</Text>
                  <Text style={styles.infoValue}>{item.stock}</Text>
                  <Text style={styles.infoKey}>Stok</Text>
                </View>
              </View>

            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actionBar}>
            <TouchableOpacity
              style={styles.cartBtn}
              onPress={handleAddToCart}
              activeOpacity={0.85}
              disabled={item.stock === 0}
            >
              <Text style={styles.cartBtnText}>🛒  Keranjang</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buyBtn, item.stock === 0 && styles.btnDisabled]}
              onPress={handleBuyNow}
              activeOpacity={0.85}
              disabled={item.stock === 0}
            >
              <Text style={styles.buyBtnText}>
                {item.stock === 0 ? 'Stok Habis' : '⚡  Beli Sekarang'}
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0D1128',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '90%',
    paddingBottom: 34,
    borderTopWidth: 1,
    borderColor: '#2A3050',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#2A3050',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 18,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E2235',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#2A3050',
  },
  closeBtnText: {
    color: '#9BA3CC',
    fontSize: 13,
    fontWeight: '700',
  },

  // Image
  imageContainer: {
    width: '100%',
    height: 240,
    backgroundColor: '#1E2235',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute',
    bottom: 12,
    left: 16,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  imageBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Content
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  category: {
    fontSize: 11,
    color: '#4FC3F7',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: '900',
    color: '#E8EAF6',
    lineHeight: 30,
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stars: {
    fontSize: 14,
    color: '#FFD700',
    marginRight: 5,
  },
  ratingNum: {
    fontSize: 13,
    color: '#9BA3CC',
    fontWeight: '700',
  },
  dot: {
    color: '#3A4060',
    fontSize: 13,
  },
  sold: {
    fontSize: 12,
    color: '#5C6490',
  },
  price: {
    fontSize: 26,
    fontWeight: '900',
    color: '#4FC3F7',
    letterSpacing: 0.3,
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#1E2235',
    marginVertical: 16,
  },

  // Stock
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  stockLabel: {
    color: '#9BA3CC',
    fontSize: 13,
    fontWeight: '600',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    gap: 5,
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  stockValue: {
    fontSize: 12,
    fontWeight: '700',
  },
  stockBarBg: {
    height: 6,
    backgroundColor: '#1E2235',
    borderRadius: 3,
    overflow: 'hidden',
  },
  stockBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Info grid
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
    gap: 4,
  },
  infoIcon: {
    fontSize: 22,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#E8EAF6',
  },
  infoKey: {
    fontSize: 11,
    color: '#5C6490',
    fontWeight: '500',
  },

  // Action buttons
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 12,
    borderTopWidth: 1,
    borderColor: '#1E2235',
  },
  cartBtn: {
    flex: 1,
    backgroundColor: '#1E2235',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#4FC3F7',
  },
  cartBtnText: {
    color: '#4FC3F7',
    fontWeight: '800',
    fontSize: 14,
  },
  buyBtn: {
    flex: 1.5,
    backgroundColor: '#4FC3F7',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  buyBtnText: {
    color: '#0D1128',
    fontWeight: '900',
    fontSize: 14,
  },
  btnDisabled: {
    backgroundColor: '#2A3050',
  },
});

export default ProductDetailModal;