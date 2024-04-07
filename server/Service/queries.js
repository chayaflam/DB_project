
function getQuery(table) {
    return table == 'users' ? `SELECT * FROM db_project.${table}   `
        : `SELECT * FROM db_project.${table} where  isActive!=0`;
}

function getByUsernameQuery(table) {
    return `SELECT * FROM db_project.${table} where userName = ? `;
}

function getByParamQuery(table, param) {
    return `SELECT * FROM db_project.${table} where ${param} = ? && isActive!=0`;
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