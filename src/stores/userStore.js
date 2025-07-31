import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialProfile = {
  slug: '',
  title: '',
  bio: '',
  profileImage: '',
  links: [],
  template: {
    backgroundColor: '',
    font: '',
    buttonStyle: '',
    textColor: '',
    backgroundImageUrl: '',
    titlePlacement: '',
    bioPlacement: '',
  },
};

const useUserStore = create(
  persist(
    (set) => ({
      userProfile: initialProfile,
      accessToken: '',
      refreshToken: '',
      isAuthenticated: false,
      theme: 'light',
      selectedPlanId: '',
      selectedTemplate: '',

      // Actions
      setUserProfile: (updates) =>
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            ...updates,
          },
        })),

      updateNested: (path, value) =>
        set((state) => {
          const keys = path.split('.');
          const newProfile = structuredClone
            ? structuredClone(state.userProfile)
            : JSON.parse(JSON.stringify(state.userProfile));

          let current = newProfile;
          for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current)) current[key] = {};
            current[key] = { ...current[key] };
            current = current[key];
          }
          current[keys[keys.length - 1]] = value;

          return { userProfile: newProfile };
        }),

      setAccessToken: (token) => set({ accessToken: token }),
      setRefreshToken: (token) => set({ refreshToken: token }),
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      setTheme: (theme) => set({ theme }),

      setSelectedPlanId: (planId) => set({ selectedPlanId: planId }),
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      
      resetAll: () =>
        set({
          userProfile: initialProfile,
          accessToken: '',
          refreshToken: '',
          isAuthenticated: false,
          theme: 'light',
          selectedPlanId: '',
          selectedTemplate: '',
        }),
    }),
    {
      name: 'data',
      partialize: (state) => ({
        userProfile: state.userProfile,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        selectedPlanId: state.selectedPlanId,
        selectedTemplate: state.selectedTemplate,
      }),
    }
  )
);

export default useUserStore;

export const getAccessToken = () => useUserStore.getState().accessToken;
