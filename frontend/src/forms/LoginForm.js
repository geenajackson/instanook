import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";


function LoginForm({ loginUser }) {
    const INITIAL_STATE = { username: "", password: "" }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState(null);
    const history = useHistory();

    async function handleSubmit(evt) {
        evt.preventDefault();
        console.log(formData)
        let res = await loginUser(formData);

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
        <div className="LoginForm">
            <h1>Login Here!</h1>
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
                    <Button type="submit">Login!</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

export default LoginForm;