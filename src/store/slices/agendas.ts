import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Agenda } from '@/common/types';

const initialState: Agenda[] = [];

export const agendasSlice = createSlice({
  name: 'agendas',
  initialState,
  reducers: {
    setAgendas: (state, action: PayloadAction<Agenda[]>) => {
      return action.payload;
    },
    updateAgenda: (state, action: PayloadAction<Agenda>) => {
      const agendas = state.slice();
      return agendas.map(agenda => {
        if (agenda._id === action.payload._id) {
          return action.payload;
        }
      });
    },
    deleteAgenda: (state, action: PayloadAction<Agenda>) => {
      const agendas = state.slice();
      return agendas.filter(agenda => {
        return agenda._id !== action.payload._id;
      });
    },
  },
});

export const { setAgendas, updateAgenda, deleteAgenda } = agendasSlice.actions;

export default agendasSlice.reducer;
