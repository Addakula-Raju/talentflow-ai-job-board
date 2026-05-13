import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { JOBS, USER_PROFILE } from '@/data/jobs';

// TalentFlow job management
export const useJobStore = create(
  devtools(
    persist(
      (set, get) => ({
        jobs: JOBS,
        savedJobIds: [],
        appliedJobIds: USER_PROFILE.appliedJobs,
        filters: {
          search: '',
          type: [],
          remote: [],
          salary: [0, 400000],
          experience: [],
          tags: [],
          department: [],
        },
        sortBy: 'relevance',
        viewMode: 'grid',

        // ── Actions ──
        toggleSaveJob: (jobId) => {
          const { savedJobIds } = get();
          const next = savedJobIds.includes(jobId)
            ? savedJobIds.filter(id => id !== jobId)
            : [...savedJobIds, jobId];
          set({ savedJobIds: next }, false, 'toggleSaveJob');
        },

        applyToJob: (jobId) => {
          const { appliedJobIds } = get();
          if (!appliedJobIds.includes(jobId)) {
            set({ appliedJobIds: [...appliedJobIds, jobId] }, false, 'applyToJob');
          }
        },

        setFilter: (key, value) => {
          set(state => ({
            filters: { ...state.filters, [key]: value }
          }), false, `setFilter/${key}`);
        },

        resetFilters: () => set({
          filters: {
            search: '', type: [], remote: [], salary: [0, 400000],
            experience: [], tags: [], department: [],
          }
        }, false, 'resetFilters'),

        setSortBy: (sortBy) => set({ sortBy }, false, 'setSortBy'),
        setViewMode: (viewMode) => set({ viewMode }, false, 'setViewMode'),

        // ── Derived ──
        getFilteredJobs: () => {
          const { jobs, filters, sortBy, savedJobIds } = get();
          let result = jobs.map(j => ({
            ...j,
            saved: savedJobIds.includes(j.id),
          }));

          if (filters.search) {
            const q = filters.search.toLowerCase();
            result = result.filter(j =>
              j.title.toLowerCase().includes(q) ||
              j.company.toLowerCase().includes(q) ||
              j.tags.some(t => t.toLowerCase().includes(q)) ||
              j.department.toLowerCase().includes(q)
            );
          }
          if (filters.type.length)       result = result.filter(j => filters.type.includes(j.type));
          if (filters.remote.length)     result = result.filter(j => filters.remote.includes(j.remote));
          if (filters.department.length) result = result.filter(j => filters.department.includes(j.department));
          if (filters.tags.length)       result = result.filter(j => filters.tags.some(t => j.tags.includes(t)));

          result = result.filter(j =>
            j.salary.min >= filters.salary[0] && j.salary.max <= filters.salary[1]
          );

          switch (sortBy) {
            case 'match':   result.sort((a, b) => b.aiMatchScore - a.aiMatchScore); break;
            case 'salary':  result.sort((a, b) => b.salary.max - a.salary.max); break;
            case 'newest':  result.sort((a, b) => new Date(b.posted) - new Date(a.posted)); break;
            case 'popular': result.sort((a, b) => b.views - a.views); break;
            default:        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
          }

          return result;
        },

        getSavedJobs: () => {
          const { jobs, savedJobIds } = get();
          return jobs.filter(j => savedJobIds.includes(j.id)).map(j => ({ ...j, saved: true }));
        },

        getJobById: (id) => {
          const { jobs, savedJobIds } = get();
          const job = jobs.find(j => j.id === id);
          return job ? { ...job, saved: savedJobIds.includes(id) } : null;
        },
      }),
      { name: 'talentflow-jobs', partialize: (state) => ({ savedJobIds: state.savedJobIds, appliedJobIds: state.appliedJobIds }) }
    )
  )
);

// TalentFlow UI preferences
export const useUIStore = create(
  devtools(
    persist(
      (set) => ({
        theme: 'dark',
        sidebarOpen: false,
        aiPanelOpen: false,
        onboardingComplete: false,

        toggleTheme: () => set(state => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          document.documentElement.classList.toggle('dark', next === 'dark');
          return { theme: next };
        }, false, 'toggleTheme'),

        setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'setSidebarOpen'),
        toggleSidebar: () => set(state => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar'),
        setAiPanelOpen: (open) => set({ aiPanelOpen: open }, false, 'setAiPanelOpen'),
        completeOnboarding: () => set({ onboardingComplete: true }, false, 'completeOnboarding'),
      }),
      { name: 'talentflow-ui', partialize: (s) => ({ theme: s.theme, onboardingComplete: s.onboardingComplete }) }
    )
  )
);

// User profile management

export const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        profile: USER_PROFILE,
        updateProfile: (updates) => set(state => ({
          profile: { ...state.profile, ...updates }
        }), false, 'updateProfile'),
      }),
      { name: 'talentflow-user' }
    )
  )
);
