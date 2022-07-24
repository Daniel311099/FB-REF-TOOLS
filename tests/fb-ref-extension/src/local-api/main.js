import { connectDB } from "./database"
import { addListeners } from "./scraper"

export default main = (() => {
    connectDB()
    addUiControls()
    addListeners() // for idb side, defined in scraper.js
    return {'success': true}
})