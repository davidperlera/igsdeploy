import Card from 'models/Card';
import MockEntity from 'mocks/MockEntity'
import MockCategory from 'mocks/MockCategory'
import CardStatus from 'enums/CardStatus'

const MockCard: Card = {
    ...MockEntity,
    categories: [MockCategory],
    description: 'Mock desc.',
    order: 1,
    status: CardStatus.TO_DO,
    title: 'Mock title',
}

export default MockCard;