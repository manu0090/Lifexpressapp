import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Typography, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import { mockOrders, mockServices, mockUser, mockNotifications } from '../../data/mockData';
import OrderItem from '../../components/orders/OrderItem';

interface HomeScreenProps {
  navigation: any;
}

const QuickAction = ({
  emoji,
  label,
  color,
  bgColor,
  onPress,
}: {
  emoji: string;
  label: string;
  color: string;
  bgColor: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={[styles.quickAction, { backgroundColor: bgColor }]} onPress={onPress} activeOpacity={0.8}>
    <Text style={styles.quickActionEmoji}>{emoji}</Text>
    <Text style={[styles.quickActionLabel, { color }]}>{label}</Text>
  </TouchableOpacity>
);

const StatCard = ({
  icon,
  label,
  value,
  color,
  bgColor,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: number;
  color: string;
  bgColor: string;
}) => (
  <View style={[styles.statCard, { borderTopColor: color }]}>
    <View style={[styles.statIconBg, { backgroundColor: bgColor }]}>
      <Ionicons name={icon} size={20} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [trackingQuery, setTrackingQuery] = useState('');
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const activeOrders = mockOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
  const inTransitOrders = mockOrders.filter(o => o.status === 'in_transit');
  const deliveredOrders = mockOrders.filter(o => o.status === 'delivered');

  const handleSearch = () => {
    if (trackingQuery.trim()) {
      navigation.navigate('Rastrear');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <ScrollView
        style={styles.flex}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Gradient */}
        <LinearGradient
          colors={[Colors.primaryDark, Colors.primary, '#4F7FEB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerGradient}
        >
          <SafeAreaView edges={['top']}>
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />

            {/* Top bar */}
            <View style={styles.topBar}>
              <View style={styles.greetingSection}>
                <Text style={styles.greeting}>
                  ¡Hola, {mockUser.name.split(' ')[0]}! 👋
                </Text>
                <Text style={styles.greetingSubtitle}>
                  ¿Qué envías hoy?
                </Text>
              </View>
              <View style={styles.topBarRight}>
                <TouchableOpacity style={styles.notifButton} activeOpacity={0.8}>
                  <Ionicons name="notifications-outline" size={22} color={Colors.textInverse} />
                  {unreadCount > 0 && (
                    <View style={styles.notifBadge}>
                      <Text style={styles.notifBadgeText}>{unreadCount}</Text>
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.avatarButton}
                  onPress={() => navigation.navigate('Perfil')}
                >
                  <LinearGradient
                    colors={['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.2)']}
                    style={styles.avatar}
                  >
                    <Text style={styles.avatarText}>{mockUser.avatar}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={20} color={Colors.textTertiary} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Busca tu envío..."
                  placeholderTextColor={Colors.textTertiary}
                  value={trackingQuery}
                  onChangeText={setTrackingQuery}
                  returnKeyType="search"
                  onSubmitEditing={handleSearch}
                />
                {trackingQuery.length > 0 && (
                  <TouchableOpacity onPress={handleSearch} style={styles.searchAction}>
                    <LinearGradient
                      colors={[Colors.primary, Colors.primaryLight]}
                      style={styles.searchActionGradient}
                    >
                      <Ionicons name="arrow-forward" size={16} color={Colors.textInverse} />
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <StatCard
            icon="cube-outline"
            label="Activos"
            value={activeOrders.length}
            color={Colors.primary}
            bgColor={Colors.primaryFaded}
          />
          <StatCard
            icon="car-outline"
            label="En Tránsito"
            value={inTransitOrders.length}
            color={Colors.warning}
            bgColor={Colors.warningLight}
          />
          <StatCard
            icon="checkmark-circle-outline"
            label="Entregados"
            value={deliveredOrders.length}
            color={Colors.success}
            bgColor={Colors.successLight}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            <QuickAction
              emoji="📦"
              label="Rastrear Envío"
              color={Colors.primary}
              bgColor={Colors.primaryFaded}
              onPress={() => navigation.navigate('Rastrear')}
            />
            <QuickAction
              emoji="🚀"
              label="Nuevo Envío"
              color={Colors.secondary}
              bgColor={Colors.secondaryFaded}
              onPress={() => navigation.navigate('Servicios')}
            />
            <QuickAction
              emoji="📋"
              label="Mis Pedidos"
              color={Colors.purple}
              bgColor={Colors.purpleLight}
              onPress={() => navigation.navigate('Pedidos')}
            />
            <QuickAction
              emoji="💬"
              label="Soporte"
              color={Colors.success}
              bgColor={Colors.successLight}
              onPress={() => {}}
            />
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pedidos Recientes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Pedidos')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          {mockOrders.slice(0, 3).map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onPress={() => navigation.navigate('Rastrear')}
            />
          ))}
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nuestros Servicios</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Servicios')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesScroll}
          >
            {mockServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('Servicios')}
              >
                <LinearGradient
                  colors={service.gradient as any}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.serviceCard}
                >
                  <Text style={styles.serviceEmoji}>{service.icon}</Text>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceShortDesc}>{service.shortDesc}</Text>
                  <View style={styles.servicePriceBadge}>
                    <Text style={styles.servicePrice}>{service.price}</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Promo Banner */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#0F172A', '#1E293B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.promoBanner}
          >
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>🎉 ¡Oferta especial!</Text>
              <Text style={styles.promoSubtitle}>
                20% de descuento en envíos internacionales este fin de semana
              </Text>
              <TouchableOpacity
                style={styles.promoButton}
                onPress={() => navigation.navigate('Servicios')}
              >
                <Text style={styles.promoButtonText}>Aprovechar oferta</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.promoDecor}>✈️</Text>
          </LinearGradient>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    paddingBottom: Spacing[8],
    overflow: 'hidden',
  },
  decorCircle1: {
    position: 'absolute',
    top: -80,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -40,
    left: -60,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[5],
  },
  greetingSection: {
    flex: 1,
  },
  greeting: {
    fontSize: Typography.fontSize['2xl'],
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
  },
  greetingSubtitle: {
    fontSize: Typography.fontSize.base,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
    fontWeight: Typography.fontWeight.medium,
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  notifButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.error,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  notifBadgeText: {
    color: Colors.textInverse,
    fontSize: 8,
    fontWeight: Typography.fontWeight.bold,
  },
  avatarButton: {},
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: {
    color: Colors.textInverse,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  searchContainer: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[2],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing[4],
    height: 52,
    ...Shadows.lg,
  },
  searchIcon: {
    marginRight: Spacing[3],
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    height: '100%',
  },
  searchAction: {
    marginLeft: Spacing[2],
  },
  searchActionGradient: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing[3],
    paddingHorizontal: Spacing[5],
    marginTop: -Spacing[4],
    zIndex: 1,
    marginBottom: Spacing[2],
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    alignItems: 'center',
    gap: Spacing[1],
    borderTopWidth: 3,
    ...Shadows.md,
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[1],
  },
  statValue: {
    fontSize: Typography.fontSize['2xl'],
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.extrabold,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Spacing[5],
    marginTop: Spacing[6],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing[4],
  },
  sectionTitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[4],
  },
  seeAllText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.semibold,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[3],
  },
  quickAction: {
    width: '47%',
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    alignItems: 'center',
    gap: Spacing[2],
    ...Shadows.sm,
  },
  quickActionEmoji: {
    fontSize: 32,
  },
  quickActionLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
  },
  servicesScroll: {
    gap: Spacing[3],
    paddingRight: Spacing[5],
  },
  serviceCard: {
    width: 150,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    gap: Spacing[2],
  },
  serviceEmoji: {
    fontSize: 30,
  },
  serviceName: {
    fontSize: Typography.fontSize.base,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.bold,
  },
  serviceShortDesc: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: Typography.fontWeight.medium,
  },
  servicePriceBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing[2],
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: Spacing[2],
  },
  servicePrice: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.bold,
  },
  promoBanner: {
    borderRadius: BorderRadius['2xl'],
    padding: Spacing[5],
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  promoContent: {
    flex: 1,
    gap: Spacing[2],
  },
  promoTitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
  },
  promoSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 18,
  },
  promoButton: {
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    alignSelf: 'flex-start',
    marginTop: Spacing[2],
  },
  promoButtonText: {
    color: Colors.textInverse,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  promoDecor: {
    fontSize: 48,
    marginLeft: Spacing[3],
  },
  bottomSpacing: {
    height: Spacing[8],
  },
});

export default HomeScreen;
