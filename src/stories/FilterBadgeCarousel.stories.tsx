import HamburgerIcon from './assets/icons/hamburger.png'
import PizzaIcon from './assets/icons/pizza.png'
import TacoIcon from './assets/icons/taco.png'
import CoffeeIcon from './assets/icons/coffee.png'
import FriesIcon from './assets/icons/fries.png'
import BurritoIcon from './assets/icons/burrito.png'
import BreakfastIcon from './assets/icons/breakfast.png'

import { Meta, StoryFn } from '@storybook/react'
import { FilterBadgeCarousel, FilterBadgeCarouselProps } from '@/components/filter-badge-carousel'

export default {
  title: 'Components/FilterBadgeCarousel',
  component: FilterBadgeCarousel,
} as Meta

const Template: StoryFn<FilterBadgeCarouselProps> = (args) => <FilterBadgeCarousel {...args} />

export const Default = Template.bind({})
Default.args = {
  badges: [
    {
      id: '1',
      title: 'Hamburgers',
      image: {
        id: '1',
        url: HamburgerIcon.src,
        alt: 'hamburger',
      },
    },
    {
      id: '2',
      title: 'Pizza',
      image: {
        id: '2',
        url: PizzaIcon.src,
        alt: 'pizza',
      },
    },
    {
      id: '3',
      title: 'Taco',
      image: {
        id: '1',
        url: TacoIcon.src,
        alt: 'taco',
      },
    },
    {
      id: '4',
      title: 'Coffee',
      image: {
        id: '2',
        url: CoffeeIcon.src,
        alt: 'coffee',
      },
    },
    {
      id: '5',
      title: 'Fries',
      image: {
        id: '1',
        url: FriesIcon.src,
        alt: 'fries',
      },
    },
    {
      id: '6',
      title: 'Mexican',
      image: {
        id: '2',
        url: BurritoIcon.src,
        alt: 'burrito',
      },
    },
    {
      id: '7',
      title: 'Breakfast',
      image: {
        id: '1',
        url: BreakfastIcon.src,
        alt: 'breakfast',
      },
    },
  ],
}
