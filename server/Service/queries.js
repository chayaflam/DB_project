
function getQuery(table) {
    switch (table) {
        case 'users':
            return `SELECT * FROM db_project.${table}`;
        case 'posts':
            return `SELECT  * FROM db_project.${table} WHERE  isActive != 0 LIMIT ? `
        default:
            return `SELECT * FROM db_project.${table} WHERE  isActive != 0`
    }
}

function getByUsernameQuery(table) {
    return `SELECT * FROM db_project.${table} WHERE userName = ? `;
}

function getByParamQuery(table, param) {
    return table == 'todos' ?
        `SELECT * FROM db_project.${table} WHERE userId = ? && isActive != 0 ORDER BY ${param} ` :
        `SELECT * FROM db_project.${table} WHERE ${param} = ? && isActive != 0 `
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
    getQuery, getByUsernameQuery, getByParamQuery, addQuery, deleteQuery, updateQuery
}