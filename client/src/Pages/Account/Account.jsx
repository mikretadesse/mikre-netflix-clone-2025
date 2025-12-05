import React, { useState, useEffect } from "react";
import Styles from "./Account.module.css";

const Account = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetch("/data/users.json")
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Add or save profile
  const handleSave = () => {
    if (!newName.trim() || !newAvatar.trim()) return;

    if (editingProfile) {
      setProfiles(
        profiles.map((p) =>
          p.id === editingProfile.id
            ? { ...p, name: newName, avatar: newAvatar }
            : p
        )
      );
    } else {
      setProfiles([
        ...profiles,
        { id: Date.now(), name: newName, avatar: newAvatar },
      ]);
    }

    setEditingProfile(null);
    setShowAdd(false);
    setNewName("");
    setNewAvatar("");
  };

  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setNewName(profile.name);
    setNewAvatar(profile.avatar);
    setShowAdd(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this profile?")) {
      setProfiles(profiles.filter((p) => p.id !== id));
    }
  };

  if (loading) return <p className={Styles.loading}>Loading...</p>;

  return (
    <div className={Styles.page}>
      <h1 className={Styles.title}>Manage Profiles</h1>

      <div className={Styles.profilesGrid}>
        {profiles.map((p) => (
          <div key={p.id} className={Styles.profileCard}>
            <img src={p.avatar} alt={p.name} />
            <p>{p.name}</p>
            <div className={Styles.profileButtons}>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}

        <div
          className={Styles.addCard}
          onClick={() => {
            setShowAdd(true);
            setEditingProfile(null);
            setNewName("");
            setNewAvatar("");
          }}>
          <p>+ Add Profile</p>
        </div>
      </div>

      {showAdd && (
        <div className={Styles.addForm}>
          <input
            type="text"
            placeholder="Enter profile name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter avatar URL"
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
          />
          <button onClick={handleSave}>
            {editingProfile ? "Save" : "Add"}
          </button>
          <button
            onClick={() => {
              setShowAdd(false);
              setEditingProfile(null);
              setNewName("");
              setNewAvatar("");
            }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
