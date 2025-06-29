export const providers = [
  {
    id: '1',
    name: 'John Smith',
    rating: 4.9,
    reviewCount: 215,
    completedJobs: 450,
    experience: 7, // years
    avatar: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="20" fill="#3b82f6"/><circle cx="50" cy="100" r="30" fill="#3b82f6"/></svg>`,
    phone: '+1 (555) 123-4567',
    eta: 15, // minutes
    specialties: ['House Cleaning', 'Deep Cleaning']
  },
  {
    id: '2',
    name: 'Emily Johnson',
    rating: 4.7,
    reviewCount: 98,
    completedJobs: 275,
    experience: 4,
    avatar: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="20" fill="#ec4899"/><circle cx="50" cy="100" r="30" fill="#ec4899"/></svg>`,
    phone: '+1 (555) 987-6543',
    eta: 25,
    specialties: ['AC Repair', 'Appliance Maintenance']
  },
  {
    id: '3',
    name: 'Michael Brown',
    rating: 5.0,
    reviewCount: 342,
    completedJobs: 600,
    experience: 10,
    avatar: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="20" fill="#f59e0b"/><circle cx="50" cy="100" r="30" fill="#f59e0b"/></svg>`,
    phone: '+1 (555) 456-7890',
    eta: 10,
    specialties: ['Plumbing', 'Emergency Repair']
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    rating: 4.5,
    reviewCount: 156,
    completedJobs: 320,
    experience: 3,
    avatar: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="20" fill="#10b981"/><circle cx="50" cy="100" r="30" fill="#10b981"/></svg>`,
    phone: '+1 (555) 789-0123',
    eta: 30,
    specialties: ['Electrical', 'Light Installation']
  },
  {
    id: '5',
    name: 'David Lee',
    rating: 4.8,
    reviewCount: 278,
    completedJobs: 420,
    experience: 6,
    avatar: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="40" r="20" fill="#8b5cf6"/><circle cx="50" cy="100" r="30" fill="#8b5cf6"/></svg>`,
    phone: '+1 (555) 234-5678',
    eta: 18,
    specialties: ['Handyman', 'Furniture Assembly']
  }
];



export const jobs = [
  {
    id: 101,
    category: 'House Cleaning',
    address: '123 Main St, New York, NY',
    timeRange: 'Today 2:00 PM - 4:00 PM',
    price: 120,
    status: 'Upcoming'
  },
  {
    id: 102,
    category: 'AC Repair',
    address: '456 Oak Ave, Los Angeles, CA',
    timeRange: 'Tomorrow 9:00 AM - 11:00 AM',
    price: 199,
    status: 'Scheduled'
  },
  {
    id: 103,
    category: 'Emergency Plumbing',
    address: '789 Pine Rd, Chicago, IL',
    timeRange: 'ASAP (Within 1 hour)',
    price: 350,
    status: 'Urgent'
  },
  {
    id: 104,
    category: 'Electrical Repair',
    address: '321 Elm Blvd, Houston, TX',
    timeRange: 'Friday 1:00 PM - 3:00 PM',
    price: 175,
    status: 'Scheduled'
  },
  {
    id: 105,
    category: 'Deep Cleaning',
    address: '654 Maple Dr, Phoenix, AZ',
    timeRange: 'Weekly (Every Wednesday)',
    price: 220,
    status: 'Recurring'
  }
];

 

export const bids =  [
  {
    id: 'bid1',
    price: 95,
    rankScore: 9.2,
    etaHours: 3,
    note: 'Uses imported cleaning products, pet-friendly',
    provider: providers[0],
  },
  {
    id: 'bid2',
    price: 88,
    rankScore: 8.9,
    etaHours: 4,
    note: 'Eco-friendly products, can arrive early',
    provider: providers[1],
  },
  {
    id: 'bid3',
    price: 102,
    rankScore: 9.5,
    etaHours: 2,
    note: 'Emergency service available',
    provider: providers[2],
  },
  {
    id: 'bid4',
    price: 75,
    rankScore: 8.5,
    etaHours: 5,
    note: 'Budget-friendly option',
    provider: providers[0],   
  },
  {
    id: 'bid5',
    price: 120,
    rankScore: 9.7,
    etaHours: 1,
    note: 'VIP premium service with guarantee',
    provider: providers[2],  
  },
  {
    id: 'bid6',
    price: 82,
    rankScore: 8.7,
    etaHours: 6,
    note: 'Weekend special discount',
    provider: providers[1],  
  },
  {
    id: 'bid7',
    price: 110,
    rankScore: 9.3,
    etaHours: 2,
    note: 'Organic cleaning supplies only',
    provider: providers[0],   
  },
  {
    id: 'bid8',
    price: 90,
    rankScore: 9.0,
    etaHours: 3,
    note: 'Senior technician with 10+ years experience',
    provider: providers[2],  
  },
  {
    id: 'bid9',
    price: 68,
    rankScore: 8.0,
    etaHours: 8,
    note: 'Basic cleaning package',
    provider: providers[1],   
  },
  {
    id: 'bid10',
    price: 115,
    rankScore: 9.4,
    etaHours: 1,
    note: '24/7 availability, urgent response',
    provider: providers[0],   
  }
];