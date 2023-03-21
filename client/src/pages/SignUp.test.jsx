import {test, expect} from 'vitest'
import SignUp from "./SignUp"
import {render, screen} from "@testing-library/react"


test("handleSubmit", () => {
    render(<SignUp />);
    const linkElement = screen.getByText(/Hello World/i)
    expect(linkElement).toBeInTheDocument();
});