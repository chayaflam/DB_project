
function getUserQuery() {
    return `SELECT * FROM db_project.users `;
}

function getUserByIdQuery() {
    return `SELECT * FROM db_project.users where id = ? `;
}

function addUserQuery() {
    return `INSERT INTO db_project.users VALUES(?, ? ,? ,? ,? ,? ,?)`
}

function deleteUserQuery() {
    return `UPDATE db_project.users SET isActive = 0  WHERE id = ? `;
}


function updateUserQuery() {
    return `UPDATE db_project.users SET id=?, name = ?,username = ?, email= ?, address= ?, phone = ?, isActive=?  WHERE id = ?`;
}

export {
    getUserQuery, getUserByIdQuery, addUserQuery, deleteUserQuery, updateUserQuery
}