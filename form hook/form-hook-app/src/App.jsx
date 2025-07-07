import { useForm } from "react-hook-form";
import "./App.css"; 

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    reset();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">React Hook Form with Bootstrap</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="card p-4 shadow-lg">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
          {errors.name && <div className="text-danger">Name is required</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            placeholder="Enter your email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <div className="text-danger">Email is required</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            className="form-control"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <div className="text-danger">Password is required</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select className="form-select" {...register("gender", { required: true })}>
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <div className="text-danger">Gender is required</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Range: <strong>{watch("range")}</strong>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            className="form-range"
            {...register("range")}
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            {...register("agree", { required: true })}
          />
          <label className="form-check-label">
            I agree to the terms and conditions
          </label>
          {errors.agree && <div className="text-danger">You must agree</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
