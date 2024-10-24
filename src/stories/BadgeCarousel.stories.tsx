import PizzaIcon from './assets/icons/pizza.png'

import { Meta, StoryFn } from '@storybook/react'
import { BadgeCarousel, BadgeCarouselProps } from '@/components/badge-carousel/badge-carousel'

export default {
  title: 'Components/BadgeCarousel',
  Component: BadgeCarousel,
} as Meta

const Template: StoryFn<BadgeCarouselProps> = (args) => <BadgeCarousel {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Pizza',
  active: false,
  image: {
    url: PizzaIcon.src,
    alt: 'Badge 1 Alt',
  },
}
