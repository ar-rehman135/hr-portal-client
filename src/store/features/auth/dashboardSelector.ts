import type { AppState } from '../../rootReducer';

export const getDashboardDataSelector = (state: AppState) => state.dashboard;
