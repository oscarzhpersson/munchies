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
      title: 'Cortado bar',
      open: true,
      rating: 1,
      filterIds: [],
      deliveryTime: '5-10 min',
      priceRange: '$$',
      image: {
        url: CoffeeIcon.src,
        alt: 'Cortado bar Image',
      },
    },
    {
      id: '2',
      title: 'Neta',
      open: true,
      rating: 1,
      filterIds: [],
      deliveryTime: '5-10 min',
      priceRange: '$$',
      image: {
        url: TacoIcon.src,
        alt: 'Neta Image',
      },
    },
    {
      id: '3',
      title: 'Breakfast Club',
      open: true,
      rating: 1,
      filterIds: [],
      deliveryTime: '20-25 min',
      priceRange: '$$',
      image: {
        url: BreakfastIcon.src,
        alt: 'Breakfast Club Image',
      },
    },
    {
      id: '4',
      title: "Burgers n' stuff",
      open: true,
      rating: 1,
      filterIds: [],
      deliveryTime: '25-40 min',
      priceRange: '$$',
      image: {
        url: BurgerIcon.src,
        alt: 'Burger Image',
      },
    },
    {
      id: '5',
      title: 'Fries Guys',
      open: true,
      rating: 1,
      filterIds: [],
      deliveryTime: '1 hour',
      priceRange: '$$',
      image: {
        url: FriesIcon.src,
        alt: 'Fries Guys Image',
      },
    },
    {
      id: '1',
      title: 'Cortado bar',
      open: false,
      rating: 1,
      filterIds: [],
      deliveryTime: '5-10 min',
      priceRange: '$$',
      image: {
        url: CoffeeIcon.src,
        alt: 'Cortado bar Image',
      },
    },
  ],
}
