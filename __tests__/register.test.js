import Register from '../app/register/page.tsx'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/'
// import POST from '../app/api/register/route.ts'


describe("Register Route", () => {
  it("renders input fields and submit button", () => {
    render(<Register />);
    
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: 'Register'})).toBeInTheDocument();
   });

   it("shows error when form has empty fields", async () => {
    render(<Register />);

    fireEvent.click(screen.getByRole("button", { name: 'Register'}));
    await waitFor(() => {
      expect(screen.getByText("All fields are required!")).toBeInTheDocument();
    });
   });

   it("handles successful user registration", async () => {
    const mockUser = {
      firstName: "Dennis",
      lastName: "Karatas",
      email: "dennis7@gmail.com",
      password: "password1"
    };

   })
  })
