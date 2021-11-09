/**
 * socket namespace controller
 */
class NamespaceController {
    /**
     * namespace constractor
     * @param {string} title namespace title => programmming, gaming, .etc
     * @param {string} endPoint namespace end point => /programming, /gaming, .etc
     */
    constructor(title, endPoint) {
        this.title = title;
        this.endPoint = endPoint;
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