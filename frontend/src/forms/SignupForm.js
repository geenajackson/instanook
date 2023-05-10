import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


function SignupForm({ registerUser }) {
    const INITIAL_STATE = { username: "", password: "", email: "", friendCode: "SW-" }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState(null);
    const history = useHistory();

    async function handleSubmit(evt) {
        evt.preventDefault();
        let res = await registerUser(formData);

        if (res) {
            setErrors(res.map(error => (
                <li key={error}>{error}</li>
            )));
            setFormData(INITIAL_STATE);
        }
        else history.push("/");
    };

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    };

    return (
        <div className="SignupForm">
            <h1>Register Here!</h1>
            {errors ? <p>{errors}</p> : ""}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username: </Label>
                    <Input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                    ></Input>
                    <Label htmlFor="password">Password: </Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    ></Input>
                    <Label htmlFor="email">Email: </Label>
                    <Input
                        id="email"
                        name="email"
                        type="text"
                        value={formData.email}
                        onChange={handleChange}
                    ></Input>
                    <Label htmlFor="friendCode">Friend Code: SW-XXXX-XXXX-XXXX</Label>
                    <Input
                        id="friendCode"
                        name="friendCode"
                        type="text"
                        value={formData.friendCode}
                        onChange={handleChange}
                    ></Input>
                    <Button type="submit">Register!</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default SignupForm;