import { useEffect, useState } from "react";

const ProfileCreation = ({ checkProfile, profileContract, account }) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const createProfile = async (event) => {
    event.preventDefault();

    if (!profileContract || !profileContract.methods) {
      console.error("Profile contract is not initialized properly.");
      return;
    }
  
    // Use setProfile instead of createProfile
    if (!profileContract.methods.setProfile) {
      console.error("❌ Function setProfile does not exist in the contract.");
      console.log("Available methods:", profileContract.methods);
      return;
    }

    try {
      setLoading(true);
      // Use the setProfile() function in contract to create Profile with username and bio
      // HINT: https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-send
      await profileContract.methods.setProfile(username, bio).send({ from: account });
      console.log("✅ Profile created successfully!");
      checkProfile();
    } catch (error) {
      console.error("❌ Error creating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-profile-form">
      <h2>Create your profile</h2>
      <form onSubmit={createProfile}>
        <label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="profile-input"
          />
        </label>
        <label>
          <textarea
            value={bio}
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
            className="profile-input"
          />
        </label>
        <button type="submit" className="profile-submit">
          {loading ? <div className="spinner"></div> : <>Create Profile</>}
        </button>
      </form>
    </div>
  );
};

export default ProfileCreation;
