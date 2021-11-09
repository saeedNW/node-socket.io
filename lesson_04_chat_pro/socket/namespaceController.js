/**
 * socket namespace controller
 */
class NamespaceController {
    /**
     * namespace constractor
     * @param {string} title namespace title => programmming, gaming, .etc
     * @param {string} endpoint namespace endpoint => /programming, /gaming, .etc
     */
    constructor(title, endpoint) {
        this.title = title;
        this.endpoint = endpoint;
        this.rooms = [];    // namespace rooms array list
    }

    /**
     * add room method
     * @param {string} room room name
     */
    addRoom(room) {
        this.rooms.push(room);  // add new room to namespace rooms array list
    }
}

module.exports = NamespaceController;