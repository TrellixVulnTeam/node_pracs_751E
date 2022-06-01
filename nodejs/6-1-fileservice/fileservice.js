/* setup start */
const {access} = require("fs/promises");
const {constants} = require("fs");
/* setup end */

/* Your code start */
function checkfile(pathName) {
	return access(pathName, constants.R_OK)
}


/* Your code end */

/* OUTPUT
*/


module.exports.checkfile = checkfile;

