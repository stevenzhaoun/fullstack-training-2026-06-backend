import { Router } from 'express';
import { createRole, listRoles } from '../controllers/roles';
import { authorization } from '../middlewares/authorization';
import { PERMISSIONS } from '../constants';

const router = Router();

router.post('/roles', authorization(PERMISSIONS.ROLES.EDIT), createRole)
router.get('/roles', authorization(PERMISSIONS.ROLES.READ), listRoles)

export default router