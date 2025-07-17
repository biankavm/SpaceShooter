import { Router } from 'express';
import mainController from '../controllers/main';
import majorController from '../controllers/major';
import userController from '../controllers/user';
import accountController from '../controllers/account';
import checkAuth from '../middlewares/checkAuth';
import checkExists from '../middlewares/checkExists';

const router = Router();

router.get('/', checkAuth, mainController.index);
router.get('/ranking', checkAuth, mainController.ranking);
router.get('/lorem', mainController.loremIpsum);
router.get('/about', mainController.about);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get('/cookie', mainController.cookie);

// Routes Major Controller
router.get('/majors/index', majorController.index);
router.all('/majors/create', majorController.create); // cadeia de middlewares, primeiro checkAuth, depois create
router.get('/majors/read/:id', checkAuth, majorController.read);
router.all('/majors/update/:id', checkAuth, majorController.update);
router.post('/majors/destroy/:id', checkAuth, majorController.destroy);

// Routes User Controller
router.get('/users/index', checkAuth, userController.index);
router.all('/users/create', userController.create);
router.get('/users/read/:id', checkAuth, userController.read);
router.all('/users/update/:id', checkAuth, userController.update);
router.post('/users/destroy/:id', checkAuth, userController.destroy);
router.post('/users/saveScore/:score', checkAuth, userController.saveScore);

// Routes de Login
router.all('/account/login', accountController.login);
router.all('/account/logout', accountController.logout);
router.all(
  '/account/changePassword',
  checkAuth,
  accountController.changePassword
);

// 404
router.use(checkExists);

export default router;
