
function getPostQuery() {
    return `SELECT * FROM db_project.posts `;
}

function getPostByIdQuery() {
    return `SELECT * FROM db_project.posts where id = ? `;
}

function addPostQuery() {
    return `INSERT INTO db_project.posts VALUES(?,?,?,?,?)`
}

function deletePostQuery() {
    return `UPDATE db_project.posts SET isActive = 0  WHERE id = ? `;
}

function updatePostQuery() {
    // return `UPDATE db_project.posts SET   WHERE id = ? `;
    return "kk";
}

export {
    getPostQuery, getPostByIdQuery, addPostQuery, deletePostQuery, updatePostQuery
}