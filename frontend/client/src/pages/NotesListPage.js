import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import {useFetching} from '../hooks/useFetching'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'
import Loader from '../components/UI/Loader/Loader'

const NotesListPage = () => {
    const { isAuthenticated, user, loading } = useSelector(state => state.user);

    let [notes, setNotes] = useState([])

    const [fetchNoteList, isLoading, error] = useFetching(async () => {
        const getUser = await fetch('/api/users/me')
        const getUserPk = await getUser.json()

        let response = await fetch(`/api/notes/?pk=${getUserPk.pk}`)
        let data = await response.json()
        setNotes(data)
    })

    useEffect(() => {
        fetchNoteList()
    }, [])

    if (!isAuthenticated && user === null)
        return <Navigate to='login'/>;

    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Notes</h2>
                {loading || user === null ? (
                    <p className='notes-title'></p>
                ) : (
                    <p className='notes-title'>{user.login}</p>
                )}
                <p className='notes-count'>{notes.length}</p>
            </div>
            {isLoading
                ? <Loader/>
                : <div>
                    <div className='notes-list'>
                        {notes.map((note, index) => (
                            <ListItem key={index} note={note}/>
                        ))}
                    </div>
                    <AddButton />
                  </div>
            }
        </div>
    )
}

export default NotesListPage