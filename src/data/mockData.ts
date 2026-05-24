export type OrderStatus = 'pending' | 'in_transit' | 'delivered' | 'processing' | 'cancelled';

export interface Order {
  id: string;
  trackingNumber: string;
  serviceType: string;
  status: OrderStatus;
  date: string;
  estimatedDelivery: string;
  price: number;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  weight: string;
  description: string;
}

export interface TrackingEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  completed: boolean;
  icon: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string[];
  description: string;
  shortDesc: string;
  price: string;
  features: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  totalShipments: number;
  delivered: number;
  active: number;
  memberSince: string;
  address: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    trackingNumber: 'LX-2024-001234',
    serviceType: 'Express',
    status: 'in_transit',
    date: '22 May 2024',
    estimatedDelivery: '24 May 2024',
    price: 45.99,
    sender: 'TechStore Bogotá',
    receiver: 'Juan Manuel',
    origin: 'Bogotá, D.C.',
    destination: 'Medellín, Antioquia',
    weight: '2.5 kg',
    description: 'Electrónicos - Laptop',
  },
  {
    id: 'ORD-002',
    trackingNumber: 'LX-2024-005678',
    serviceType: 'Estándar',
    status: 'processing',
    date: '21 May 2024',
    estimatedDelivery: '27 May 2024',
    price: 18.50,
    sender: 'Fashion House Cali',
    receiver: 'Juan Manuel',
    origin: 'Cali, Valle del Cauca',
    destination: 'Medellín, Antioquia',
    weight: '0.8 kg',
    description: 'Ropa y accesorios',
  },
  {
    id: 'ORD-003',
    trackingNumber: 'LX-2024-009012',
    serviceType: 'Última Milla',
    status: 'delivered',
    date: '18 May 2024',
    estimatedDelivery: '20 May 2024',
    price: 12.00,
    sender: 'Supermercado La 14',
    receiver: 'Juan Manuel',
    origin: 'Medellín Centro',
    destination: 'El Poblado, Medellín',
    weight: '3.2 kg',
    description: 'Productos del hogar',
  },
  {
    id: 'ORD-004',
    trackingNumber: 'LX-2024-003456',
    serviceType: 'Internacional',
    status: 'in_transit',
    date: '15 May 2024',
    estimatedDelivery: '30 May 2024',
    price: 125.00,
    sender: 'Amazon USA',
    receiver: 'Juan Manuel',
    origin: 'Miami, FL, USA',
    destination: 'Medellín, Colombia',
    weight: '1.5 kg',
    description: 'Gadgets importados',
  },
  {
    id: 'ORD-005',
    trackingNumber: 'LX-2024-007890',
    serviceType: 'Devolución',
    status: 'pending',
    date: '23 May 2024',
    estimatedDelivery: '26 May 2024',
    price: 8.00,
    sender: 'Juan Manuel',
    receiver: 'ElectroColombia',
    origin: 'Medellín, Antioquia',
    destination: 'Bogotá, D.C.',
    weight: '0.5 kg',
    description: 'Devolución - Artículo defectuoso',
  },
];

// Mock Tracking Events for LX-2024-001234
export const mockTrackingEvents: TrackingEvent[] = [
  {
    id: 'EVT-001',
    title: 'Paquete Recibido',
    description: 'Tu paquete fue recibido en nuestras instalaciones',
    location: 'Centro de Distribución Bogotá',
    date: '22 May 2024',
    time: '08:30 AM',
    completed: true,
    icon: 'checkmark-circle',
  },
  {
    id: 'EVT-002',
    title: 'En Bodega',
    description: 'Paquete clasificado y preparado para despacho',
    location: 'Bodega Principal Bogotá',
    date: '22 May 2024',
    time: '11:45 AM',
    completed: true,
    icon: 'archive',
  },
  {
    id: 'EVT-003',
    title: 'En Tránsito',
    description: 'Tu paquete está en camino a su destino',
    location: 'Autopista Bogotá-Medellín',
    date: '22 May 2024',
    time: '03:20 PM',
    completed: true,
    icon: 'car',
  },
  {
    id: 'EVT-004',
    title: 'En Camino',
    description: 'El mensajero está en camino a tu dirección',
    location: 'Medellín, Antioquia',
    date: '24 May 2024',
    time: '09:00 AM',
    completed: false,
    icon: 'bicycle',
  },
  {
    id: 'EVT-005',
    title: 'Entregado',
    description: 'Paquete entregado exitosamente',
    location: 'El Poblado, Medellín',
    date: '24 May 2024',
    time: 'Estimado 02:00 PM',
    completed: false,
    icon: 'home',
  },
];

// Mock Services Data
export const mockServices: Service[] = [
  {
    id: 'SRV-001',
    name: 'Express',
    icon: '🚀',
    color: '#F97316',
    gradient: ['#EA580C', '#F97316'],
    description: 'Entrega garantizada en 24 horas para cualquier ciudad principal de Colombia.',
    shortDesc: 'Entrega en 24h',
    price: 'Desde $35.000',
    features: ['Entrega en 24h', 'Seguimiento en tiempo real', 'Seguro incluido', 'Firma digital'],
  },
  {
    id: 'SRV-002',
    name: 'Estándar',
    icon: '📦',
    color: '#1A56DB',
    gradient: ['#1E40AF', '#1A56DB'],
    description: 'La opción más económica para envíos que no son urgentes. 2-5 días hábiles.',
    shortDesc: '2-5 días hábiles',
    price: 'Desde $15.000',
    features: ['2-5 días hábiles', 'Cobertura nacional', 'Rastreo básico', 'Precio competitivo'],
  },
  {
    id: 'SRV-003',
    name: 'Almacenamiento',
    icon: '🏭',
    color: '#8B5CF6',
    gradient: ['#7C3AED', '#8B5CF6'],
    description: 'Soluciones de almacenamiento flexible para tu negocio con gestión de inventario.',
    shortDesc: 'Soluciones flexibles',
    price: 'Desde $80.000/mes',
    features: ['Bodegas climatizadas', 'Gestión de inventario', 'Pick & Pack', 'Seguridad 24/7'],
  },
  {
    id: 'SRV-004',
    name: 'Última Milla',
    icon: '🏍️',
    color: '#10B981',
    gradient: ['#059669', '#10B981'],
    description: 'Entregas locales rápidas con mensajeros especializados en tu ciudad.',
    shortDesc: 'Entrega local',
    price: 'Desde $8.000',
    features: ['Entrega mismo día', 'Área metropolitana', 'Mensajero dedicado', 'Confirmación foto'],
  },
  {
    id: 'SRV-005',
    name: 'Internacional',
    icon: '✈️',
    color: '#06B6D4',
    gradient: ['#0891B2', '#06B6D4'],
    description: 'Envíos a más de 150 países con gestión aduanera incluida.',
    shortDesc: 'Envíos al mundo',
    price: 'Desde $45.000',
    features: ['150+ países', 'Gestión aduanera', 'Tracking global', 'Seguro internacional'],
  },
  {
    id: 'SRV-006',
    name: 'Devoluciones',
    icon: '↩️',
    color: '#EF4444',
    gradient: ['#DC2626', '#EF4444'],
    description: 'Proceso simplificado de devoluciones para e-commerce y retail.',
    shortDesc: 'Proceso simplificado',
    price: 'Desde $6.000',
    features: ['Proceso simple', 'Etiqueta prepagada', 'Reembolso rápido', 'App integrada'],
  },
];

// Mock User Profile
export const mockUser: UserProfile = {
  id: 'USR-001',
  name: 'Juan Manuel',
  email: 'juanmanuelalquizalet@gmail.com',
  phone: '+57 300 123 4567',
  avatar: 'JM',
  totalShipments: 47,
  delivered: 43,
  active: 4,
  memberSince: 'Enero 2023',
  address: 'El Poblado, Medellín, Antioquia',
};

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'NOT-001',
    title: 'Paquete en camino 🚀',
    message: 'Tu pedido LX-2024-001234 está en tránsito y llegará mañana.',
    time: 'Hace 2 horas',
    read: false,
    type: 'info',
  },
  {
    id: 'NOT-002',
    title: 'Entrega exitosa ✅',
    message: 'Tu pedido LX-2024-009012 fue entregado con éxito.',
    time: 'Hace 1 día',
    read: false,
    type: 'success',
  },
  {
    id: 'NOT-003',
    title: 'Nuevo envío disponible',
    message: 'Obtén 20% de descuento en envíos internacionales este fin de semana.',
    time: 'Hace 2 días',
    read: true,
    type: 'warning',
  },
  {
    id: 'NOT-004',
    title: 'Actualización de estado',
    message: 'Tu pedido LX-2024-005678 está siendo procesado.',
    time: 'Hace 3 días',
    read: true,
    type: 'info',
  },
];

export const getStatusLabel = (status: OrderStatus): string => {
  const labels: Record<OrderStatus, string> = {
    pending: 'Pendiente',
    in_transit: 'En Tránsito',
    delivered: 'Entregado',
    processing: 'Procesando',
    cancelled: 'Cancelado',
  };
  return labels[status];
};

export const getStatusColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    pending: '#F59E0B',
    in_transit: '#1A56DB',
    delivered: '#10B981',
    processing: '#8B5CF6',
    cancelled: '#EF4444',
  };
  return colors[status];
};

export const getStatusBgColor = (status: OrderStatus): string => {
  const colors: Record<OrderStatus, string> = {
    pending: '#FEF3C7',
    in_transit: '#EFF6FF',
    delivered: '#D1FAE5',
    processing: '#EDE9FE',
    cancelled: '#FEE2E2',
  };
  return colors[status];
};
