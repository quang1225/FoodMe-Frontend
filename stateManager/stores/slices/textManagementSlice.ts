import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';
import { TextManagement } from '../types/textManagement.type';

const textManagmentSlide = createSlice({
  name: 'textManagement',
  initialState: {
    texts: [],
    messages: [],
    labels: [],
    appModules: [],
    currentLang: 'en',
    textsFormation: [],
  } as TextManagement,
  reducers: {
    setTexts: (state, action: PayloadAction<any>) => ({
      ...state,
      texts: action.payload,
    }),
    setLabels: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.labels = action.payload;
      }),
    setMessages: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.messages = action.payload;
      }),
    addText: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.texts.push(action.payload);
      }),
    addLabel: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.labels.push(action.payload);
      }),
    addMessage: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.messages.push(action.payload);
      }),
    removeMessage: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        const id = action.payload;
        const index = draft.messages.findIndex(
          (message: any) => message.id === id,
        );
        draft.messages.splice(index, 1);
      }),
    removeLabel: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        const id = action.payload;
        const index = draft.labels.findIndex((label: any) => label.id === id);
        draft.labels.splice(index, 1);
      }),
    removeText: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        const id = action.payload;
        const index = draft.texts.findIndex(text => text.id === id);
        draft.texts.splice(index, 1);
      }),
    updateText: (state, action) =>
      produce(state, draft => {
        const { data } = action.payload;
        const index = draft.texts.findIndex(text => text.id === data?.id);
        draft.texts[index] = data;
      }),
    updateLabel: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        const { data } = action.payload;
        const index = draft.labels.findIndex(label => label.id === data?.id);
        draft.labels[index] = data;
      }),
    updateMessage: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        const { data } = action.payload;
        const index = draft.messages.findIndex(
          message => message.id === data?.id,
        );
        draft.messages[index] = data;
      }),
    setLang: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.currentLang = action.payload;
      }),

    setTextsFormation: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.textsFormation = action.payload;
      }),

    addTextFormation: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        draft.textsFormation.push(action.payload);
      }),

    updateTextFormation: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        const { data } = action.payload;
        const index = draft.textsFormation.findIndex(
          textFormation => textFormation.id === data?.id,
        );
        draft.textsFormation[index] = data;
      }),

    removeTextFormation: (state, action: PayloadAction<any>) =>
      produce(state, draft => {
        const id = action.payload;
        const index = draft.textsFormation.findIndex(
          textFormation => textFormation.id === id,
        );
        draft.textsFormation.splice(index, 1);
      }),
  },
});

export const {
  setTexts,
  setLabels,
  setMessages,
  addText,
  addLabel,
  addMessage,
  removeMessage,
  removeLabel,
  removeText,
  updateLabel,
  updateText,
  updateMessage,
  setLang,
  setTextsFormation,
  addTextFormation,
  updateTextFormation,
  removeTextFormation,
} = textManagmentSlide.actions;

export default textManagmentSlide;
