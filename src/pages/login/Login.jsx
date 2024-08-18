import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function Login() {
  const { logInUser, loading, setLoading, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state ?? "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoading(true);
    logInUser(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          const user = userCredential.user;
          if (user) {
            toast.success("Log in successfully!");
            navigate(from, { replace: true });
          }
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid Credentials!", { theme: "colored" });
        setLoading(false);
      })
      .finally((res) => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        console.log(result);
        const user = result.user;
        if (user) {
          toast.success("Log in successfully!");
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong!");
      });
  };
  return (
    <section className="h-screen flex justify-center items-center pt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In Here
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              {...register("email", { required: "Email is required!" })}
              error={errors?.email?.message ? true : undefined}
            />
            {errors?.email?.message && (
              <ErrorMessage message={errors?.email?.message} />
            )}
            <Input
              label="Password"
              type="password"
              {...register("password", { required: "Password is required!" })}
              error={errors?.password?.message ? true : undefined}
            />
            {errors?.password?.message && (
              <ErrorMessage message={errors?.password?.message} />
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              fullWidth
              type="submit"
              className="mt-3 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Spinner className="h-4 w-4" /> : "SUBMIT"}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              type="button"
              className="mt-3 flex justify-center items-center"
              disabled={loading}
              onClick={handleGoogleLogin}
            >
              Login with Google
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Link to={"/register"}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Register
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
