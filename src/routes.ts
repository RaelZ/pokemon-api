import { auth } from './routes/auth';
import { role } from './routes/rolesRoute';
import { user } from './routes/userRoute';

export const routes = [auth, role, user];
