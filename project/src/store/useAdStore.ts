import { create } from 'zustand';
import { Advertisement, Category, User, CreateAdForm } from '../types';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Participant {
  name: string;
  email: string;
  avatar: string;
}

const initialUser: User = {
  name: 'Eray Can',
  email: 'eraycan@email.com',
  password: 'password123', // Demo için
  avatar: 'https://ui-avatars.com/api/?name=Eray+Can&background=6d28d9&color=fff&size=160',
  bio: 'Sosyal etkinlikleri ve yeni insanlarla tanışmayı seven biriyim.',
  instagram: 'eraycan',
  twitter: 'eraycan',
};

const mockUsers: User[] = [initialUser];

interface AdStore {
  ads: Advertisement[];
  categories: Category[];
  users: User[];
  selectedCategory: string | null;
  searchQuery: string;
  currentUser: User | null;
  addAd: (adData: CreateAdForm & { category: Category }) => void;
  setSelectedCategory: (categoryId: string | null) => void;
  setSearchQuery: (query: string) => void;
  getFilteredAds: () => Advertisement[];
  joinAd: (adId: string) => void;
  joinedAdIds: string[];
  getUpcomingEvents: () => Advertisement[];
  getPastEvents: () => Advertisement[];
  getMyAds: () => Advertisement[];
  getParticipants: (adId: string) => Participant[];
  updateUser: (user: Partial<User>) => void;
  registerUser: (user: Pick<User, 'name' | 'email' | 'password'>) => boolean;
  loginUser: (credentials: Pick<User, 'email' | 'password'>) => boolean;
  logoutUser: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const mockCategories: Category[] = [
  { id: 'gaming', name: 'Oyun', icon: 'Gamepad2', color: 'bg-purple-500' },
  { id: 'cinema', name: 'Sinema', icon: 'Film', color: 'bg-red-500' },
  { id: 'sports', name: 'Spor', icon: 'Dumbbell', color: 'bg-green-500' },
  { id: 'music', name: 'Müzik', icon: 'Music', color: 'bg-blue-500' },
  { id: 'food', name: 'Yemek', icon: 'UtensilsCrossed', color: 'bg-orange-500' },
  { id: 'travel', name: 'Gezi', icon: 'MapPin', color: 'bg-teal-500' },
  { id: 'study', name: 'Çalışma', icon: 'BookOpen', color: 'bg-indigo-500' },
  { id: 'other', name: 'Diğer', icon: 'Sparkles', color: 'bg-gray-500' },
];

const mockAds: Advertisement[] = [
  {
    id: '1',
    title: 'PlayStation 5 FIFA 24 Turnuvası',
    description: 'Salı akşamı evimde FIFA 24 turnuvası düzenliyorum. 4 kişi olacağız, 1 kişi daha arıyorum. Pizza ve içecek benden!',
    category: mockCategories[0],
    location: 'Kadıköy, İstanbul',
    date: '2026-06-01',
    time: '19:00',
    maxParticipants: 4,
    currentParticipants: 3,
    authorName: 'Ahmet K.',
    authorContact: '@ahmetk_gamer',
    authorAvatar: `https://ui-avatars.com/api/?name=Ahmet+K&background=10b981&color=fff`,
    createdAt: new Date('2025-01-10'),
    tags: ['FIFA24', 'PlayStation', 'Turnuva']
  },
  {
    id: '2',
    title: 'Sinema: Dune 2 İzleyelim',
    description: 'Bu hafta sonu Dune 2 filmine gitmek istiyorum. Bilim kurgu seven arkadaşlar aranıyor!',
    category: mockCategories[1],
    location: 'Zorlu Center, İstanbul',
    date: '2025-01-18',
    time: '15:30',
    maxParticipants: 4,
    currentParticipants: 2,
    authorName: 'Zeynep S.',
    authorContact: 'zeynep.sinema@email.com',
    authorAvatar: `https://ui-avatars.com/api/?name=Zeynep+S&background=10b981&color=fff`,
    createdAt: new Date('2025-01-12'),
    tags: ['Dune', 'Bilim Kurgu', 'IMAX']
  },
  {
    id: '3',
    title: 'Okey Masası - 4. Oyuncu Aranıyor',
    description: 'Her Çarşamba akşamı okey oynuyoruz. Sürekli 4. oyuncumuz eksik kalıyor. Katılmak isteyen var mı?',
    category: mockCategories[0],
    location: 'Bahçeşehir, İstanbul',
    date: '2025-01-22',
    time: '20:00',
    maxParticipants: 4,
    currentParticipants: 3,
    authorName: 'Mehmet B.',
    authorContact: '+90 532 XXX XX XX',
    authorAvatar: `https://ui-avatars.com/api/?name=Mehmet+B&background=10b981&color=fff`,
    createdAt: new Date('2025-01-11'),
    tags: ['Okey', 'Düzenli', 'Haftalık']
  },
  {
    id: '4',
    title: 'Basketbol Maçı Gidiyoruz',
    description: 'Fenerbahçe - Galatasaray derbisine gidiyoruz. Ekstra biletlerimiz var, katılmak isteyen?',
    category: mockCategories[2],
    location: 'Ülker Sports Arena',
    date: '2025-01-25',
    time: '20:30',
    maxParticipants: 6,
    currentParticipants: 4,
    authorName: 'Can Y.',
    authorContact: '@canyilmaz',
    authorAvatar: `https://ui-avatars.com/api/?name=Can+Y&background=10b981&color=fff`,
    createdAt: new Date('2025-01-13'),
    tags: ['Basketbol', 'Derbi', 'Ülker Arena']
  }
];

export const useAdStore = create<AdStore>()(
  persist(
    (set, get) => ({
      ads: mockAds,
      categories: mockCategories,
      users: mockUsers,
      selectedCategory: null,
      searchQuery: '',
      joinedAdIds: [],
      currentUser: null,
      theme: 'light',

      addAd: (adData) => {
        const currentUser = get().currentUser;
        if (!currentUser) return;

        const newAd: Advertisement = {
          ...adData,
          id: Date.now().toString(),
          createdAt: new Date(),
          currentParticipants: 1,
          authorName: currentUser.name,
          authorContact: currentUser.email,
          authorAvatar: currentUser.avatar,
        };
        set((state) => ({ ads: [newAd, ...state.ads] }));
      },
      
      setSelectedCategory: (categoryId) => set({ selectedCategory: categoryId }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      getFilteredAds: () => {
        const { ads, selectedCategory, searchQuery } = get();
        let filtered = ads;
        
        if (selectedCategory) {
          filtered = filtered.filter(ad => ad.category.id === selectedCategory);
        }
        
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter(ad => 
            ad.title.toLowerCase().includes(query) ||
            ad.description.toLowerCase().includes(query) ||
            ad.location.toLowerCase().includes(query) ||
            ad.tags.some(tag => tag.toLowerCase().includes(query))
          );
        }
        
        return filtered;
      },
      
      joinAd: (adId) => {
        const { ads, currentUser, joinedAdIds } = get();
        const ad = ads.find(ad => ad.id === adId);
        if (!ad || !currentUser || ad.authorContact === currentUser.email) return;

        set({
          ads: ads.map(a =>
            a.id === adId && a.currentParticipants < a.maxParticipants
              ? { ...a, currentParticipants: a.currentParticipants + 1 }
              : a
          ),
          joinedAdIds: joinedAdIds.includes(adId)
            ? joinedAdIds
            : [...joinedAdIds, adId]
        });
      },
      
      getUpcomingEvents: () => {
        const { ads, joinedAdIds } = get();
        const now = new Date();
        return ads.filter(ad => joinedAdIds.includes(ad.id) && new Date(ad.date) >= now);
      },
      
      getPastEvents: () => {
        const { ads, joinedAdIds } = get();
        const now = new Date();
        return ads.filter(ad => joinedAdIds.includes(ad.id) && new Date(ad.date) < now);
      },
      
      getMyAds: () => {
        const { ads, currentUser } = get();
        if (!currentUser) return [];
        return ads.filter(ad => ad.authorContact === currentUser.email);
      },
      
      getParticipants: (adId) => {
        const { ads, joinedAdIds } = get();
        const ad = ads.find(a => a.id === adId);
        if (!ad) return [];
        // Mock: author + joinedAdIds (herkesin adı farklı gibi göster)
        const participants: Participant[] = [
          {
            name: ad.authorName,
            email: ad.authorContact,
            avatar: ad.authorAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(ad.authorName)}&background=6d28d9&color=fff&size=48`,
          },
        ];
        // joinedAdIds'den author hariç katılımcı ekle (isimler mock)
        let idx = 1;
        for (const id of joinedAdIds) {
          if (id === adId) {
            participants.push({
              name: get().currentUser.name,
              email: get().currentUser.email,
              avatar: get().currentUser.avatar,
            });
            idx++;
          }
        }
        return participants;
      },
      
      updateUser: (newUserData) => {
        set((state) => {
          if (!state.currentUser) return {};
          const newName = newUserData.name;
          const oldName = state.currentUser.name;
          let newAvatar = state.currentUser.avatar;

          // İsim değiştiyse avatarı yeniden oluştur
          if (newName && newName !== oldName) {
            newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(newName)}&background=6d28d9&color=fff&size=160`;
          }

          return {
            currentUser: { ...state.currentUser, ...newUserData, avatar: newAvatar },
          };
        });
      },
      
      registerUser: (userData) => {
        const { users } = get();
        if (users.some(u => u.email === userData.email)) {
          return false; // User already exists
        }
        
        const newAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          userData.name
        )}&background=6d28d9&color=fff&size=160`;
        
        const newUser: User = {
          ...userData,
          avatar: newAvatar,
          bio: 'Yeni üye! Henüz bir biyografi eklemedi.',
          instagram: '',
          twitter: '',
        };
        
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
        }));
        
        return true;
      },

      loginUser: (credentials) => {
        const { users } = get();
        const user = users.find(u => u.email === credentials.email);
        
        if (user && user.password === credentials.password) {
          set({ currentUser: user });
          return true;
        }
        
        return false;
      },

      logoutUser: () => {
        set({ currentUser: null, joinedAdIds: [] });
      },
      
      setTheme: (theme) => {
        set({ theme });
      },
    }),
    {
      name: 'gelengelir-storage', // local storage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentUser: state.currentUser,
        joinedAdIds: state.joinedAdIds,
        theme: state.theme,
        users: state.users, // persist users as well
      }),
    }
  )
);