import type { Preview } from '@storybook/react-vite'
// Tailwind + shadcn theme + DS tokens (primitives / semantics / typography) + Inter
import '../src/index.css'
import { TooltipProvider } from '../src/components/ui/tooltip'

const preview: Preview = {
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Foundation', ['Primitives', 'Semantic', 'Typography'], 'Components', 'M&A', 'Sandboxes'],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
