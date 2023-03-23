
import {test, expect} from 'vitest'
import SignUp from "./SignUp"
import {render, screen} from "@testing-library/react"
import user from '@testing-library/user-event'

describe ("SignUp", () => {
//const onSubmit = jest.fn();


    test("handleSubmit", () => {
        render(<SignUp />);
        const linkElement = screen.getByText(/Hello World/i)
        expect(linkElement).toBeInTheDocument();
    });

    test("A", ()=> {

        //const institutions = screen.getByRole('combobox', {name:/select institution/i})
        //user.selectOptions(institutions, within(institutions).getByRole('option', {name:"University of Kent"}))
        render(<SignUp />);
        const view0 = screen.getByText(/hello/i);
        const email = within(view0).getByRole('textbox');
        user.type(email, "test@test.com")
    
        const view1 = screen.getByText(/first name/i);
        const firstname = within(view1).getByRole('textbox');
        user.type(firstname, "Hathan")

        const view2 = screen.getByText(/last name/i);    
        const lastname = within(view2).getByRole('textbox');
        user.type(lastname, "Khatkar")

        const view3 = screen.getByPlaceholderText(/password/i);
        const password = (within(view3).getByRole("textbox")).toHaveAttribute("type", "password");
        user.type(password, "test12345!")

        const view4 = screen.getByP(/re\-password/i)
        const repassword = (within(view4).getByRole("textbox")).toHaveAttribute("type", "password");
        user.type(repassword, "test12345!")
    

        const submit = screen.getByRole("button", {name: /create account/i })
        user.click(submit)

        awaitFor(() =>{
        expect(onSubmit).toHaveBeenCalledTimes(1);
    })

    expect(onSubmit).toHaveBeenCalledWith({

        "institutions": "University of Kent",
        "firstname" : "Hathan",
        "lastname" : "Khatkar",
        "password" : "test12345!",
        "repassword" : "test12345!"
    })
    })

})