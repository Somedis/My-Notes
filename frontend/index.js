const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config();

const loginRoute = require('./routes/auth/login');
const logoutRoute = require('./routes/auth/logout');
const meRoute = require('./routes/auth/me');
const verifyRoute = require('./routes/auth/verify');
const registerRoute = require('./routes/auth/register');

const getNotesRouter = require('./routes/notes/getNotes');
const createNoteRouter = require('./routes/notes/createNote');
const getNoteRouter = require('./routes/notes/getNote');
const deleteNoteRouter = require('./routes/notes/deleteNote');
const updateNoteRouter = require('./routes/notes/updateNote');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(loginRoute);
app.use(logoutRoute);
app.use(meRoute);
app.use(verifyRoute);
app.use(registerRoute);

app.use(getNotesRouter);
app.use(createNoteRouter);
app.use(getNoteRouter);
app.use(deleteNoteRouter);
app.use(updateNoteRouter);


app.use(express.static('client/build'));
app.get('*', (req, res) => {
	return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));