export type Role = 'client' | 'driver' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'en_route' | 'driver_arrived' | 'in_progress' | 'completed' | 'cancelled';

export interface VehicleCategory {
  id: string;
  name: string;
  pax: number;
  bags: number;
  price: number;
  icon: React.ReactNode;
  description: string;
}

export const VEHICLE_CATEGORIES: VehicleCategory[] = [
  { id: 'sedan', name: 'Sedan Ejecutivo', pax: 4, bags: 4, price: 65, icon: <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary font-bold">S</div>, description: 'Confort y discreción. Ideal para negocios.' },
  { id: 'suv', name: 'SUV Premium', pax: 5, bags: 4, price: 95, icon: <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary font-bold">X</div>, description: 'Espacio extra y visibilidad. Perfecto para la familia.' },
  { id: 'van', name: 'Van Grupal', pax: 8, bags: 8, price: 140, icon: <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary font-bold">V</div>, description: 'Espacio máximo. Ideal para grupos jóvenes o familias grandes.' },
  { id: 'hybrid', name: 'Eco Hybrid', pax: 4, bags: 4, price: 75, icon: <div className="w-10 h-10 bg-primary/10 flex items-center justify-center rounded-lg text-primary font-bold">H</div>, description: 'Viaje sustentable con la última tecnología.' },
];

export const MOCK_ACTIVE_BOOKING = {
  id: 'FT-2094',
  from: 'Aeropuerto Galeão (GIG)',
  to: 'Hotel Fasano Ipanema',
  date: '10 Mayo, 2026',
  time: '14:30',
  status: 'en_route' as BookingStatus,
  driver: {
    name: 'Cristiano Barreto',
    phone: '+55 21 98877-6655',
    vehicle: 'Toyota Corolla 2024 · Gris',
    plate: 'ABC-1234',
    rating: 4.9,
    trips: 142
  },
  price: 130,
  deposit: 65
};
