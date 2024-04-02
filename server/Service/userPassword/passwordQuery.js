function getPasswordQuery() {
    return `SELECT count(*) from db_project.userpasswords where userId=? AND password=?`;
}

function addPasswordQuery() {
    return `INSERT INTO db_project.userpasswords VALUES(NULL, ?, ?)`
}

function updatePasswordQuery(table, objectKeys) {
    let stringToQuery = "";
    objectKeys.forEach(key => { stringToQuery += key += "=?," });
    stringToQuery = stringToQuery.slice(0, -1);
    return `UPDATE db_project.${table} SET ${stringToQuery}  WHERE id = ?`;
}

export {getPasswordQuery, addPasswordQuery, updatePasswordQuery };