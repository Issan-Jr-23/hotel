import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  const { signup, errors: authErrors } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values) => {
    try {
      const response = await signup(values);
      alert("buen trabajo")
    } catch (error) {
      console.error("Signup failed: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Card>
        {authErrors && authErrors.map((error, i) => (
          <Message key={i} message={error} />
        ))}
        <h1 className="text-3xl font-bold">Register</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            placeholder="Write your username"
            {...register("username")}
            autoFocus
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username.message}</p>
          )}

          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            placeholder="youremail@domain.tld"
            {...register("email")}
          />
          {errors.email?.message && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            placeholder="********"
            {...register("password")}
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <Label htmlFor="confirmPassword">Confirm Password:</Label>
          <Input
            type="password"
            placeholder="********"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}

                      {/* Campo nuevo para el Rol */}
          <Label htmlFor="role">Role:</Label>
          <select {...register("role")} className="border border-gray-300 rounded px-3 py-2">
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            {/* Añade más roles según sea necesario */}
          </select>
          {errors.role?.message && (
            <p className="text-red-500">{errors.role.message}</p>
          )}

          <Button type="submit">Submit</Button>
        </form>
        <p className="mt-4">
          Already have an account?
          <Link className="text-sky-500" to="/login"> Login</Link>
        </p>
      </Card>
    </div>
  );
}

export default Register;
