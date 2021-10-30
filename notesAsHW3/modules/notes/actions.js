export const types = {
    LOAD_NOTES_REQUEST: "LOAD_NOTES_REQUEST",
    LOAD_NOTES_SUCCESS: "LOAD_NOTES_SUCCESS",
    LOAD_NOTES_FAILURE: "LOAD_NOTES_FAILURE",
    CREATE_NOTE: "CREATE_NOTE",
    DELETE_NOTE: "DELETE_NOTE",
    UPDATE_NOTE: "UPDATE_NOTE",
}

export const loadNotes = () => ({ type: types.LOAD_NOTES_REQUEST });

export const loadNotesSuccess = (notes) =>
({
    type: types.LOAD_NOTES_SUCCESS,
    notes,
});

export const loadNotesFailure = (error) =>
({
    type: types.LOAD_NOTES_FAILURE,
    error,
});

export const createNote = (note) =>
({
    type: types.CREATE_NOTE,
    note,
});

export const updateNote = (note) =>
({
    type: types.UPDATE_NOTE,
    note
})

export const deleteNote = (note) =>
({
    type: types.DELETE_NOTE,
    note
})
