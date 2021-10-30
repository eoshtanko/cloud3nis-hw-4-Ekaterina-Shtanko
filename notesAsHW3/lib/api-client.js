import { doFetch } from './do-fetch';

export function* getNotes() {
  try {
    const requestParams = {
      method: 'GET',
      url: '/notes',
    };
    return yield doFetch(requestParams);
  } catch (error) {
    console.log('Api error: ' + error);
    return error;
  }
}

export function* createNote(note) {
  try {
    const requestParams = {
      method: 'POST',
      url: '/notes',
      data: note,
    };
    return yield doFetch(requestParams);
  } catch (error) {
    console.log('Api error: ' + error);
    return error;
  }
}

export function* deleteNote(note) {
  try {
    const requestParams = {
      method: 'DELETE',
      url: `/notes/${note.id}`,
    };
    return yield doFetch(requestParams);
  } catch (error) {
    console.log('Api error: ' + error);
    return error;
  }
}

export function* updateNote(note) {
  try {
    const requestParams = {
      method: 'PATCH',
      url: `/notes/${note.id}`,
      data: {
        title: note.title,
        content: note.content,
        image: note.image,
      },
    };
    return yield doFetch(requestParams);
  } catch (error) {
    console.log('Api error: ' + error);
    return error;
  }
}
