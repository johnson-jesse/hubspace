import { useState, type SyntheticEvent } from "react";
import { postRegister } from "../api/client";
import Spinner from "../components/Spinner";

type RegisterResult = Awaited<ReturnType<typeof postRegister>>;

type RegisterForm = {
  email: string;
  password: string;
  name: string;
};

export function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<RegisterForm>({
    email: "",
    password: "",
    name: "",
  });

  const [result, setResult] = useState<RegisterResult | null>(null);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const d = await postRegister(form.name, form.email, form.password);
    setLoading(false);
    setResult(d);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  return (
    <>
      <section id="center">
        <div>
          <h1>Hubspace - Register</h1>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="name"
              type="name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="password"
              placeholder="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            <button className="action public" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner />
                  Creating in...
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p className={`${!result && "invisible"} ${result?.success ? "created" : "conflict"}`}>{result?.message || "|"}</p>
        </div>
        <code>Or</code>
        <a role="button" className="action" href="/login">
          Login
        </a>
      </section>
      <section id="spacer"></section>
    </>
  );
}
