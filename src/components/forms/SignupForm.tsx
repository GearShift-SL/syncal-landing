import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

/* ---------------------------------- DATA ---------------------------------- */
const APIENDPOINT = "/api/brevo/createbrevocontact";
const SUCCESSMESSAGE = {
  title: "Thank You!",
  description:
    "We've added you to the waitlist. We will soon send you an email with more information."
};

/* ----------------------------------- Zod ---------------------------------- */
const SignupFormSchema = z.object({
  first_name: z.string().min(1, "Please input your first name."),
  last_name: z.string().min(1, "Please input your last name."),
  email: z
    .string()
    .min(1, "Please input an email address.")
    .email("Please input a valid email address."),
  password: z.string().min(1, "Please input a password."),
  confirm_password: z.string().min(1, "Please input a password."),
  terms: z.boolean().refine((value) => value === true, {
    message: "Please accept the terms and conditions."
  })
});

type SignupFormValues = z.infer<typeof SignupFormSchema>;

/* --------------------------------- Component ------------------------------- */
const SignupForm = () => {
  /* ---------------------------------- Hooks --------------------------------- */
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema)
  });

  /* -------------------------------- Functions ------------------------------- */
  const onSubmit = async (
    data: SignupFormValues,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();

    setIsSubmitting(true);

    console.log(data);

    setIsSubmitting(false);
  };

  /* --------------------------------- Render --------------------------------- */
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 my-10 md:my-20 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* First Name */}
              <div>
                <label
                  htmlFor="first_name"
                  className={`block mb-2 text-sm font-medium ${errors.first_name ? "text-red-400" : "text-gray-900 dark:text-white"}`}
                >
                  First Name
                </label>
                <input
                  required
                  {...register("first_name", { required: true })}
                  placeholder="John"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.first_name ? "border-red-400" : ""
                  }`}
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="last_name"
                  className={`block mb-2 text-sm font-medium ${errors.last_name ? "text-red-400" : "text-gray-900 dark:text-white"}`}
                >
                  Last Name
                </label>
                <input
                  required
                  {...register("last_name", { required: true })}
                  placeholder="Doe"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.last_name ? "border-red-400" : ""
                  }`}
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.last_name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={`block mb-2 text-sm font-medium ${errors.email ? "text-red-400" : "text-gray-900 dark:text-white"}`}
                >
                  Email
                </label>
                <input
                  required
                  {...register("email", { required: true })}
                  placeholder="Doe"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.email ? "border-red-400" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className={`block mb-2 text-sm font-medium ${errors.password ? "text-red-400" : "text-gray-900 dark:text-white"}`}
                >
                  Password
                </label>
                <input
                  required
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Doe"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.password ? "border-red-400" : ""
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirm_password"
                  className={`block mb-2 text-sm font-medium ${errors.confirm_password ? "text-red-400" : "text-gray-900 dark:text-white"}`}
                >
                  Confirm Password
                </label>
                <input
                  required
                  type="password"
                  {...register("confirm_password", { required: true })}
                  placeholder="Doe"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    errors.confirm_password ? "border-red-400" : ""
                  }`}
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    required
                    id="terms"
                    {...register("terms", { required: true })}
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    className={`font-light  ${errors.terms ? "text-red-400" : "text-gray-500 dark:text-gray-300"}`}
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                  {errors.terms && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.terms.message}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[var(--aw-color-primary)] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
