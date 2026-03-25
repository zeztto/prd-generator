import { create } from 'zustand';

type Workspace = 'editor' | 'preview' | 'review';

interface UIState {
  sidebarOpen: boolean;
  previewPanelOpen: boolean;
  guidePanelOpen: boolean;
  mobileMenuOpen: boolean;
  activeWorkspace: Workspace;
}

interface UIActions {
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  togglePreviewPanel: () => void;
  setPreviewPanelOpen: (open: boolean) => void;
  toggleGuidePanel: () => void;
  setGuidePanelOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  setActiveWorkspace: (workspace: Workspace) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()((set) => ({
  sidebarOpen: true,
  previewPanelOpen: false,
  guidePanelOpen: false,
  mobileMenuOpen: false,
  activeWorkspace: 'editor',

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  togglePreviewPanel: () => set((state) => ({ previewPanelOpen: !state.previewPanelOpen })),
  setPreviewPanelOpen: (open) => set({ previewPanelOpen: open }),

  toggleGuidePanel: () => set((state) => ({ guidePanelOpen: !state.guidePanelOpen })),
  setGuidePanelOpen: (open) => set({ guidePanelOpen: open }),

  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
}));
