let users = [];

function addUser({ id, name, room}) {
    if(!name || !room) {
        return {
            error: 'Username and room are required',
        }
    }

    const user = {
        id,
        name,
        room,
        selection: null,
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

function updateUser(id, userSelection) {
    users = users.map(user => user.id === id ? {
        ...user,
        selection: userSelection,
    } : user);
}

exports.addUser = addUser;
exports.getUsers = getUsers;
exports.removeUser = removeUser;
exports.updateUser = updateUser;
