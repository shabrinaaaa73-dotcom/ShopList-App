import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  SectionList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import ProductDetailModal from '../components/ProductDetailModal';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

const SORT_OPTIONS = [
  { key: 'default',    label: 'Relevan' },
  { key: 'price_asc',  label: 'Termurah' },
  { key: 'price_desc', label: 'Termahal' },
  { key: 'rating',     label: '⭐ Rating' },
];

const HomeScreen = () => {
  const [searchQuery, setSearchQuery]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortKey, setSortKey]                   = useState('default');
  const [isGrid, setIsGrid]                     = useState(false);
  const [isSectionMode, setIsSectionMode]       = useState(false);
  const [refreshing, setRefreshing]             = useState(false);
  const [productList, setProductList]           = useState(products);
  const [selectedItem, setSelectedItem] = useState(null);
const [modalVisible, setModalVisible]  = useState(false);

const handleCardPress = (item) => {
  setSelectedItem(item);
  setModalVisible(true);
};

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Shuffle data seolah-olah refresh dari server
      const shuffled = [...products].sort(() => Math.random() - 0.5);
      setProductList(shuffled);
      setRefreshing(false);
    }, 1500);
  }, []);

  // Filter + sort logic
  const filteredProducts = useMemo(() => {
    let data = [...productList];

    // Filter kategori
    if (selectedCategory !== 'Semua') {
      data = data.filter((p) => p.category === selectedCategory);
    }

    // Search by name
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter((p) => p.name.toLowerCase().includes(q));
    }

    // Sort
    if (sortKey === 'price_asc')  data.sort((a, b) => a.price - b.price);
    if (sortKey === 'price_desc') data.sort((a, b) => b.price - a.price);
    if (sortKey === 'rating')     data.sort((a, b) => b.rating - a.rating);

    return data;
  }, [productList, searchQuery, selectedCategory, sortKey]);

  // Section data (grouped by category)
  const sectionData = useMemo(() => {
    const grouped = {};
    filteredProducts.forEach((p) => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });
    return Object.keys(grouped).map((key) => ({
      title: key,
      data: grouped[key],
    }));
  }, [filteredProducts]);

  // ---- Render helpers ----
 const renderItem = useCallback(
  ({ item }) => <ProductCard item={item} isGrid={isGrid} onPress={handleCardPress} />,
  [isGrid]
);

  const keyExtractor = useCallback((item) => item.id, []);

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🔭</Text>
      <Text style={styles.emptyTitle}>Produk Tidak Ditemukan</Text>
      <Text style={styles.emptyHint}>
        Coba kata kunci lain atau pilih kategori yang berbeda
      </Text>
      <TouchableOpacity
        style={styles.emptyBtn}
        onPress={() => {
          setSearchQuery('');
          setSelectedCategory('Semua');
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.emptyBtnText}>Reset Pencarian</Text>
      </TouchableOpacity>
    </View>
  );

  // Section list item (SectionList renders per-row, not 2-col)
  const renderSectionItem = ({ item }) => (
    <ProductCard item={item} isGrid={false} />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0D1128" />

      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>⚡ TechShop</Text>
          <Text style={styles.productCount}>
            {filteredProducts.length} produk ditemukan
          </Text>
        </View>
        <View style={styles.headerActions}>
          {/* Toggle Section Mode */}
          <TouchableOpacity
            style={[styles.iconBtn, isSectionMode && styles.iconBtnActive]}
            onPress={() => setIsSectionMode((v) => !v)}
            activeOpacity={0.8}
          >
            <Text style={styles.iconBtnText}>≡</Text>
          </TouchableOpacity>
          {/* Toggle Grid / List */}
          {!isSectionMode && (
            <TouchableOpacity
              style={[styles.iconBtn, isGrid && styles.iconBtnActive]}
              onPress={() => setIsGrid((v) => !v)}
              activeOpacity={0.8}
            >
              <Text style={styles.iconBtnText}>{isGrid ? '▤' : '⊞'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ===== SEARCH BAR ===== */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </View>

      {/* ===== CATEGORY FILTER ===== */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                selectedCategory === cat && styles.chipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.chipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== SORT BAR ===== */}
      <View style={styles.sortWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortScroll}
        >
          <Text style={styles.sortLabel}>Urutkan:</Text>
          {SORT_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.sortBtn,
                sortKey === opt.key && styles.sortBtnActive,
              ]}
              onPress={() => setSortKey(opt.key)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.sortBtnText,
                  sortKey === opt.key && styles.sortBtnTextActive,
                ]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ===== PRODUCT LIST ===== */}
      {isSectionMode ? (
        <SectionList
          sections={sectionData}
          keyExtractor={keyExtractor}
          renderItem={renderSectionItem}
          renderSectionHeader={renderSectionHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4FC3F7"
              colors={['#4FC3F7']}
            />
          }
        />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={isGrid ? 2 : 1}
          key={isGrid ? 'grid' : 'list'}
          contentContainerStyle={[
            styles.listContent,
            filteredProducts.length === 0 && styles.listContentEmpty,
          ]}
          columnWrapperStyle={isGrid ? styles.columnWrapper : null}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={ListEmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4FC3F7"
              colors={['#4FC3F7']}
            />
          }
        />
      )}
            <ProductDetailModal
        visible={modalVisible}
        item={selectedItem}
        onClose={() => setModalVisible(false)}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0D1128',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 10,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#4FC3F7',
    letterSpacing: -0.5,
  },
  productCount: {
    fontSize: 12,
    color: '#5C6490',
    marginTop: 2,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#1E2235',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A3050',
  },
  iconBtnActive: {
    backgroundColor: '#4FC3F7',
    borderColor: '#4FC3F7',
  },
  iconBtnText: {
    color: '#E8EAF6',
    fontSize: 18,
    fontWeight: '700',
  },

  // Search
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  // Category chips
  categoryWrapper: {
    marginBottom: 8,
  },
  categoryScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: '#1E2235',
    borderWidth: 1,
    borderColor: '#2A3050',
  },
  chipActive: {
    backgroundColor: '#4FC3F7',
    borderColor: '#4FC3F7',
  },
  chipText: {
    color: '#6C75A8',
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#0D1128',
    fontWeight: '800',
  },

  // Sort
  sortWrapper: {
    marginBottom: 12,
  },
  sortScroll: {
    paddingHorizontal: 16,
    gap: 6,
    alignItems: 'center',
  },
  sortLabel: {
    color: '#4A5280',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
  sortBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#1E2235',
    borderWidth: 1,
    borderColor: '#2A3050',
  },
  sortBtnActive: {
    backgroundColor: '#252B45',
    borderColor: '#4FC3F7',
  },
  sortBtnText: {
    color: '#5C6490',
    fontSize: 12,
    fontWeight: '600',
  },
  sortBtnTextActive: {
    color: '#4FC3F7',
    fontWeight: '700',
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },

  // Section
  sectionHeader: {
    backgroundColor: '#161A2E',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 4,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#4FC3F7',
    paddingLeft: 10,
    borderRadius: 4,
  },
  sectionHeaderText: {
    color: '#4FC3F7',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Empty State
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#E8EAF6',
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: '#5C6490',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyBtn: {
    backgroundColor: '#4FC3F7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  emptyBtnText: {
    color: '#0D1128',
    fontWeight: '800',
    fontSize: 14,
  },
});

export default HomeScreen;
