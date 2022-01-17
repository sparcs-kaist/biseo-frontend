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
    addAgendas: (state, action: PayloadAction<Agenda>) => {
      if (state.filter(agenda => agenda._id == action.payload._id).length > 0) {
        return state;
      } else {
        return [action.payload, ...state];
      }
    },
    updateAgenda: (state, action: PayloadAction<Agenda>) => {
      const agendas = state.slice();
      return agendas.map(agenda => {
        if (agenda._id === action.payload._id) return action.payload;
        else return agenda;
      });
    },
    deleteAgenda: (state, action: PayloadAction<string>) => {
      const agendas = state.slice();
      return agendas.filter(agenda => {
        return agenda._id !== action.payload;
      });
    },
  },
});

export const {
  setAgendas,
  addAgendas,
  updateAgenda,
  deleteAgenda,
} = agendasSlice.actions;

export default agendasSlice.reducer;
