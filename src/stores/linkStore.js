import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useLinkStore = create(
  persist(
    (set) => ({
      links: [],
      loading: false,
      error: null,
      
      // Add a new link
      addLink: (link) => set((state) => ({
        links: [...state.links, { ...link, id: Date.now(), clicks: 0 }]
      })),
      
      // Update a link
      updateLink: (id, updatedLink) => set((state) => ({
        links: state.links.map((link) =>
          link.id === id ? { ...link, ...updatedLink } : link
        )
      })),
      
      // Delete a link
      deleteLink: (id) => set((state) => ({
        links: state.links.filter((link) => link.id !== id)
      })),
      
      // Reorder links
      reorderLinks: (newOrder) => set({ links: newOrder }),
      
      // Track link click
      trackClick: (id) => set((state) => ({
        links: state.links.map((link) =>
          link.id === id ? { ...link, clicks: link.clicks + 1 } : link
        )
      })),
      
      // Set loading state
      setLoading: (loading) => set({ loading }),
      
      // Set error state
      setError: (error) => set({ error }),
    }),
    {
      name: 'link-storage',
    }
  )
);

export default useLinkStore; 