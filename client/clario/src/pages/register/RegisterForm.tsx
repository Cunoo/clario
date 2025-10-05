import { useState, useEffect } from 'react'
import "../../App.css";
import InputField from '../../components/inputField/InputField';
import UserService from '../../api/UserService';
import SubmitButton from '../../components/submitButton/SubmitButton'
function RegisterForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [handleRegistration, setHandleRegistraion] = useState(false);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try{
        const result = await UserService.registerUser(formData);
        console.log("registration successful", result);
        setHandleRegistraion(true);
      } catch (error) {
        console.error("Registration failed:", error);
        setHandleRegistraion(false);
      }

    };

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="font-bold text-6xl mb-16 text-center ">
              Register
            </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* InputField for Username */}
            <InputField
              label="Username"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(value) => setFormData({ ...formData, username: value })}
            />
            {/* InputField for Password */}
            <InputField
              label="Password"
              id="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}

            ></InputField>
            <SubmitButton>Submit</SubmitButton>
          </form>
        </div>

            
    )
}

export default RegisterForm;
