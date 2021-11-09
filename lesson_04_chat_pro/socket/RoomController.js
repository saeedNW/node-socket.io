/**
 * socket namespace room controller
 */
class RoomController {
    /**
     * rooms constractor
     * @param {string} name room actual name
     * @param {string} title room display name
     */
    constructor(name, title) {
        this.name = name;
        this.title = title;
        this.history = [];  // room message history array list
    }

    /**
     * add message method
     * @param {string} message
     */
    addMessage(message) {
        this.history.push(message); // add new message to message history array list
    }

}

module.exports = RoomController