function getPasswordQuery() {
    return `SELECT count(*) from db_project.userpasswords where userId=? AND password=?`;
}

function addPasswordQuery() {
    return `INSERT INTO db_project.userpasswords VALUES(NULL, ?, ?)`
}

function updatePasswordQuery( ) {
    return `UPDATE db_project.userpasswords SET password=?  WHERE userId = ?`;
}

export {getPasswordQuery, addPasswordQuery, updatePasswordQuery };