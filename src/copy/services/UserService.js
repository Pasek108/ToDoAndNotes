export async function getCategories() {
    const response = await fetch('/api/getCategories');
    return await response.json();
}

export async function sendCategories(data) {
    const response = await fetch('/api/sendCategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: data })
    })
    return await response.json();
}

export async function getNotes() {
    const response = await fetch('/api/getNotes');
    return await response.json();
}

export async function deleteNote(data) {
    const response = await fetch('/api/deleteNote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: data })
    })
    return await response.json();
}

export async function backupNote(data) {
    const response = await fetch('/api/backupNote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: data })
    })
    return await response.json();
}

export async function updateNoteCategories(id, chosenCategories) {
    const response = await fetch('/api/updateNoteCategories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id, chosenCategories: chosenCategories })
    })
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: data })
    })
    return await response.json();
}