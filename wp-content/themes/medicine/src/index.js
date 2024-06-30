import "../css/style.scss"

// Our modules / classes
import MobileMenu from "./modules/MobileMenu"
import siteSearch from "./modules/siteSearch"
import NewPolicy from "./modules/newPolicy"
import BackToTop from "./modules/backTop"
import smartSearch from "./modules/smartSearch"
import Question from "./modules/Questiton"
import NewNotice from "./modules/newNotice"
import ViewingHistory from "./modules/viewingHistory"

// Instantiate a new object using our modules/classes
const mobileMenu = new MobileMenu()
const sitesearch = new siteSearch()
const newpolicy = new NewPolicy()
const backtotop = new BackToTop()
const smartsearch = new smartSearch();
const question = new Question();
const newnotice = new NewNotice();
const viewinghistory = new ViewingHistory();