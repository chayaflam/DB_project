
function getQuery(table) {
    return `SELECT * FROM db_project.${table}`;
}

function getByIdQuery(table) {
    return `SELECT * FROM db_project.${table} where id = ? `;
}

function addQuery(table, len) {
    return `INSERT INTO db_project.${table} VALUES(${len})`
}

function deleteQuery(table) {
    return `UPDATE db_project.${table} SET isActive = 0  WHERE id = ? `;
}

function updateQuery(table, objectKeys) {
    let stringToQuery = "";
    objectKeys.forEach(key => { stringToQuery += key += "=?," });
    stringToQuery= stringToQuery.slice(0, -1);
    return `UPDATE db_project.${table} SET ${stringToQuery}  WHERE id = ?`;
}

export {
    getQuery, getByIdQuery, addQuery, deleteQuery, updateQuery
}