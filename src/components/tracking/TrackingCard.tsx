import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/colors';
import { Typography, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import { Order, TrackingEvent } from '../../data/mockData';
import Badge from '../common/Badge';

interface TrackingCardProps {
  order: Order;
  events: TrackingEvent[];
}

const TrackingCard: React.FC<TrackingCardProps> = ({ order, events }) => {
  const completedCount = events.filter(e => e.completed).length;
  const progress = completedCount / events.length;

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <LinearGradient
        colors={[Colors.primary, Colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.trackingLabel}>Número de Seguimiento</Text>
            <Text style={styles.trackingNumber}>{order.trackingNumber}</Text>
          </View>
          <Badge status={order.status} style={styles.badgeOnGradient} />
        </View>

        <View style={styles.routeRow}>
          <View style={styles.routePoint}>
            <View style={styles.routeDot} />
            <Text style={styles.routeText} numberOfLines={2}>{order.origin}</Text>
          </View>
          <View style={styles.routeLine}>
            <View style={styles.dashedLine} />
            <Ionicons name="airplane" size={18} color="rgba(255,255,255,0.8)" />
            <View style={styles.dashedLine} />
          </View>
          <View style={styles.routePoint}>
            <View style={[styles.routeDot, styles.routeDotDest]} />
            <Text style={styles.routeText} numberOfLines={2}>{order.destination}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Package Details */}
      <View style={styles.detailsSection}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="person-outline" size={16} color={Colors.textSecondary} />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Remitente</Text>
              <Text style={styles.detailValue}>{order.sender}</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="person-circle-outline" size={16} color={Colors.textSecondary} />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Destinatario</Text>
              <Text style={styles.detailValue}>{order.receiver}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Ionicons name="calendar-outline" size={16} color={Colors.textSecondary} />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Entrega Estimada</Text>
              <Text style={[styles.detailValue, styles.deliveryDate]}>{order.estimatedDelivery}</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cube-outline" size={16} color={Colors.textSecondary} />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Peso</Text>
              <Text style={styles.detailValue}>{order.weight}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progreso del Envío</Text>
          <Text style={styles.progressPercent}>{Math.round(progress * 100)}%</Text>
        </View>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` as any }]} />
        </View>
      </View>

      {/* Timeline Events */}
      <View style={styles.timelineSection}>
        <Text style={styles.timelineTitle}>Historial de Seguimiento</Text>
        {events.map((event, index) => (
          <View key={event.id} style={styles.timelineItem}>
            {/* Connector line */}
            <View style={styles.timelineLeft}>
              <View
                style={[
                  styles.timelineIcon,
                  event.completed ? styles.timelineIconCompleted : styles.timelineIconPending,
                ]}
              >
                {event.completed ? (
                  <Ionicons name="checkmark" size={14} color={Colors.textInverse} />
                ) : (
                  <View style={styles.timelineDotInner} />
                )}
              </View>
              {index < events.length - 1 && (
                <View
                  style={[
                    styles.timelineConnector,
                    event.completed ? styles.connectorCompleted : styles.connectorPending,
                  ]}
                />
              )}
            </View>

            {/* Content */}
            <View style={[styles.timelineContent, index < events.length - 1 && styles.timelineContentWithBorder]}>
              <View style={styles.timelineHeader}>
                <Text
                  style={[
                    styles.timelineEventTitle,
                    event.completed ? styles.textCompleted : styles.textPending,
                  ]}
                >
                  {event.title}
                </Text>
                <Text style={styles.timelineTime}>{event.time}</Text>
              </View>
              <Text style={styles.timelineDesc}>{event.description}</Text>
              <View style={styles.timelineLocation}>
                <Ionicons
                  name="location-outline"
                  size={12}
                  color={event.completed ? Colors.primary : Colors.textTertiary}
                />
                <Text
                  style={[
                    styles.timelineLocationText,
                    { color: event.completed ? Colors.primary : Colors.textTertiary },
                  ]}
                >
                  {event.location}
                </Text>
              </View>
              <Text style={styles.timelineDate}>{event.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    ...Shadows.lg,
  },
  headerGradient: {
    padding: Spacing[5],
    paddingBottom: Spacing[6],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing[5],
  },
  trackingLabel: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: Typography.fontWeight.medium,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  trackingNumber: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 1,
  },
  badgeOnGradient: {
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routePoint: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.textInverse,
  },
  routeDotDest: {
    backgroundColor: Colors.secondary,
  },
  routeText: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  routeLine: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  detailsSection: {
    padding: Spacing[5],
    gap: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  detailRow: {
    flexDirection: 'row',
    gap: Spacing[4],
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  detailText: {
    flex: 1,
  },
  detailLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.semibold,
  },
  deliveryDate: {
    color: Colors.success,
  },
  progressSection: {
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing[2],
  },
  progressLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  progressPercent: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.backgroundDark,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  timelineSection: {
    padding: Spacing[5],
  },
  timelineTitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[4],
  },
  timelineItem: {
    flexDirection: 'row',
    gap: Spacing[3],
  },
  timelineLeft: {
    alignItems: 'center',
    width: 28,
  },
  timelineIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineIconCompleted: {
    backgroundColor: Colors.primary,
  },
  timelineIconPending: {
    backgroundColor: Colors.backgroundDark,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  timelineDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textTertiary,
  },
  timelineConnector: {
    width: 2,
    flex: 1,
    marginVertical: 2,
    minHeight: 16,
  },
  connectorCompleted: {
    backgroundColor: Colors.primary,
  },
  connectorPending: {
    backgroundColor: Colors.border,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: Spacing[4],
  },
  timelineContentWithBorder: {},
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  timelineEventTitle: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  textCompleted: {
    color: Colors.textPrimary,
  },
  textPending: {
    color: Colors.textTertiary,
  },
  timelineTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
  },
  timelineDesc: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
    lineHeight: 18,
  },
  timelineLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 2,
  },
  timelineLocationText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.medium,
  },
  timelineDate: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
  },
});

export default TrackingCard;
