import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/common/ErrorMessage";
import axios from "axios";

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("image", image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=4a66c6c19a05f252ddd2ac5f35a3109f`,
    formData
  );
  return data.data.display_url;
};

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state ?? "/";
  const { registerUser, loading, updateUser, googleLogin, setLoading } =
    useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { email, password, name, displayImage } = data;
    setLoading(true);
    registerUser(email, password)
      .then(async (result) => {
        if (result?.user) {
          const image_url = await uploadImage(displayImage[0]);
          updateUser(name, image_url)
            .then((result) => {
              console.log(result);
              toast.success("Register Successfully!");
              navigate("/", { replace: true });
            })
            .catch((error) => {
              console.log("error", error);
            });
        }
      })
      .catch((e) => {
        const code = e.code;
        if (code === "auth/email-already-in-use") {
          setError("email", "This email already exists!");
          toast.error("This Email already exists.");
        } else {
          console.log(e);
          toast.error("Something Went Wrong!");
        }
      })
      .finally((res) => setLoading(false));
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
              Register Here
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Name"
              type="text"
              {...register("name", { required: "Name is required!" })}
              error={errors.name?.message ? true : undefined}
            />
            {errors.name?.message && (
              <ErrorMessage message={errors.name?.message} />
            )}
            <Input
              label="Email"
              type="email"
              {...register("email", { required: "Email is required!" })}
              error={errors.email?.message ? true : undefined}
            />
            {errors.email?.message && (
              <ErrorMessage message={errors.email?.message} />
            )}
            <Input
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required!",
                minLength: {
                  value: 6,
                  message: "Password atleast 6 characters long!",
                },
              })}
              error={errors.password?.message ? true : undefined}
            />
            {errors.password?.message && (
              <ErrorMessage message={errors.password?.message} />
            )}
            <Input
              label="Password"
              type="password"
              {...register("confirmPassword", {
                required: "Confirm Password is required!",
                minLength: {
                  value: 6,
                  message: "Confirm Password atleast 6 characters long!",
                },
                validate: (value) => {
                  if (watch("password") != value) {
                    return "Password do no match";
                  }
                },
              })}
              error={errors.confirmPassword?.message ? true : undefined}
            />
            {errors.confirmPassword?.message && (
              <ErrorMessage message={errors.confirmPassword?.message} />
            )}
            <Input
              label="Profile Image"
              accept=""
              type="file"
              {...register("displayImage", { required: "Image is required!" })}
              error={errors.displayImage?.message ? true : undefined}
            />
            {errors.displayImage?.message && (
              <ErrorMessage message={errors.displayImage?.message} />
            )}
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              fullWidth
              type="submit"
              className="mt-3 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Spinner className="h-4 w-4" /> : "Register"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Link to={"/login"}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                >
                  Login
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </form>
    </section>
  );
}
