import Category from 'models/Category'
import MockEntity from 'mocks/MockEntity'
import Colors from 'enums/Colors'
import MockUser from './MockUser';

const MockCategory: Category = {
    ...MockEntity,
    name: 'Mock Category',
    color: Colors.GREEN,
    owner: MockUser,
}

export default MockCategory;