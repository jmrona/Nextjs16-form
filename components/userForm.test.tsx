import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from 'vitest-browser-react'
import UserForm from "./UserForm";
import { userEvent } from "vitest/browser";

vi.mock('@/actions', () => {
  return {
    actions: {
      users: {
        submitUser: vi.fn().mockResolvedValue({
          errors: {},
          data: {
            fullname: "",
            age: "",
            country: "",
            interests: [] as string[],
          }
        } as any),
      },
    },
  };
});

vi.mock('@/actions/users', () => {
  return {
    submitUser: vi.fn().mockResolvedValue({
      errors: {},
      data: {
        fullname: "",
        age: "",
        country: "",
        interests: [] as string[],
      }
    } as any),
  };
});

vi.mock('next/navigation', () => {
  return {
    redirect: vi.fn(),
  };
});

describe("UserForm Component", () => {
  beforeEach(async () => {
    const { actions } = await import('@/actions');
    vi.mocked(actions.users.submitUser).mockClear();
    vi.mocked(actions.users.submitUser).mockResolvedValue({
      errors: {},
      data: {
        fullname: "",
        age: "",
        country: "",
        interests: [] as string[],
      }
    } as any);
  });

  it("should render all form fields correctly", async () => {
    const screen = await render(<UserForm interests={{ music: "Music", sports: "Sports" }} />);

    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByLabelText('Age')).toBeInTheDocument();
    expect(screen.getByLabelText('Country')).toBeInTheDocument();
    expect(screen.getByText('Select your interests')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('should render interest checkboxes from props', async () => {
    const screen = await render(<UserForm interests={{ music: "Music", sports: "Sports", tech: "Technology" }} />);

    expect(screen.getByLabelText('Music')).toBeInTheDocument();
    expect(screen.getByLabelText('Sports')).toBeInTheDocument();
    expect(screen.getByLabelText('Technology')).toBeInTheDocument();
  });

  it('should allow filling out all form fields', async () => {
    const screen = await render(<UserForm interests={{ music: "Music", sports: "Sports" }} />);

    const fullnameInput = screen.getByLabelText('Full name');
    await userEvent.fill(fullnameInput, 'John Doe');
    expect(fullnameInput).toHaveValue('John Doe');

    const ageInput = screen.getByLabelText('Age');
    await userEvent.fill(ageInput, '30');
    expect(ageInput).toHaveValue(30);

    const countrySelect = screen.getByLabelText('Country');
    await userEvent.selectOptions(countrySelect, 'us');
    expect(countrySelect).toHaveValue('us');

    const musicCheckbox = screen.getByLabelText('Music');
    await userEvent.click(musicCheckbox);
    expect(musicCheckbox).toBeChecked();
  });

  it('should call submitUser action on form submission', async () => {
    const screen = await render(<UserForm interests={{ music: "Music", sports: "Sports" }} />);

    const fullnameInput = screen.getByLabelText('Full name');
    await userEvent.fill(fullnameInput, 'John Doe');

    const ageInput = screen.getByLabelText('Age');
    await userEvent.fill(ageInput, '30');

    const countrySelect = screen.getByLabelText('Country');
    await userEvent.selectOptions(countrySelect, 'us');

    const musicCheckbox = screen.getByLabelText('Music');
    await userEvent.click(musicCheckbox);

    const submitButton = screen.getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    const { actions } = await import('@/actions');

    await vi.waitFor(() => {
      expect(actions.users.submitUser).toHaveBeenCalledOnce();
    });

    const callArgs = vi.mocked(actions.users.submitUser).mock.calls[0];
    const formData = callArgs[1] as FormData;

    expect(formData.get('fullname')).toBe('John Doe');
    expect(formData.get('age')).toBe('30');
    expect(formData.get('country')).toBe('us');
    expect(formData.getAll('interests')).toEqual(['music']);
  });
});