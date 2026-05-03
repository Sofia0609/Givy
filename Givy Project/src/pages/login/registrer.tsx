import { useState } from "react";
import users from "../../data/users.json";
import tags from "../../data/tags.json";
import "./login.css";

function Register({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [userList, setUserList] = useState(users);
  const [name, setName] = useState("");
  const [entryEmail, setEntryEmail] = useState("");
  const [entryPassword, setEntryPassword] = useState("");
  const [teachSkill, setTeachSkill] = useState("");
  const [learnSkill, setLearnSkill] = useState("");

  function handleSignUp() {
    const isUserCreated = userList.find((user) => user.email === entryEmail);

    if (isUserCreated) {
      alert("Ya existe una cuenta con ese email");
      return;
    }

    const newUser = {
      id: "u" + (userList.length + 1),
      username: name,
      at: "@" + name.toLowerCase().replace(" ", ""),
      email: entryEmail,
      password: entryPassword,
      bio: "",
      profilePicture: "",
      followers: 0,
      following: 0,
      reputationAverage: 5,
      videoCount: 0,
      wantsToLearn: learnSkill ? [learnSkill] : [],
      wantsToTeach: teachSkill ? [teachSkill] : [],
    };

    setUserList([...userList, newUser]);
    setName("");
    setEntryEmail("");
    setEntryPassword("");
    setTeachSkill("");
    setLearnSkill("");
    alert("Cuenta creada exitosamente");
    onNavigate("login");
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <img src="/src/assets/logo.png" alt="Givy" />
          <h1 className="register-title">Create Account</h1>
          <p className="login-tagline">Join the skill exchange community</p>
        </div>

        <div className="login-form">
          <div className="login-field">
            <label>Name</label>
            <input
              type="text"
              placeholder="Example: Diana Cifuentes"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Example: Dianac@ejemplo.com"
              value={entryEmail}
              onChange={(e) => setEntryEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Example123*"
              value={entryPassword}
              onChange={(e) => setEntryPassword(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Skill I Can Teach 🦎</label>
            <select
              value={teachSkill}
              onChange={(e) => setTeachSkill(e.target.value)}
            >
              <option value="">Select a skill</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <div className="login-field">
            <label>Skill I Can Learn 🎯</label>
            <select
              value={learnSkill}
              onChange={(e) => setLearnSkill(e.target.value)}
            >
              <option value="">Select a skill</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          <button className="login-btn" onClick={handleSignUp}>
            Create Account
          </button>

          <p className="login-footer">
            Already have an account?{" "}
            <span onClick={() => onNavigate("login")}>Login.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;