// controllers/ProfileController.js

// Get Profile View
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // The user is already fetched by middleware
    res.status(200).json({
      name: user.name,
      email: user.email,
      bio: user.bio,
      avatar: user.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Edit Profile
export const editProfile = async (req, res) => {
  try {
    const user = req.user; // The user is already fetched by middleware
    const { name, bio, avatar,email } = req.body;

    // Update fields if they are provided in the request
    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;
    user.email = email || user.email;

    // Save the updated user profile
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        bio: user.bio,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
