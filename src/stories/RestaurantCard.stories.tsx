import TacoIcon from './assets/icons/taco.png'

import { Meta, StoryFn } from '@storybook/react'
import RestaurantCard, { RestaurantCardProps } from '@/components/restaurant-grid/restaurant-card'

export default {
  title: 'Components/RestaurantCard',
  component: RestaurantCard,
} as Meta

const Template: StoryFn<RestaurantCardProps> = (args) => <RestaurantCard {...args} />

export const Default = Template.bind({})
Default.args = {
  id: '1',
  title: 'Restaurant Title',
  open: true,
  rating: 1,
  filterIds: [],
  deliveryTime: '5-10 min',
  priceRange: '$$',
  image: {
    url: TacoIcon.src,
    alt: 'Restaurant Image',
  },
}
