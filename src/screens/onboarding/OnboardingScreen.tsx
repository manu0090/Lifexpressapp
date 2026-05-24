import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { Typography, BorderRadius, Spacing } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  gradient: string[];
  accentColor: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    emoji: '🚀',
    title: 'Envíos Rápidos',
    subtitle: 'Velocidad que marca la diferencia',
    description: 'Recibe tus paquetes en tiempo récord. Nuestro servicio express garantiza entregas en 24 horas a cualquier ciudad principal de Colombia.',
    gradient: ['#1A56DB', '#3B82F6', '#60A5FA'],
    accentColor: '#60A5FA',
  },
  {
    id: '2',
    emoji: '📡',
    title: 'Rastreo en Tiempo Real',
    subtitle: 'Siempre sabe dónde está tu paquete',
    description: 'Monitorea el estado de tus envíos al instante. Recibe notificaciones automáticas en cada paso del proceso de entrega.',
    gradient: ['#0F172A', '#1E293B', '#1A56DB'],
    accentColor: '#3B82F6',
  },
  {
    id: '3',
    emoji: '🌟',
    title: 'Servicios Completos',
    subtitle: 'Todo lo que necesitas en un solo lugar',
    description: 'Express, estándar, internacional, almacenamiento y más. Soluciones logísticas integrales para personas y empresas.',
    gradient: ['#EA580C', '#F97316', '#FB923C'],
    accentColor: '#FED7AA',
  },
];

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const handleGetStarted = () => {
    navigation.replace('Login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => (
    <LinearGradient
      colors={item.gradient as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.3, y: 1 }}
      style={styles.slide}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeSlide} edges={['top', 'bottom']}>
        {/* Decorative circles */}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        {/* Skip button */}
        {index < slides.length - 1 && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Saltar</Text>
            <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.75)" />
          </TouchableOpacity>
        )}

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <View style={[styles.emojiCircle, { borderColor: 'rgba(255,255,255,0.3)' }]}>
            <View style={[styles.emojiInnerCircle, { borderColor: 'rgba(255,255,255,0.2)' }]}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>
          </View>

          {/* Floating icons */}
          <View style={styles.floatingIcon1}>
            <View style={styles.floatingIconBg}>
              <Ionicons name="checkmark-circle" size={20} color={item.accentColor} />
            </View>
          </View>
          <View style={styles.floatingIcon2}>
            <View style={styles.floatingIconBg}>
              <Ionicons name="star" size={18} color={item.accentColor} />
            </View>
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContent}>
          <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideDescription}>{item.description}</Text>
        </View>

        {/* Bottom section */}
        <View style={styles.bottomSection}>
          {/* Dots */}
          <View style={styles.dotsContainer}>
            {slides.map((_, dotIndex) => {
              const inputRange = [
                (dotIndex - 1) * width,
                dotIndex * width,
                (dotIndex + 1) * width,
              ];
              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [8, 24, 8],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
                extrapolate: 'clamp',
              });
              return (
                <Animated.View
                  key={dotIndex}
                  style={[styles.dot, { width: dotWidth, opacity }]}
                />
              );
            })}
          </View>

          {/* Action buttons */}
          {index < slides.length - 1 ? (
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <Text style={styles.nextButtonText}>Siguiente</Text>
              <Ionicons name="arrow-forward" size={20} color={Colors.textInverse} />
            </TouchableOpacity>
          ) : (
            <View style={styles.lastSlideButtons}>
              <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
                <Text style={styles.getStartedText}>Comenzar Ahora</Text>
                <Ionicons name="rocket" size={20} color={Colors.textInverse} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginLink} onPress={handleSkip}>
                <Text style={styles.loginLinkText}>Ya tengo cuenta · Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width,
    minHeight: height,
    flex: 1,
  },
  safeSlide: {
    flex: 1,
    paddingHorizontal: Spacing[6],
    paddingTop: Spacing[4],
    paddingBottom: Spacing[6],
  },
  decorCircle1: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  decorCircle2: {
    position: 'absolute',
    bottom: -60,
    left: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  skipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: Spacing[2],
    paddingHorizontal: Spacing[3],
    gap: 4,
  },
  skipText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  illustrationContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: Spacing[8],
  },
  emojiCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  emojiInnerCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  emoji: {
    fontSize: 80,
  },
  floatingIcon1: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  floatingIcon2: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  floatingIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  textContent: {
    alignItems: 'center',
    marginBottom: Spacing[8],
  },
  slideSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: Typography.fontWeight.medium,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: Spacing[2],
    textAlign: 'center',
  },
  slideTitle: {
    fontSize: Typography.fontSize['4xl'],
    color: Colors.textInverse,
    fontWeight: Typography.fontWeight.extrabold,
    textAlign: 'center',
    marginBottom: Spacing[4],
    lineHeight: 40,
  },
  slideDescription: {
    fontSize: Typography.fontSize.base,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: Spacing[2],
  },
  bottomSection: {
    alignItems: 'center',
    gap: Spacing[6],
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: Spacing[2],
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.textInverse,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: Spacing[8],
    paddingVertical: Spacing[4],
    borderRadius: BorderRadius.full,
    gap: Spacing[2],
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    width: '100%',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: Colors.textInverse,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  lastSlideButtons: {
    width: '100%',
    gap: Spacing[4],
    alignItems: 'center',
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.textInverse,
    paddingHorizontal: Spacing[8],
    paddingVertical: Spacing[4],
    borderRadius: BorderRadius.full,
    gap: Spacing[2],
    width: '100%',
    justifyContent: 'center',
  },
  getStartedText: {
    color: Colors.secondary,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  loginLink: {
    paddingVertical: Spacing[2],
  },
  loginLinkText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
});

export default OnboardingScreen;
