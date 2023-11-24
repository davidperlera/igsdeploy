import Colors from 'enums/Colors';
import Entity from './Entity';
import User from './Users';

interface Category extends Entity {
  name: string;
  color: Colors;
  owner: User;
};

export default Category;
