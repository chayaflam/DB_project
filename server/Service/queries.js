
function getQuery(table) {
    return `SELECT * FROM db_project.${table}`;
}

function getByUsernameQuery(table) {
    return `SELECT * FROM db_project.${table} where username = ? `;
}

function getByIdQuery(table) {
    return `SELECT * FROM db_project.${table} where id = ? `;
}


function addQuery(table, values) {
    return `INSERT INTO db_project.${table} VALUES(${values})`
}

function deleteQuery(table) {
    return `UPDATE db_project.${table} SET isActive = 0  WHERE id = ? `;
}

function updateQuery(table, objectKeys) {
    let stringToQuery = "";
    objectKeys.forEach(key => { stringToQuery += key += "= ?," });
    stringToQuery = stringToQuery.slice(0, -1);
    return `UPDATE db_project.${table} SET ${stringToQuery}  WHERE id = ?`;
}

export {
    getQuery, getByUsernameQuery, getByIdQuery, addQuery, deleteQuery, updateQuery
}