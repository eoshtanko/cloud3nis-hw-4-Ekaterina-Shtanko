import { takeEvery, put } from "@redux-saga/core/effects";
import { deleteNote, loadNotes, loadNotesFailure, loadNotesSuccess, types as t, updateNotes } from "./actions";
import * as api from "../../lib/api-client";

export default function* notesSaga() {
  yield takeEvery(t.LOAD_NOTES_REQUEST, loadNotesSaga);
  yield takeEvery(t.UPDATE_NOTE, updateNoteSaga);
  yield takeEvery(t.CREATE_NOTE, createNoteSaga);
  yield takeEvery(t.DELETE_NOTE, deleteNoteSaga);
}

function* loadNotesSaga() {
  try {
    const res = yield api.getNotes();
    const notes = res.data;
    yield put(loadNotesSuccess(notes));
  } catch (error) {
    console.log('Saga error: ' + error);
    yield put(loadNotesFailure(error.toString()));
  }
}

function* createNoteSaga(action) {
  try {
    yield api.createNote(action.note);
  } catch (error) {
    console.log('Saga error: ' + error);
  }
  yield put(loadNotes());
}

function* updateNoteSaga(action) {
  try {
    yield api.updateNote(action.note);
  } catch (error) {
    console.log('Saga error: ' + error);
  }
  yield put(loadNotes());
}

function* deleteNoteSaga(action) {
  try {
    yield api.deleteNote(action.note);
  } catch (error) {
    console.log('Saga error: ' + error);
  }
  yield put(loadNotes());
}