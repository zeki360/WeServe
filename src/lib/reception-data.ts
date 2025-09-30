export type FoodOrder = {
  id: string;
  userName: string;
  itemName: string;
  time: string;
  status: 'Pending' | 'Confirmed' | 'Completed';
};

export type RoomBooking = {
  id: string;
  userName: string;
  itemName: string; // Room type
  time: string; // Check-in date
  status: 'Pending' | 'Confirmed' | 'Checked-in';
};

export type HallReservation = {
  id: string;
  userName: string;
  itemName: string; // Hall name
  time: string; // Event date and time
  status: 'Pending' | 'Confirmed' | 'Completed';
};

export const foodOrders: FoodOrder[] = [
  { id: 'ORD001', userName: 'John Doe', itemName: 'Pancake', time: '10:30 AM', status: 'Pending' },
  { id: 'ORD002', userName: 'Jane Smith', itemName: 'Chicken Biryani', time: '1:00 PM', status: 'Confirmed' },
  { id: 'ORD003', userName: 'Peter Jones', itemName: 'Iced Coffee', time: '3:15 PM', status: 'Completed' },
  { id: 'ORD004', userName: 'Mary Johnson', itemName: 'Tibs Firfir', time: '7:00 PM', status: 'Pending' },
];

export const roomBookings: RoomBooking[] = [
  { id: 'RM001', userName: 'Alice Williams', itemName: 'Standard Room', time: '2024-08-15', status: 'Confirmed' },
  { id: 'RM002', userName: 'Bob Brown', itemName: 'Deluxe Suite', time: '2024-08-20', status: 'Pending' },
  { id: 'RM003', userName: 'Charlie Davis', itemName: 'Standard Room', time: '2024-09-01', status: 'Checked-in' },
];

export const hallReservations: HallReservation[] = [
  { id: 'HALL01', userName: 'Mega Corp', itemName: 'Meeting Hall', time: '2024-09-10 at 9:00 AM', status: 'Confirmed' },
  { id: 'HALL02', userName: 'Events R Us', itemName: 'Main Hall', time: '2024-10-05 at 6:00 PM', status: 'Pending' },
  { id: 'HALL03', userName: 'Training Inc.', itemName: 'Training Center', time: '2024-11-01 at 10:00 AM', status: 'Confirmed' },
];
