import { render, screen } from '@testing-library/react';
import DashboardLayout from '../DashboardLayout';
import { vi } from 'vitest';

test('simple test', () => {
  expect(1 + 1).toBe(2);
  vi.mock('../SidebarMenu', () => ({
    default: vi.fn(() => <div data-testid="sidebar-menu" />),
  }));

  describe('DashboardLayou', () => {
    it('renders the AppBar with the correct title', () => {
      render(<DashboardLayout>Test Content</DashboardLayout>);
      expect(
        screen.getByText('International Debt Dashboard')
      ).toBeInTheDocument();
    });

    it('renders the Drawer with the correct title', () => {
      render(<DashboardLayout>Test Content</DashboardLayout>);
      expect(screen.getByText('MDM Demo')).toBeInTheDocument();
    });

    it('renders the SidebarMenu component', () => {
      render(<DashboardLayout>Test Content</DashboardLayout>);
      expect(screen.getByTestId('sidebar-menu')).toBeInTheDocument();
    });

    it('renders children content inside the main area', () => {
      render(
        <DashboardLayout>
          <div>Test Content</div>
        </DashboardLayout>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });
});
