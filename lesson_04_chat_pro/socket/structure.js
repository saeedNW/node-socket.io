/** import namespace controller */
const NamespaceController = require("./namespaceController");
/** import room controller */
const RoomController = require("./RoomController");

/** create 1st namespace */
const NS1 = new NamespaceController('عمومی', '/public');
/** create 2nd namespace */
const NS2 = new NamespaceController('برنامه نویسی', '/programming');
/** create 3rd namespace */
const NS3 = new NamespaceController('گرافیک', '/graphic');
/** create 4th namespace */
const NS4 = new NamespaceController('گیم', '/games');

/** create 1st room for namespace 1 */
NS1.addRoom(new RoomController('friends', 'دوستانه'));
/** create 2nd room for namespace 1 */
NS1.addRoom(new RoomController('coffe', 'کافه'));

/** create 1st room for namespace 2 */
NS2.addRoom(new RoomController('nodejs', 'Node.js'));
/** create 2nd room for namespace 2 */
NS2.addRoom(new RoomController('php', 'Php'));
/** create 3rd room for namespace 2 */
NS2.addRoom(new RoomController('c#', 'C#'));
/** create 4th room for namespace 2 */
NS2.addRoom(new RoomController('python', 'Python'));
/** create 5th room for namespace 2 */
NS2.addRoom(new RoomController('go', 'Go'));

/** create 1st room for namespace 3 */
NS3.addRoom(new RoomController('photoshop', 'Photoshop'));
/** create 2nd room for namespace 3 */
NS3.addRoom(new RoomController('illustrator', 'Illustrator'));
/** create 3rd room for namespace 3 */
NS3.addRoom(new RoomController('paint', 'Paint'));

/** create 1st room for namespace 4 */
NS4.addRoom(new RoomController('rdr', 'RDR'));
/** create 2nd room for namespace 4 */
NS4.addRoom(new RoomController('rdr2', 'RDR2'));
/** create 3rd room for namespace 4 */
NS4.addRoom(new RoomController('gtav', 'GTAV'));
/** create 4th room for namespace 4 */
NS4.addRoom(new RoomController('farcry', 'Farcry'));
/** create 5th room for namespace 4 */
NS4.addRoom(new RoomController('oryAndTheBlindForest', 'Ori and the Blind Forest'));
/** create 6th room for namespace 4 */
NS4.addRoom(new RoomController('oriAndTheWillOfTheWisps', 'Ori and the Will of the Wisps'));


module.exports = [NS1, NS2, NS3, NS4]