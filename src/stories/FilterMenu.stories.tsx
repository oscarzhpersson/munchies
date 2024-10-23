import { Meta, StoryFn } from '@storybook/react'
import { FilterMenu, FilterMenuProps } from '@/components/filter-menu'

export default {
  title: 'Components/FilterMenu',
  component: FilterMenu,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className="lg:w-[239px] lg:h-[764px]">
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: StoryFn<FilterMenuProps> = (args) => <FilterMenu {...args} />

export const Default = Template.bind({})
Default.args = {
  activeFilters: [],
  filters: [
    {
      id: '1',
      name: 'Hamburgers',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Pizza',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Taco',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      name: 'Coffee',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '5',
      name: 'Fries',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '6',
      name: 'Mexican',
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: '7',
      name: 'Breakfast',
      imageUrl: 'https://via.placeholder.com/150',
    },
  ],
  deliveryTimeRanges: {
    ranges: [
      {
        upper: 5,
        lower: 10,
        label: '5-10 min',
      },
      {
        upper: 10,
        lower: 15,
        label: '10-15 min',
      },
      {
        upper: 15,
        lower: 20,
        label: '15-20 min',
      },
      {
        upper: 20,
        lower: 25,
        label: '20-25 min',
      },
      {
        upper: 25,
        lower: 30,
        label: '25-30 min',
      },
    ],
    upperFallback: '30+ min',
    lowerFallback: '5-10 min',
  },
  priceRanges: ['$', '$$', '$$$', '$$$$'],
}
