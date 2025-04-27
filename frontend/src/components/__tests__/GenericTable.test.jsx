import { render, screen, fireEvent } from '@testing-library/react';
import GenericTable from '../GenericTable';

describe('GenericTable Component', () => {
  it('renders "No data available" when rows are empty', () => {
    render(<GenericTable rows={[]} />);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });

  it('renders table headers based on row keys', () => {
    const rows = [{ name: 'John', age: 30 }];
    render(<GenericTable rows={rows} />);
    expect(screen.getByText('NAME')).toBeInTheDocument();
    expect(screen.getByText('AGE')).toBeInTheDocument();
  });

  it('renders table rows based on data', () => {
    const rows = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];
    render(<GenericTable rows={rows} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('sorts rows when a column header is clicked', () => {
    const rows = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];
    render(<GenericTable rows={rows} />);

    const ageHeader = screen.getByText('AGE');
    fireEvent.click(ageHeader);

    const tableRows = screen.getAllByRole('row');
    expect(tableRows[1]).toHaveTextContent('Jane');
    expect(tableRows[2]).toHaveTextContent('John');

    fireEvent.click(ageHeader);

    expect(tableRows[1]).toHaveTextContent('John');
    expect(tableRows[2]).toHaveTextContent('Jane');
  });

  it('handles null or undefined values gracefully', () => {
    const rows = [
      { name: 'John', age: null },
      { name: 'Jane', age: undefined },
    ];
    render(<GenericTable rows={rows} />);
    expect(screen.getAllByText('-')).toHaveLength(2);
  });

  it('renders correctly with multiple columns', () => {
    const rows = [
      { name: 'John', age: 30, city: 'New York' },
      { name: 'Jane', age: 25, city: 'Los Angeles' },
    ];
    render(<GenericTable rows={rows} />);
    expect(screen.getByText('NAME')).toBeInTheDocument();
    expect(screen.getByText('AGE')).toBeInTheDocument();
    expect(screen.getByText('CITY')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('Los Angeles')).toBeInTheDocument();
  });

  it('does not sort when clicking on a non-existent column', () => {
    const rows = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];
    render(<GenericTable rows={rows} />);
    const nonExistentHeader = screen.queryByText('NON_EXISTENT');
    expect(nonExistentHeader).not.toBeInTheDocument();
  });

  it('maintains sorting state when re-rendered', () => {
    const rows = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
    ];
    const { rerender } = render(<GenericTable rows={rows} />);
    const ageHeader = screen.getByText('AGE');
    fireEvent.click(ageHeader);

    rerender(<GenericTable rows={rows} />);
    const tableRows = screen.getAllByRole('row');
    expect(tableRows[1]).toHaveTextContent('Jane');
    expect(tableRows[2]).toHaveTextContent('John');
  });

  it('renders correctly with special characters in column names', () => {
    const rows = [{ first_name: 'John', last_name: 'Doe' }];
    render(<GenericTable rows={rows} />);
    expect(screen.getByText('FIRST NAME')).toBeInTheDocument();
    expect(screen.getByText('LAST NAME')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
  });
});
