import { useEffect, useState } from "react";

const USERS_KEY = "demo_users_v1";
const REMEMBER_KEY = "demo_remember_email_v1";

const loadUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
const saveUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

export default function App() {
  const [mode, setMode] = useState("login"); // login | signup

  // Login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loginMsg, setLoginMsg] = useState(null);

  // Signup
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [spass, setSpass] = useState("");
  const [cpass, setCpass] = useState("");
  const [signupMsg, setSignupMsg] = useState(null);

  useEffect(() => {
    const remembered = localStorage.getItem(REMEMBER_KEY);
    if (remembered) {
      setUsername(remembered);
      setRemember(true);
    }
  }, []);

  const clearMsgs = () => {
    setLoginMsg(null);
    setSignupMsg(null);
  };

  const login = (e) => {
    e.preventDefault();
    clearMsgs();

    const u = loadUsers().find(
      (x) => x.username === username.trim() && x.password === password
    );

    if (!u) return setLoginMsg({ type: "err", text: "Invalid username or password." });

    if (remember) localStorage.setItem(REMEMBER_KEY, username.trim());
    else localStorage.removeItem(REMEMBER_KEY);

    setLoginMsg({ type: "ok", text: "Login successful." });
  };

  const signup = (e) => {
    e.preventDefault();
    clearMsgs();

    if (spass !== cpass) return setSignupMsg({ type: "err", text: "Passwords do not match." });

    const users = loadUsers();
    const uname = (email.trim().split("@")[0] || "user").toLowerCase();

    if (users.some((x) => x.email === email.trim().toLowerCase())) {
      return setSignupMsg({ type: "err", text: "Email already registered." });
    }

    users.push({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      username: uname,
      password: spass,
      createdAt: Date.now(),
    });
    saveUsers(users);

    setMode("login");
    setUsername(uname);
    setPassword("");
    setLoginMsg({ type: "ok", text: "Account created. Please login." });
  };

  const forgot = () => {
    setLoginMsg({ type: "err", text: "Forgot password will be added soon." });
  };

  return (
    <div className="outer">
      <div className="inner">
        <div className="badge" aria-hidden="true"><span /></div>

        <div className="stage">
          {/* LEFT illustration */}
          <div className="left">
            <div className="hero" aria-hidden="true">
              <div className="monitor" />
              <div className="desk" />
              <div className="plant">
                <div className="leaf1" />
                <div className="leaf2" />
                <div className="pot" />
              </div>

              <div className="person">
                <div className="hair" />
                <div className="head" />
                <div className="body" />
                <div className="leg l1" />
                <div className="leg l2" />
                <div className="shoe s1" />
                <div className="shoe s2" />
              </div>
            </div>
          </div>

          {/* RIGHT auth */}
          <div className="right">
            <div className="card">
              {mode === "login" ? (
                <>
                  <h2>Login</h2>

                  <form onSubmit={login}>
                    <div className="field">
                      <div className="input">
                        <span className="icon">👤</span>
                        <input
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Username"
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="input">
                        <span className="icon">🔒</span>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          placeholder="Password"
                          minLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <label className="chk">
                        <input
                          type="checkbox"
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                        Remember me
                      </label>

                      <button className="link" type="button" onClick={forgot}>
                        Forgot your password?
                      </button>
                    </div>

                    <button className="btn" type="submit">LOGIN</button>

                    {loginMsg && <div className={"msg " + loginMsg.type}>{loginMsg.text}</div>}
                  </form>

                  <div className="footer">
                    New here?{" "}
                    <button type="button" onClick={() => { clearMsgs(); setMode("signup"); }}>
                      Sign Up
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2>Sign Up</h2>

                  <form onSubmit={signup}>
                    <div className="field">
                      <div className="input">
                        <span className="icon">📝</span>
                        <input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="input">
                        <span className="icon">✉</span>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="input">
                        <span className="icon">🔒</span>
                        <input
                          value={spass}
                          onChange={(e) => setSpass(e.target.value)}
                          type="password"
                          placeholder="Password"
                          minLength={4}
                          required
                        />
                      </div>
                    </div>

                    <div className="field">
                      <div className="input">
                        <span className="icon">🔁</span>
                        <input
                          value={cpass}
                          onChange={(e) => setCpass(e.target.value)}
                          type="password"
                          placeholder="Confirm password"
                          minLength={4}
                          required
                        />
                      </div>
                    </div>

                    <button className="btn" type="submit">CREATE</button>

                    {signupMsg && <div className={"msg " + signupMsg.type}>{signupMsg.text}</div>}
                  </form>

                  <div className="footer">
                    Already have an account?{" "}
                    <button type="button" onClick={() => { clearMsgs(); setMode("login"); }}>
                      Login
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}