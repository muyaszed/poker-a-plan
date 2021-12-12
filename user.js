let users = [];

function addUser({ id, name, room}) {
    console.log(id, name, room)
    if(!name || !room) {
        return {
            error: 'Username and room are required',
        }
    }

    const user = {
        id,
        name,
        room
    };

    users.push(user)

    return { user };
};

function removeUser(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1)[0]; 
}

function getUsers(room) {
    return {users: users.filter(user => user.room === room)};
}

exports.addUser = addUser;
exports.getUsers = getUsers;
exports.removeUser = removeUser;
