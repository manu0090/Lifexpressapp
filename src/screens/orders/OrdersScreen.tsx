import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Typography, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import { mockOrders, Order, OrderStatus, getStatusLabel, getStatusColor, getStatusBgColor } from '../../data/mockData';
import OrderItem from '../../components/orders/OrderItem';
import Badge from '../../components/common/Badge';

type FilterTab = 'all' | 'active' | 'in_transit' | 'delivered';

interface OrdersScreenProps {
  navigation: any;
}

const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filters: { key: FilterTab; label: string; count: number }[] = [
    { key: 'all', label: 'Todos', count: mockOrders.length },
    {
      key: 'active',
      label: 'Activos',
      count: mockOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length,
    },
    {
      key: 'in_transit',
      label: 'En Tránsito',
      count: mockOrders.filter(o => o.status === 'in_transit').length,
    },
    {
      key: 'delivered',
      label: 'Entregados',
      count: mockOrders.filter(o => o.status === 'delivered').length,
    },
  ];

  const getFilteredOrders = (): Order[] => {
    switch (activeFilter) {
      case 'active':
        return mockOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled');
      case 'in_transit':
        return mockOrders.filter(o => o.status === 'in_transit');
      case 'delivered':
        return mockOrders.filter(o => o.status === 'delivered');
      default:
        return mockOrders;
    }
  };

  const filteredOrders = getFilteredOrders();

  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      {/* Header */}
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Mis Pedidos</Text>
            <Text style={styles.headerSubtitle}>
              {mockOrders.length} pedidos en total
            </Text>
          </View>

          {/* Filter Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  activeFilter === filter.key && styles.filterTabActive,
                ]}
                onPress={() => setActiveFilter(filter.key)}
              >
                <Text
                  style={[
                    styles.filterTabText,
                    activeFilter === filter.key && styles.filterTabTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
                <View
                  style={[
                    styles.filterCount,
                    activeFilter === filter.key && styles.filterCountActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterCountText,
                      activeFilter === filter.key && styles.filterCountTextActive,
                    ]}
                  >
                    {filter.count}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>

      {/* Orders List */}
      <ScrollView
        style={styles.ordersList}
        contentContainerStyle={styles.ordersContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderItem
              key={order.id}
              order={order}
              onPress={() => handleOrderPress(order)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>Sin pedidos</Text>
            <Text style={styles.emptySubtitle}>
              No tienes pedidos en esta categoría
            </Text>
            <TouchableOpacity
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Servicios')}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.emptyButtonGradient}
              >
                <Text style={styles.emptyButtonText}>Crear nuevo envío</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ height: Spacing[8] }} />
      </ScrollView>

      {/* Order Detail Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)} />
          {selectedOrder && (
            <View style={styles.modalSheet}>
              {/* Handle */}
              <View style={styles.modalHandle} />

              {/* Header */}
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalOrderId}>{selectedOrder.id}</Text>
                  <Text style={styles.modalTrackingNumber}>{selectedOrder.trackingNumber}</Text>
                </View>
                <Badge status={selectedOrder.status} size="lg" />
              </View>

              {/* Details */}
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* Route */}
                <View style={styles.modalRouteCard}>
                  <View style={styles.modalRouteItem}>
                    <View style={[styles.routeDot, { backgroundColor: Colors.primary }]} />
                    <View>
                      <Text style={styles.routeLabel}>Origen</Text>
                      <Text style={styles.routeValue}>{selectedOrder.origin}</Text>
                      <Text style={styles.routeSender}>{selectedOrder.sender}</Text>
                    </View>
                  </View>
                  <View style={styles.routeConnector}>
                    <View style={styles.routeConnectorLine} />
                    <Ionicons name="chevron-down" size={16} color={Colors.textTertiary} />
                  </View>
                  <View style={styles.modalRouteItem}>
                    <View style={[styles.routeDot, { backgroundColor: Colors.success }]} />
                    <View>
                      <Text style={styles.routeLabel}>Destino</Text>
                      <Text style={styles.routeValue}>{selectedOrder.destination}</Text>
                      <Text style={styles.routeSender}>{selectedOrder.receiver}</Text>
                    </View>
                  </View>
                </View>

                {/* Info Grid */}
                <View style={styles.modalInfoGrid}>
                  {[
                    { label: 'Servicio', value: selectedOrder.serviceType, icon: 'cube-outline' as const },
                    { label: 'Peso', value: selectedOrder.weight, icon: 'scale-outline' as const },
                    { label: 'Fecha', value: selectedOrder.date, icon: 'calendar-outline' as const },
                    { label: 'Entrega Est.', value: selectedOrder.estimatedDelivery, icon: 'time-outline' as const },
                    { label: 'Descripción', value: selectedOrder.description, icon: 'document-text-outline' as const },
                    { label: 'Precio', value: `$${selectedOrder.price.toFixed(2)}`, icon: 'card-outline' as const },
                  ].map((info, i) => (
                    <View key={i} style={styles.modalInfoItem}>
                      <View style={styles.modalInfoIcon}>
                        <Ionicons name={info.icon} size={16} color={Colors.primary} />
                      </View>
                      <View>
                        <Text style={styles.modalInfoLabel}>{info.label}</Text>
                        <Text style={styles.modalInfoValue}>{info.value}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Actions */}
                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalActionPrimary}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('Rastrear');
                    }}
                  >
                    <LinearGradient
                      colors={[Colors.primary, Colors.primaryLight]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.modalActionGradient}
                    >
                      <Ionicons name="location-outline" size={18} color={Colors.textInverse} />
                      <Text style={styles.modalActionPrimaryText}>Rastrear Envío</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalActionSecondary}
                    onPress={() => setModalVisible(false)}
                  >
                    <Ionicons name="share-outline" size={18} color={Colors.primary} />
                    <Text style={styles.modalActionSecondaryText}>Compartir</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ height: Spacing[6] }} />
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingBottom: Spacing[4],
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
  filtersScroll: {
    paddingHorizontal: Spacing[5],
    gap: Spacing[2],
    paddingBottom: Spacing[2],
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[2],
    borderRadius: BorderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  filterTabActive: {
    backgroundColor: Colors.card,
    borderColor: Colors.card,
  },
  filterTabText: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: Typography.fontWeight.medium,
  },
  filterTabTextActive: {
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  filterCount: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 20,
    alignItems: 'center',
  },
  filterCountActive: {
    backgroundColor: Colors.primaryFaded,
  },
  filterCountText: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: Typography.fontWeight.bold,
  },
  filterCountTextActive: {
    color: Colors.primary,
  },
  ordersList: {
    flex: 1,
  },
  ordersContent: {
    padding: Spacing[5],
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: Spacing[16],
    paddingHorizontal: Spacing[6],
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: Spacing[4],
  },
  emptyTitle: {
    fontSize: Typography.fontSize['2xl'],
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[2],
  },
  emptySubtitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing[8],
  },
  emptyButton: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.primary,
  },
  emptyButtonGradient: {
    paddingHorizontal: Spacing[8],
    paddingVertical: Spacing[4],
  },
  emptyButtonText: {
    color: Colors.textInverse,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  modalSheet: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: BorderRadius['3xl'],
    borderTopRightRadius: BorderRadius['3xl'],
    maxHeight: '85%',
    paddingTop: Spacing[3],
    ...Shadows.xl,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing[4],
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  modalOrderId: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.extrabold,
  },
  modalTrackingNumber: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
    fontWeight: Typography.fontWeight.medium,
  },
  modalRouteCard: {
    margin: Spacing[5],
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
  },
  modalRouteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing[3],
  },
  routeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    flexShrink: 0,
  },
  routeLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: 2,
  },
  routeValue: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
  },
  routeSender: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  routeConnector: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 5,
    paddingVertical: Spacing[1],
    gap: 2,
  },
  routeConnectorLine: {
    width: 2,
    height: 16,
    backgroundColor: Colors.border,
  },
  modalInfoGrid: {
    paddingHorizontal: Spacing[5],
    gap: Spacing[3],
  },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing[3],
  },
  modalInfoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryFaded,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInfoLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    fontWeight: Typography.fontWeight.medium,
  },
  modalInfoValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },
  modalActions: {
    flexDirection: 'row',
    gap: Spacing[3],
    paddingHorizontal: Spacing[5],
    marginTop: Spacing[5],
  },
  modalActionPrimary: {
    flex: 1,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.primary,
  },
  modalActionGradient: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  modalActionPrimaryText: {
    color: Colors.textInverse,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
  modalActionSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
    paddingHorizontal: Spacing[5],
    height: 50,
    borderRadius: BorderRadius.xl,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryFaded,
  },
  modalActionSecondaryText: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default OrdersScreen;
