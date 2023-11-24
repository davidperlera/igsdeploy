import Entity from './Entity';

interface User extends Entity {
  username: string;
  email: string;
  avatar: string;
};

export default User;