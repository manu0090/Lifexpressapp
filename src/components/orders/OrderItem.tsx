import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Typography, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import { Order } from '../../data/mockData';
import Badge from '../common/Badge';

interface OrderItemProps {
  order: Order;
  onPress?: () => void;
}

const serviceIconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  Express: 'rocket',
  Estándar: 'cube',
  'Última Milla': 'bicycle',
  Internacional: 'airplane',
  Devolución: 'return-up-back',
  Almacenamiento: 'business',
};

const serviceColorMap: Record<string, string> = {
  Express: '#F97316',
  Estándar: '#1A56DB',
  'Última Milla': '#10B981',
  Internacional: '#06B6D4',
  Devolución: '#EF4444',
  Almacenamiento: '#8B5CF6',
};

const OrderItem: React.FC<OrderItemProps> = ({ order, onPress }) => {
  const iconName = serviceIconMap[order.serviceType] || 'cube';
  const serviceColor = serviceColorMap[order.serviceType] || Colors.primary;
  const bgColor = serviceColor + '18';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* Service Icon */}
      <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
        <Ionicons name={iconName} size={22} color={serviceColor} />
      </View>

      {/* Main Info */}
      <View style={styles.mainInfo}>
        <View style={styles.topRow}>
          <Text style={styles.orderId}>{order.id}</Text>
          <Badge status={order.status} size="sm" />
        </View>
        <Text style={styles.trackingNumber} numberOfLines={1}>
          {order.trackingNumber}
        </Text>
        <View style={styles.bottomRow}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={12} color={Colors.textTertiary} />
            <Text style={styles.metaText} numberOfLines={1}>
              {order.destination}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={12} color={Colors.textTertiary} />
            <Text style={styles.metaText}>{order.date}</Text>
          </View>
        </View>
      </View>

      {/* Price & Arrow */}
      <View style={styles.rightSection}>
        <Text style={styles.price}>${order.price.toFixed(2)}</Text>
        <Text style={styles.serviceType}>{order.serviceType}</Text>
        <Ionicons name="chevron-forward" size={16} color={Colors.textTertiary} style={styles.arrow} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
    ...Shadows.md,
    marginBottom: Spacing[3],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  mainInfo: {
    flex: 1,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  trackingNumber: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: Spacing[3],
    marginTop: 2,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flex: 1,
  },
  metaText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    flex: 1,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 2,
  },
  price: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
  },
  serviceType: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  arrow: {
    marginTop: 4,
  },
});

export default OrderItem;
