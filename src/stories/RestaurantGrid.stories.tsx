import TacoIcon from './assets/icons/taco.png'
import BurgerIcon from './assets/icons/hamburger.png'
import BreakfastIcon from './assets/icons/breakfast.png'
import BurritoIcon from './assets/icons/burrito.png'
import CoffeeIcon from './assets/icons/coffee.png'
import PizzaIcon from './assets/icons/pizza.png'
import FriesIcon from './assets/icons/fries.png'

import { Meta, StoryFn } from '@storybook/react'
import { RestaurantGrid, RestaurantGridProps } from '@/components/restaurant-grid'

export default {
  title: 'Components/RestaurantGrid',
  component: RestaurantGrid,
} as Meta

const Template: StoryFn<RestaurantGridProps> = (args) => <RestaurantGrid {...args} />

export const Default = Template.bind({})
Default.args = {
  restaurants: [
    {
      id: '1',
      name: 'Cortado bar',
      openStatus: {
        is_open: true,
        restaurant_id: '1',
      },
      rating: 1,
      filterIds: [],
      deliveryTimeInMinutes: 60,
      priceRange: {
        id: '1',
        range: '$$',
      },
      imageUrl: CoffeeIcon.src,
      filters: [],
      priceRangeId: '1',
    },
    {
      id: '2',
      name: 'Neta',
      openStatus: {
        is_open: true,
        restaurant_id: '1',
      },
      rating: 1,
      filterIds: [],
      deliveryTimeInMinutes: 5,
      priceRange: {
        id: '1',
        range: '$$',
      },
      imageUrl: TacoIcon.src,
      filters: [],
      priceRangeId: '1',
    },
    {
      id: '3',
      name: 'Breakfast Club',
      openStatus: {
        is_open: true,
        restaurant_id: '1',
      },
      rating: 1,
      filterIds: [],
      deliveryTimeInMinutes: 10,
      priceRange: {
        id: '1',
        range: '$$',
      },
      imageUrl: BreakfastIcon.src,
      filters: [],
      priceRangeId: '1',
    },
    {
      id: '4',
      name: "Burgers n' stuff",
      openStatus: {
        is_open: true,
        restaurant_id: '1',
      },
      rating: 1,
      filterIds: [],
      deliveryTimeInMinutes: 5,
      priceRange: {
        id: '1',
        range: '$$',
      },
      imageUrl: BurgerIcon.src,
      filters: [],
      priceRangeId: '1',
    },
    {
      id: '5',
      name: 'Fries Guys',
      openStatus: {
        is_open: true,
        restaurant_id: '1',
      },
      rating: 1,
      filterIds: [],
      deliveryTimeInMinutes: 75,
      priceRange: {
        id: '1',
        range: '$$',
      },
      imageUrl: FriesIcon.src,
      filters: [],
      priceRangeId: '1',
    },
    {
      id: '1',
      name: 'Cortado bar',
      openStatus: {
        is_open: true,
        restaurant_id: '1',
      },
      rating: 1,
      filterIds: [],
      deliveryTimeInMinutes: 7,
      priceRange: {
        id: '1',
        range: '$$',
      },
      imageUrl: CoffeeIcon.src,
      filters: [],
      priceRangeId: '1',
    },
  ],
}
