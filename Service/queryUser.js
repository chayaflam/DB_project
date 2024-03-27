
function getUserQuery() {
    const query = `SELECT * FROM db_project.users `;
    return query
}

function getUserByIdQuery() {
    const query = `SELECT * FROM db_project.users where id = ? `;
    return query;
}


function postUserQuery(user) {
    const query = `INSERT INTO db_project.users VALUES(${user.id} ," ${(user.name)}"," ${user.username}","${user.email}","${user.address}","${user.phone}")`
    return query;
}

export {
    getUserQuery, getUserByIdQuery, postUserQuery
}