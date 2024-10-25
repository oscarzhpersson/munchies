import HamburgerIcon from './assets/icons/hamburger.png'
import PizzaIcon from './assets/icons/pizza.png'
import TacoIcon from './assets/icons/taco.png'
import CoffeeIcon from './assets/icons/coffee.png'
import FriesIcon from './assets/icons/fries.png'
import BurritoIcon from './assets/icons/burrito.png'
import BreakfastIcon from './assets/icons/breakfast.png'

import { Meta, StoryFn } from '@storybook/react'
import {
  FilterBadgeCarousel,
  FilterBadgeCarouselProps,
} from '@/components/filter-menu/filter-badge-carousel'

export default {
  title: 'Components/FilterBadgeCarousel',
  component: FilterBadgeCarousel,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} as Meta

const Template: StoryFn<FilterBadgeCarouselProps> = (args) => <FilterBadgeCarousel {...args} />

export const Default = Template.bind({})
Default.args = {
  filters: [
    {
      id: '1',
      name: 'Hamburgers',
      imageUrl: HamburgerIcon.src,
    },
    {
      id: '2',
      name: 'Pizza',
      imageUrl: PizzaIcon.src,
    },
    {
      id: '3',
      name: 'Taco',
      imageUrl: TacoIcon.src,
    },
    {
      id: '4',
      name: 'Coffee',
      imageUrl: CoffeeIcon.src,
    },
    {
      id: '5',
      name: 'Fries',
      imageUrl: FriesIcon.src,
    },
    {
      id: '6',
      name: 'Mexican',
      imageUrl: BurritoIcon.src,
    },
    {
      id: '7',
      name: 'Breakfast',
      imageUrl: BreakfastIcon.src,
    },
  ],
}
