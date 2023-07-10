import React, { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';

import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg';
import {useFetching} from '../hooks/useFetching';
import Loader from '../components/UI/Loader/Loader';

const NotePage = () => {
    const { user, loading } = useSelector(state => state.user);

    let params = useParams();
    let [note, setNote] = useState(null);
    let router = useNavigate();

    const [fetchNoteById, isLoading] = useFetching(async () => {
        if (params.id === 'new') return

        let response = await fetch(`/api/notes/${params.id}/`)
        let data = await response.json()
        setNote(data)
    })

    useEffect(() => {
        fetchNoteById()
    }, []);

    let createNote = async () => {
        const getUser = user.pk

        fetch(`/api/notes/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, user: getUser}),
        })
    }

    let updateNote = () => {
        const getUser = user.pk

        fetch(`/api/notes/${params.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...note, user: getUser})
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${params.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        navigation()
    }

    let handleSubmit = () => {
        if (params.id === 'new' && note === null) {
        } else if (params.id !== 'new' && note.body === '') {
            deleteNote()
        } else if (params.id !== 'new') {
            updateNote()
        } else if (params.id === 'new' && note.body !== '') {
            createNote()
        }
        navigation()
    }

    let handleChange = (value) => {
        setNote(note => ({ ...note, 'body': value}))
    }

    let navigation = () => {
        router('/')
    }

    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
                {params.id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}
            </div>
            {isLoading
                ? <Loader/>
                : <textarea
                    onChange={(e) => {handleChange(e.target.value)}}
                    value={note?.body}>
                  </textarea>
            }
        </div>
    )
}

export default NotePage