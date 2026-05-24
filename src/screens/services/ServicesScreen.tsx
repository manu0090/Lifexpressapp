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
import { mockServices, Service } from '../../data/mockData';

interface ServicesScreenProps {
  navigation: any;
}

const ServicesScreen: React.FC<ServicesScreenProps> = ({ navigation }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleServicePress = (service: Service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <ScrollView
        style={styles.flex}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <LinearGradient
          colors={[Colors.primaryDark, Colors.primary, '#4F7FEB']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <SafeAreaView edges={['top']}>
            <View style={styles.decorCircle} />
            <View style={styles.headerContent}>
              <Text style={styles.headerLabel}>Catálogo</Text>
              <Text style={styles.headerTitle}>Nuestros Servicios</Text>
              <Text style={styles.headerSubtitle}>
                Soluciones logísticas para cada necesidad
              </Text>
            </View>

            {/* Stats strip */}
            <View style={styles.statsStrip}>
              {[
                { label: 'Ciudades', value: '50+' },
                { label: 'Países', value: '150+' },
                { label: 'Clientes', value: '10K+' },
              ].map((stat, i) => (
                <View key={i} style={[styles.statItem, i < 2 && styles.statItemBorder]}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </SafeAreaView>
        </LinearGradient>

        {/* Services Grid */}
        <View style={styles.servicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Todos los servicios</Text>
            <Text style={styles.sectionSubtitle}>{mockServices.length} disponibles</Text>
          </View>

          <View style={styles.servicesGrid}>
            {mockServices.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCardWrapper}
                onPress={() => handleServicePress(service)}
                activeOpacity={0.85}
              >
                <View style={styles.serviceCard}>
                  {/* Icon Section */}
                  <LinearGradient
                    colors={service.gradient as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.serviceIconSection}
                  >
                    <Text style={styles.serviceEmoji}>{service.icon}</Text>
                    <View style={styles.serviceDecorDot} />
                  </LinearGradient>

                  {/* Content */}
                  <View style={styles.serviceContent}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    <Text style={styles.serviceShortDesc}>{service.shortDesc}</Text>
                    <View style={styles.servicePriceRow}>
                      <Text style={[styles.servicePrice, { color: service.color }]}>
                        {service.price}
                      </Text>
                    </View>
                  </View>

                  {/* Contratar Button */}
                  <TouchableOpacity
                    style={[styles.contratarButton, { backgroundColor: service.color + '15' }]}
                    onPress={() => handleServicePress(service)}
                  >
                    <Text style={[styles.contratarText, { color: service.color }]}>
                      Contratar
                    </Text>
                    <Ionicons name="arrow-forward" size={14} color={service.color} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Custom Solution Banner */}
        <View style={styles.bannerSection}>
          <LinearGradient
            colors={['#0F172A', '#1E293B', '#1A56DB']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerDecor1} />
            <View style={styles.bannerDecor2} />
            <View style={styles.bannerContent}>
              <Text style={styles.bannerEmoji}>🤝</Text>
              <Text style={styles.bannerTitle}>
                ¿Necesitas una solución personalizada?
              </Text>
              <Text style={styles.bannerSubtitle}>
                Diseñamos soluciones logísticas a medida para empresas de cualquier tamaño.
              </Text>
              <TouchableOpacity style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>Hablar con un asesor</Text>
                <Ionicons name="arrow-forward" size={16} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>

        {/* Why LifeExpress */}
        <View style={styles.whySection}>
          <Text style={styles.whyTitle}>¿Por qué elegirnos?</Text>
          {[
            {
              icon: 'shield-checkmark-outline' as const,
              title: 'Seguridad Garantizada',
              desc: 'Tu envío está asegurado en todo momento del trayecto.',
              color: Colors.success,
            },
            {
              icon: 'flash-outline' as const,
              title: 'Rapidez Excepcional',
              desc: 'Cumplimos los tiempos de entrega prometidos siempre.',
              color: Colors.secondary,
            },
            {
              icon: 'headset-outline' as const,
              title: 'Soporte 24/7',
              desc: 'Estamos disponibles para ti en cualquier momento.',
              color: Colors.primary,
            },
            {
              icon: 'stats-chart-outline' as const,
              title: 'Trazabilidad Total',
              desc: 'Monitorea cada paso de tu envío en tiempo real.',
              color: Colors.purple,
            },
          ].map((item, i) => (
            <View key={i} style={styles.whyItem}>
              <View style={[styles.whyIcon, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <View style={styles.whyText}>
                <Text style={styles.whyItemTitle}>{item.title}</Text>
                <Text style={styles.whyItemDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: Spacing[10] }} />
      </ScrollView>

      {/* Service Detail Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setModalVisible(false)} />
          {selectedService && (
            <View style={styles.modalSheet}>
              <View style={styles.modalHandle} />

              {/* Modal Header with gradient */}
              <LinearGradient
                colors={selectedService.gradient as any}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.modalHeaderGradient}
              >
                <Text style={styles.modalEmoji}>{selectedService.icon}</Text>
                <View>
                  <Text style={styles.modalServiceName}>{selectedService.name}</Text>
                  <Text style={styles.modalServiceShort}>{selectedService.shortDesc}</Text>
                </View>
                <TouchableOpacity
                  style={styles.modalClose}
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={22} color="rgba(255,255,255,0.8)" />
                </TouchableOpacity>
              </LinearGradient>

              <ScrollView
                contentContainerStyle={styles.modalContent}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.modalDescription}>{selectedService.description}</Text>

                <Text style={styles.modalFeaturesTitle}>¿Qué incluye?</Text>
                {selectedService.features.map((feature, i) => (
                  <View key={i} style={styles.featureItem}>
                    <View style={[styles.featureCheck, { backgroundColor: selectedService.color + '20' }]}>
                      <Ionicons name="checkmark" size={14} color={selectedService.color} />
                    </View>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}

                <View style={styles.modalPriceSection}>
                  <Text style={styles.modalPriceLabel}>Precio desde</Text>
                  <Text style={[styles.modalPrice, { color: selectedService.color }]}>
                    {selectedService.price}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.modalCTAButton}
                  onPress={() => setModalVisible(false)}
                >
                  <LinearGradient
                    colors={selectedService.gradient as any}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.modalCTAGradient}
                  >
                    <Text style={styles.modalCTAText}>Contratar Servicio</Text>
                    <Ionicons name="rocket" size={18} color={Colors.textInverse} />
                  </LinearGradient>
                </TouchableOpacity>

                <View style={{ height: Spacing[4] }} />
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
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingBottom: Spacing[6],
    overflow: 'hidden',
  },
  decorCircle: {
    position: 'absolute',
    top: -100,
    right: -60,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },
  headerContent: {
    paddingHorizontal: Spacing[5],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[5],
  },
  headerLabel: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: Typography.fontWeight.medium,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: Spacing[2],
  },
  headerTitle: {
    fontSize: Typography.fontSize['3xl'],
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
    marginBottom: Spacing[2],
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.base,
    color: 'rgba(255,255,255,0.8)',
  },
  statsStrip: {
    flexDirection: 'row',
    marginHorizontal: Spacing[5],
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing[3],
  },
  statItemBorder: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.2)',
  },
  statValue: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
  },
  statLabel: {
    fontSize: Typography.fontSize.xs,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: Typography.fontWeight.medium,
  },
  servicesSection: {
    padding: Spacing[5],
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
  },
  sectionSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing[4],
  },
  serviceCardWrapper: {
    width: '47%',
  },
  serviceCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    ...Shadows.md,
  },
  serviceIconSection: {
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  serviceEmoji: {
    fontSize: 38,
  },
  serviceDecorDot: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  serviceContent: {
    padding: Spacing[3],
    gap: 3,
  },
  serviceName: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
  },
  serviceShortDesc: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  servicePriceRow: {
    marginTop: Spacing[2],
  },
  servicePrice: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  contratarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: Spacing[2],
    marginHorizontal: Spacing[3],
    marginBottom: Spacing[3],
    borderRadius: BorderRadius.lg,
  },
  contratarText: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
  },
  bannerSection: {
    paddingHorizontal: Spacing[5],
    marginBottom: Spacing[2],
  },
  banner: {
    borderRadius: BorderRadius['2xl'],
    padding: Spacing[5],
    overflow: 'hidden',
    position: 'relative',
  },
  bannerDecor1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  bannerDecor2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  bannerContent: {
    gap: Spacing[3],
  },
  bannerEmoji: {
    fontSize: 32,
  },
  bannerTitle: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
    lineHeight: 26,
  },
  bannerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 20,
  },
  bannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
    backgroundColor: Colors.card,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing[5],
    paddingVertical: Spacing[3],
    borderRadius: BorderRadius.xl,
    marginTop: Spacing[2],
  },
  bannerButtonText: {
    fontSize: Typography.fontSize.sm,
    color: Colors.primary,
    fontWeight: Typography.fontWeight.bold,
  },
  whySection: {
    padding: Spacing[5],
    gap: Spacing[3],
  },
  whyTitle: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing[2],
  },
  whyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    ...Shadows.sm,
  },
  whyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  whyText: {
    flex: 1,
  },
  whyItemTitle: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
    marginBottom: 3,
  },
  whyItemDesc: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
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
    maxHeight: '80%',
    ...Shadows.xl,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: Spacing[3],
    marginBottom: Spacing[2],
  },
  modalHeaderGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[4],
    padding: Spacing[5],
    marginHorizontal: Spacing[4],
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing[2],
  },
  modalEmoji: {
    fontSize: 36,
  },
  modalServiceName: {
    fontSize: Typography.fontSize.xl,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
  },
  modalServiceShort: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
  },
  modalClose: {
    marginLeft: 'auto',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    paddingHorizontal: Spacing[5],
    paddingBottom: Spacing[4],
    gap: Spacing[3],
  },
  modalDescription: {
    fontSize: Typography.fontSize.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  modalFeaturesTitle: {
    fontSize: Typography.fontSize.lg,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.bold,
    marginTop: Spacing[2],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[3],
  },
  featureCheck: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureText: {
    fontSize: Typography.fontSize.base,
    color: Colors.textPrimary,
    fontWeight: Typography.fontWeight.medium,
  },
  modalPriceSection: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.xl,
    padding: Spacing[4],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing[2],
  },
  modalPriceLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.medium,
  },
  modalPrice: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.extrabold,
  },
  modalCTAButton: {
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginTop: Spacing[2],
    ...Shadows.primary,
  },
  modalCTAGradient: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing[2],
  },
  modalCTAText: {
    color: Colors.textInverse,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
});

export default ServicesScreen;
