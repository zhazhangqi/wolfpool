var bodyParser = require('body-parser');

var UserController = require('./controllers/UserController');
var PlanController = require('./controllers/PlanController');

// Routes
module.exports = function(app){
	app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

	// General routes
  app.get('/', function(req, res){
  		res.render('home');
	});
	app.get('/about', function(req, res){
  		res.render('about');
	});

	// Routes related to Plan
	app.get('/create_search_plan_page', function(req, res){
		if (req.session && req.session.userId) {
			res.render('create_search_plan_page');
		} else {
			res.send('You must be logged in to view this page.');
		}
	});
  app.post('/savePlan',PlanController.savePlan);
  app.get('/search_plan_page', function(req, res){
		res.render('search_plan_page');
	});
  app.post('/searchPlan',PlanController.searchPlan);
  app.get('/contact', function(req, res){
		res.render('contact', { csrf: 'CSRF token here'});
	});
	app.get('/search_plan_page', function(req, res){
		res.render('search_plan_page');
	});

	// Routes related to User
	app.get('/profile_page', function(req, res){
		res.render('profile_page');
		//res.render('profile_page',{success:false, errors: req.session.errors});
		//req.session.errors=null;
	});
	app.post('/profile_page', function(req, res){
		res.redirect('/profile_page');
	});
	app.get('/register_page', function(req, res){
			res.render('register');
	});
	app.get('/verify_user/:email/:verfhash', UserController.verifyUser);
	app.post('/createUser', UserController.createUser);
	app.get('/login_page', function(req, res){
			res.render('login');
	});
	app.post('/loginUser', UserController.loginUser);
	app.get('/logout_page', UserController.logoutUser)
};