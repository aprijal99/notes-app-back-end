let notes = require('./notes');
const { nanoid } = require('nanoid');

const getAllNotesHandler = (req, h) => ({
    status: 'success',
    data: {
        notes,
    },
});

const getNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const note = notes.filter(note => note.id == id)[0];

    if(note != undefined) {
        return {
            status: 'success',
            data: {
                note,
            },
        };
    } else {
        const res = h.response({
            status: 'fail',
            message: 'Note was not found',
        });

        res.code(404);

        return res;
    }
}

const addNoteHandler = (req, h) => {
    const { title, tags, body } = req.payload;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    notes.push({
        id, title, createdAt, updatedAt, tags, body
    })

    const isSuccess = notes.filter(note => note.id == id).length == 1;

    if(isSuccess) {
        const res = h.response({
            status: 'success',
            message: 'Note was successfully added',
            data: {
                noteId: id,
            },
        });

        res.code(201);

        return res;
    } else {
        const res = h.response({
            status: 'fail',
            message: 'Note failed to be added',
        });

        res.code(500);

        return res;
    }
}

const editNoteByIdHandler = (req, h) => {
    const { id } = req.params;
    const { title, tags, body } = req.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex(note => note.id == id);

    if(index != -1) {
        notes[index] = { ...notes[index], title, tags, body, updatedAt };

        const res = h.response({
            status: 'success',
            message: 'Note was successfully modified',
        });

        res.code(200);

        return res;
    } else {
        const res = h.response({
            status: 'fail',
            message: 'Note failed to be modified',
        });

        res.code(404);

        return res;
    }
}

const deleteNoteByIdHandler = (req, h) => {
    const { id } = req.params;

    const index = notes.findIndex(note => note.id == id);

    if(index != -1) {
        notes.splice(index, 1);

        const res = h.response({
            status: 'success',
            message: 'Note was successfully deleted',
        });

        res.code(200);

        return res;
    } else {
        const res = h.response({
            status: 'fail',
            message: 'Note failed to be deleted',
        });

        res.code(404);

        return res;
    }
}

module.exports = {
    getAllNotesHandler,
    getNoteByIdHandler,
    addNoteHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
}