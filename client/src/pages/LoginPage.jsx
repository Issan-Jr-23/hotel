import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, ButtonNext, InputNext, Label } from "../components/ui";
// import { Button, Input } from "@nextui-org/react"
import { loginSchema } from "../schemas/auth";
import { LockIcon } from "./iconos/LockIcon.jsx"
import { MailIcon } from "./iconos/MailIcon.jsx"
import mockup from "../images/logo-actualizado.png"
import logo from "../images/logo.png"
import "../App.css"
import "./css/login.css"

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    // <div className="logoImg w-full  min-h-screen flex flex-col items-center justify-center">
    //   <div className="w-72 h-72 flex flex-col items-center justify-center">

    //     <h3 className="text-4xl text-white font-medium font-sans">BIENVENIDO</h3>
    //     <img className="w-40 h-40" src={logo} alt="Logo del hotel MEQO" />
    //   </div>
    //   <Card>
    //     {loginErrors.map((error, i) => (
    //       <Message message={error} key={i} />
    //     ))}
    //     <h1 className="text-2xl font-bold text-slate-200">Login</h1>

    //     <form onSubmit={handleSubmit(onSubmit)}>
    //       <Label htmlFor="email">Email:</Label>
    //       <Input
    //         label="Write your email"
    //         type="email"
    //         name="email"
    //         placeholder="youremail@meqo.com"
    //         {...register("email", { required: true })}
    //       />
    //       <p>{errors.email?.message}</p>

    //       <Label htmlFor="password">Password:</Label>
    //       <Input
    //         type="password"
    //         name="password"
    //         placeholder="Write your password"
    //         {...register("password", { required: true, minLength: 6 })}
    //       />
    //       <p>{errors.password?.message}</p>

    //       <Button>Login</Button>
    //     </form>
    //   </Card>
    // </div>
    <div className="flex bg-white">
      <section className=" login-mockup min-h-screen w-6/12  overflow-hidden flex justify-center items-center">
        <div className="container-descripcion">
          <h1 className="title-login">¡Bienvenido de nuevo a Meqo!</h1>

          <h3 className="sst-login">Inicia sesión y continúa mejorando tu experiencia hotelera.</h3>

        </div>


        {/* <img src={mockup} alt="" style={{width:"76%"}} /> */}

      </section>
      <section className=" section-login min-h-screen w-6/12  flex items-center justify-center " style={{ backgroundColor: "#1a1a2b" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "70%" }}>
          <div className="border-b-2 border-blue-500 mr-10 ml-10 h-14 mb-5 flex justify-center items-center uppercase">


            <h3 className="text-white text-2xl upperxase">Iniciar Sesión</h3>
          </div>
          {/* <h4 className="subtitle-login">Nos alegra verte de nuevo.</h4> */}
          <p className="pd-login">En Meqo, cada día es una oportunidad para hacer más eficiente la gestión de tu hotel. Estamos aquí para ayudarte a lograrlo.</p>
          <InputNext
            endContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Email"
            placeholder="Enter your email"
            autoComplete="off"
            className="mb-5"
            style={{ }}
            {...register("email", { required: true })}
          />
          <p className="text-red-500 mb-2" >{errors.email?.message}</p>
          <InputNext
            endContent={
              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            type="password"
            className="mb-5 "
            {...register("password", { required: true, minLength: 6 })}
          />
           <p className="text-red-500 mb-2" >{errors.password?.message}</p>
           
          <span className="flex justify-end" >
            <ButtonNext color="primary" className="w-full" >
              Sign in
            </ButtonNext>
          </span>
        </form>
      </section>
    </div>
  );
}
