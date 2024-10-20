import Logo from './assets/logos/logo_white.svg'

import { Meta, StoryFn } from '@storybook/react'
import { AppOverlay, AppOverlayProps } from '@/components/app-overlay'

export default {
  title: 'Site-wide/AppOverlay',
  Component: AppOverlay,
  decorators: [
    (Story) => (
      <div className="w-[375px] h-[812px]">
        <Story />
      </div>
    ),
  ],
} as Meta

const Template: StoryFn<AppOverlayProps> = (args) => <AppOverlay {...args} />

export const Default = Template.bind({})
Default.args = {
  className: '',
  overlay: {
    title: 'Treat yourself.',
    description: 'Find the best restaurants in your city and get it delivered to your place!',
    buttonText: 'Continue',
    logo: {
      url: Logo.src,
    },
  },
}
