import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Typography, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import { mockOrders, mockTrackingEvents } from '../../data/mockData';
import TrackingCard from '../../components/tracking/TrackingCard';

interface TrackingScreenProps {
  navigation: any;
}

const TrackingScreen: React.FC<TrackingScreenProps> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(mockOrders[0]);
  const [hasSearched, setHasSearched] = useState(true);
  const [focused, setFocused] = useState(false);

  const handleSearch = () => {
    const found = mockOrders.find(
      (o) => o.trackingNumber.toLowerCase() === query.trim().toLowerCase()
    );
    if (found) {
      setTrackedOrder(found);
      setHasSearched(true);
    } else if (query.trim().length > 0) {
      setTrackedOrder(mockOrders[0]);
      setHasSearched(true);
    }
  };

  const handleQuickTrack = (trackingNumber: string) => {
    setQuery(trackingNumber);
    const found = mockOrders.find((o) => o.trackingNumber === trackingNumber);
    if (found) {
      setTrackedOrder(found);
      setHasSearched(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Rastrear Envío</Text>
            <Text style={styles.headerSubtitle}>Ingresa el número de seguimiento</Text>
          </View>

          {/* Search */}
          <View style={styles.searchWrapper}>
            <View style={[styles.searchContainer, focused && styles.searchFocused]}>
              <Ionicons
                name="search-outline"
                size={20}
                color={focused ? Colors.primary : Colors.textTertiary}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Ej: LX-2024-001234"
                placeholderTextColor={Colors.textTertiary}
                value={query}
                onChangeText={setQuery}
                autoCapitalize="characters"
                returnKeyType="search"
                onSubmitEditing={handleSearch}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={() => { setQuery(''); setHasSearched(false); }}>
                  <Ionicons name="close-circle" size={20} color={Colors.textTertiary} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[Colors.secondary, Colors.secondaryLight]}
                style={styles.searchButtonGradient}
              >
                <Ionicons name="search" size={22} color={Colors.textInverse} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Quick Access */}
          <View style={styles.quickAccessRow}>
            <Text style={styles.quickAccessLabel}>Acceso rápido:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickChips}>
              {mockOrders.slice(0, 3).map((order) => (
                <TouchableOpacity
                  key={order.id}
                  style={styles.quickChip}
                  onPress={() => handleQuickTrack(order.trackingNumber)}
                >
                  <Text style={styles.quickChipText}>{order.trackingNumber}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Results */}
      <ScrollView
        style={styles.results}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.resultsContent}
      >
        {hasSearched && trackedOrder ? (
          <>
            <TrackingCard order={trackedOrder} events={mockTrackingEvents} />

            {/* Map placeholder */}
            <View style={styles.mapCard}>
              <View style={styles.mapHeader}>
                <Ionicons name="map-outline" size={20} color={Colors.primary} />
                <Text style={styles.mapTitle}>Ubicación en Tiempo Real</Text>
              </View>
              <View style={styles.mapPlaceholder}>
                <LinearGradient
                  colors={['#EFF6FF', '#DBEAFE', '#BFDBFE']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.mapGradient}
                >
                  {/* Map grid lines */}
                  <View style={styles.mapGrid}>
                    {[0, 1, 2, 3].map((i) => (
                      <View key={i} style={styles.mapGridLine} />
                    ))}
                  </View>
                  <View style={styles.mapGridVertical}>
                    {[0, 1, 2, 3].map((i) => (
                      <View key={i} style={styles.mapGridLineV} />
                    ))}
                  </View>

                  {/* Route line */}
                  <View style={styles.mapRouteLine} />

                  {/* Origin marker */}
                  <View style={[styles.mapMarker, styles.mapMarkerOrigin]}>
                    <View style={styles.mapMarkerDot} />
                  </View>

                  {/* Vehicle */}
                  <View style={styles.mapVehicle}>
                    <View style={styles.mapVehicleBubble}>
                      <Text style={styles.mapVehicleEmoji}>🚚</Text>
                    </View>
                    <View style={styles.mapVehicleTail} />
                  </View>

                  {/* Destination marker */}
                  <View style={[styles.mapMarker, styles.mapMarkerDest]}>
                    <Ionicons name="location" size={28} color={Colors.error} />
                  </View>

                  {/* Map overlay info */}
                  <View style={styles.mapInfo}>
                    <Text style={styles.mapInfoText}>
                      📍 {trackedOrder.destination}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
              <View style={styles.mapFooter}>
                <Ionicons name="time-outline" size={14} color={Colors.textSecondary} />
                <Text style={styles.mapFooterText}>
                  Entrega estimada: {trackedOrder.estimatedDelivery}
                </Text>
              </View>
            </View>
          </>
        ) : (
          /* Empty State */
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <LinearGradient
                colors={[Colors.primaryFaded, Colors.backgroundDark]}
                style={styles.emptyIconBg}
              >
                <Text style={styles.emptyEmoji}>📦</Text>
              </LinearGradient>
            </View>
            <Text style={styles.emptyTitle}>Rastrea tu paquete</Text>
            <Text style={styles.emptySubtitle}>
              Ingresa el número de seguimiento para ver el estado y ubicación de tu envío en tiempo real.
            </Text>
            <View style={styles.emptyTips}>
              {[
                { icon: 'cube-outline' as const, text: 'Número de guía: LX-YYYY-XXXXXX' },
                { icon: 'mail-outline' as const, text: 'Lo encontrarás en tu correo de confirmación' },
                { icon: 'receipt-outline' as const, text: 'También en tu recibo de compra' },
              ].map((tip, i) => (
                <View key={i} style={styles.emptyTip}>
                  <View style={styles.emptyTipIcon}>
                    <Ionicons name={tip.icon} size={16} color={Colors.primary} />
                  </View>
                  <Text style={styles.emptyTipText}>{tip.text}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
        <View style={{ height: Spacing[8] }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingBottom: Spacing[6],
  },
  headerContent: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[4],
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  searchWrapper: {
    flexDirection: 'row',
    paddingHorizontal: Spacing[5],
    gap: Spacing[3],
    marginBottom: Spacing[3],
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing[4],
    height: 52,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  searchFocused: {
    borderColor: Colors.secondary,
  },
  searchIcon: {
    marginRight: Spacing[3],
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    height: '100%',
    fontWeight: Typography.fontWeight.medium,
  },
  searchButton: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.md,
  },
  searchButtonGradient: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAccessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing[5],
    gap: Spacing[3],
  },
  quickAccessLabel: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: Typography.fontWeight.medium,
    flexShrink: 0,
  },
  quickChips: {
    gap: Spacing[2],
  },
  quickChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing[3],
    paddingVertical: Spacing[1],
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  quickChipText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.medium,
  },
  results: {
    flex: 1,
  },
  resultsContent: {
    padding: Spacing[5],
    gap: Spacing[4],
  },
  mapCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    ...Shadows.md,
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    padding: Spacing[4],
    paddingBottom: Spacing[3],
  },
  mapTitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
  },
  mapPlaceholder: {
    height: 200,
    marginHorizontal: Spacing[4],
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  mapGradient: {
    flex: 1,
    position: 'relative',
  },
  mapGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-evenly',
  },
  mapGridLine: {
    height: 1,
    backgroundColor: 'rgba(59,130,246,0.15)',
  },
  mapGridVertical: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  mapGridLineV: {
    width: 1,
    backgroundColor: 'rgba(59,130,246,0.15)',
  },
  mapRouteLine: {
    position: 'absolute',
    top: '50%',
    left: '15%',
    right: '15%',
    height: 3,
    backgroundColor: Colors.primary,
    borderRadius: 2,
    opacity: 0.6,
  },
  mapMarker: {
    position: 'absolute',
    alignItems: 'center',
  },
  mapMarkerOrigin: {
    left: '12%',
    top: '40%',
  },
  mapMarkerDest: {
    right: '10%',
    top: '35%',
  },
  mapMarkerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.primary,
    borderWidth: 3,
    borderColor: Colors.card,
  },
  mapVehicle: {
    position: 'absolute',
    left: '45%',
    top: '30%',
    alignItems: 'center',
  },
  mapVehicleBubble: {
    backgroundColor: Colors.card,
    borderRadius: 20,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.md,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  mapVehicleEmoji: {
    fontSize: 22,
  },
  mapVehicleTail: {
    width: 2,
    height: 8,
    backgroundColor: Colors.primary,
  },
  mapInfo: {
    position: 'absolute',
    bottom: Spacing[3],
    left: Spacing[3],
    right: Spacing[3],
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: BorderRadius.lg,
    padding: Spacing[2],
    paddingHorizontal: Spacing[3],
  },
  mapInfoText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },
  mapFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    padding: Spacing[4],
    paddingTop: Spacing[3],
  },
  mapFooterText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: Spacing[10],
    paddingHorizontal: Spacing[4],
  },
  emptyIconContainer: {
    marginBottom: Spacing[5],
  },
  emptyIconBg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyEmoji: {
    fontSize: 56,
  },
  emptyTitle: {
    fontSize: Typography.fontSize['2xl'],
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.extrabold,
    marginBottom: Spacing[3],
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing[8],
  },
  emptyTips: {
    width: '100%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    gap: Spacing[3],
    ...Shadows.sm,
  },
  emptyTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  emptyTipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryFaded,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTipText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
});

export default TrackingScreen;
