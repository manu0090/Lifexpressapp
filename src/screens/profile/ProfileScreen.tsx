import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Typography, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import { mockUser, mockOrders } from '../../data/mockData';

interface ProfileScreenProps {
  navigation: any;
}

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  iconColor?: string;
  iconBg?: string;
  isRed?: boolean;
  onPress: () => void;
  badge?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  iconColor = Colors.primary,
  iconBg = Colors.primaryFaded,
  isRed = false,
  onPress,
  badge,
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.menuIconBg, { backgroundColor: isRed ? Colors.errorLight : iconBg }]}>
      <Ionicons name={icon} size={20} color={isRed ? Colors.error : iconColor} />
    </View>
    <Text style={[styles.menuLabel, isRed && styles.menuLabelRed]}>{label}</Text>
    <View style={styles.menuRight}>
      {badge !== undefined && badge > 0 && (
        <View style={styles.menuBadge}>
          <Text style={styles.menuBadgeText}>{badge}</Text>
        </View>
      )}
      <Ionicons
        name="chevron-forward"
        size={16}
        color={isRed ? Colors.error : Colors.textTertiary}
      />
    </View>
  </TouchableOpacity>
);

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, children }) => (
  <View style={styles.menuSection}>
    <Text style={styles.menuSectionTitle}>{title}</Text>
    <View style={styles.menuCard}>{children}</View>
  </View>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const activeOrders = mockOrders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled'
  ).length;

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => navigation.replace('Login'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primaryDark} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <LinearGradient
          colors={[Colors.primaryDark, Colors.primary, '#4F7FEB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <SafeAreaView edges={['top']}>
            <View style={styles.decorCircle1} />
            <View style={styles.decorCircle2} />
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Mi Perfil</Text>

              {/* Avatar */}
              <View style={styles.avatarWrapper}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.15)']}
                  style={styles.avatarCircle}
                >
                  <Text style={styles.avatarText}>{mockUser.avatar}</Text>
                </LinearGradient>
                <View style={styles.avatarBadge}>
                  <Ionicons name="checkmark" size={12} color={Colors.textInverse} />
                </View>
              </View>

              {/* User Info */}
              <Text style={styles.userName}>{mockUser.name}</Text>
              <Text style={styles.userEmail}>{mockUser.email}</Text>
              <Text style={styles.memberSince}>Miembro desde {mockUser.memberSince}</Text>

              {/* Stats Row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{mockUser.totalShipments}</Text>
                  <Text style={styles.statLabel}>Total Envíos</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{mockUser.delivered}</Text>
                  <Text style={styles.statLabel}>Entregados</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{mockUser.active}</Text>
                  <Text style={styles.statLabel}>Activos</Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Menu Sections */}
        <View style={styles.menuContainer}>

          {/* MI CUENTA */}
          <MenuSection title="MI CUENTA">
            <MenuItem
              icon="person-outline"
              label="Datos personales"
              iconColor={Colors.primary}
              iconBg={Colors.primaryFaded}
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="location-outline"
              label="Mis direcciones"
              iconColor={Colors.info}
              iconBg={Colors.infoLight}
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="card-outline"
              label="Métodos de pago"
              iconColor={Colors.success}
              iconBg={Colors.successLight}
              onPress={() => {}}
            />
          </MenuSection>

          {/* ENVÍOS */}
          <MenuSection title="ENVÍOS">
            <MenuItem
              icon="cube-outline"
              label="Mis pedidos"
              iconColor={Colors.secondary}
              iconBg={Colors.secondaryFaded}
              badge={activeOrders}
              onPress={() => navigation.navigate('Pedidos')}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="time-outline"
              label="Historial de envíos"
              iconColor={Colors.purple}
              iconBg={Colors.purpleLight}
              onPress={() => navigation.navigate('Pedidos')}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="document-text-outline"
              label="Facturas y recibos"
              iconColor={Colors.warning}
              iconBg={Colors.warningLight}
              onPress={() => {}}
            />
          </MenuSection>

          {/* SOPORTE */}
          <MenuSection title="SOPORTE">
            <MenuItem
              icon="help-circle-outline"
              label="Centro de ayuda"
              iconColor={Colors.info}
              iconBg={Colors.infoLight}
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="chatbubble-outline"
              label="Contactar soporte"
              iconColor={Colors.primary}
              iconBg={Colors.primaryFaded}
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="star-outline"
              label="Calificar la app"
              iconColor={Colors.warning}
              iconBg={Colors.warningLight}
              onPress={() => {}}
            />
          </MenuSection>

          {/* OTROS */}
          <MenuSection title="CONFIGURACIÓN">
            <MenuItem
              icon="notifications-outline"
              label="Notificaciones"
              iconColor={Colors.primary}
              iconBg={Colors.primaryFaded}
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="shield-outline"
              label="Privacidad y seguridad"
              iconColor={Colors.success}
              iconBg={Colors.successLight}
              onPress={() => {}}
            />
            <View style={styles.menuDivider} />
            <MenuItem
              icon="log-out-outline"
              label="Cerrar sesión"
              isRed
              onPress={handleLogout}
            />
          </MenuSection>

          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>LifeExpress v1.0.0</Text>
            <Text style={styles.versionSubText}>© 2024 LifeExpress. Todos los derechos reservados.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingBottom: Spacing[8],
    overflow: 'hidden',
  },
  decorCircle1: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
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
  headerContent: {
    alignItems: 'center',
    paddingTop: Spacing[2],
    paddingHorizontal: Spacing[5],
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: Typography.fontWeight.semibold,
    marginBottom: Spacing[4],
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: Spacing[3],
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  avatarText: {
    color: Colors.textInverse,
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.extrabold,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.card,
  },
  userName: {
    fontSize: Typography.fontSize['2xl'],
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
    marginBottom: Spacing[1],
  },
  userEmail: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing[1],
  },
  memberSince: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: Spacing[5],
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[6],
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing[1],
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: Typography.fontWeight.medium,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginVertical: Spacing[1],
  },
  menuContainer: {
    paddingHorizontal: Spacing[5],
    marginTop: Spacing[4],
    paddingBottom: Spacing[8],
  },
  menuSection: {
    marginBottom: Spacing[5],
  },
  menuSectionTitle: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textTertiary,
    fontWeight: Typography.fontWeight.bold,
    letterSpacing: 1.2,
    marginBottom: Spacing[2],
    marginLeft: Spacing[1],
  },
  menuCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing[4],
    paddingHorizontal: Spacing[4],
    gap: Spacing[3],
  },
  menuIconBg: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  menuLabelRed: {
    color: Colors.error,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  menuBadge: {
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.full,
    minWidth: 20,
    height: 20,
    paddingHorizontal: Spacing[1],
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBadgeText: {
    color: Colors.textInverse,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginLeft: Spacing[4] + 38 + Spacing[3],
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: Spacing[4],
    gap: Spacing[1],
  },
  versionText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textTertiary,
    fontWeight: Typography.fontWeight.medium,
  },
  versionSubText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});

export default ProfileScreen;
