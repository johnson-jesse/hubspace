import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../api/client";
import Spinner from "../components/Spinner";

type LoginResult = Awaited<ReturnType<typeof postLogin>>;

type LoginForm = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [result, setResult] = useState<LoginResult | null>(null);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    console.log("submit");
    event.preventDefault();
    setLoading(true);
    const d = await postLogin(form.email, form.password);
    if (d?.success) setTimeout(() => navigate("/workspace"), 1000);
    else {
      setLoading(false);
      setResult(d);
    }
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
          <h1>Hubspace - Login</h1>

          <form onSubmit={handleSubmit}>
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
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className={`${!result && "invisible"} ${result?.success ? "created" : "conflict"}`}>{result?.message || "|"}</p>
        </div>
        <code>Or</code>
        <a role="button" className="action" href="/register">
          Register New Account
        </a>
      </section>
      <section id="spacer"></section>
    </>
  );
}
