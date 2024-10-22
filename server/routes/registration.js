// Registration route
app.post('/registration', async (req, res) => {
    const { name, username, email, password } = req.body;

    // Validate email, username, name, and password
    if (!email || !password || !name || !username) {
        return res.status(400).json({ message: 'Name, email, username, and password are required' });
    }

    try {
        // Check if user already exists (check by email or username as per your requirement)
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving (make sure to import bcrypt)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword // Save the hashed password
        });

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'Registration successful', user: savedUser });
    } catch (err) {
        res.status(500).send(`Error occurred: ${err.message}`);
    }
});
