import { types as t } from "./actions";

const initialState = {
    notes: [],
    isLoaded: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case t.LOAD_NOTES_SUCCESS: {
            const { notes } = action;
            return {
                notes: notes,
                isLoaded: true,
            }
        }
        case t.LOAD_NOTES_FAILURE: {
            const { error } = action;
            console.log('Reducer: Failed to load ' + error);
            return state;
        }
        case t.CREATE_NOTE: {
            return { ...state };
        }
        case t.DELETE_NOTE: {
            const { note } = action
            const notes = state.notes
            const newNotes = notes.filter((n) => n.id !== note.id)
            return { ...state, notes: newNotes };
        }
        case t.UPDATE_NOTE: {
            const { note } = action
            const notes = state.notes
            const id = notes.findIndex((n) => n.id === note.id);
            if (note.title) {
                notes[id].title = note.title
            }
            if (note.content) {
                notes[id].content = note.content
            }
            if (note.image) {
                notes[id].image = note.image;
            }
            return { ...state, notes: notes };
        }
        default: {
            return state;
        }
    }
}