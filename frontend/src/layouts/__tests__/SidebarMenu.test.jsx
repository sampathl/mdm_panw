import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import SidebarMenu from '../SidebarMenu';

describe('SidebarMenu', () => {
  it('renders the menu items correctly', () => {
    render(<SidebarMenu onMenuClick={vi.fn()} />);

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Table View')).toBeInTheDocument();
  });

  it('calls onMenuClick with "overview" when the Overview button is clicked', async () => {
    const onMenuClickMock = vi.fn();
    render(<SidebarMenu onMenuClick={onMenuClickMock} />);

    const overviewButton = screen.getByText('Overview');
    await userEvent.click(overviewButton);

    expect(onMenuClickMock).toHaveBeenCalledWith('overview');
  });

  it('calls onMenuClick with "table_view" when the Table View button is clicked', async () => {
    const onMenuClickMock = vi.fn();
    render(<SidebarMenu onMenuClick={onMenuClickMock} />);

    const tableViewButton = screen.getByText('Table View');
    await userEvent.click(tableViewButton);

    expect(onMenuClickMock).toHaveBeenCalledWith('table_view');
  });
});
