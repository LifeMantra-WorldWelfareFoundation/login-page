const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Not authenticated' });
};

const isNotAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.status(400).json({ message: 'Already authenticated' });
};

module.exports = {
    isAuthenticated,
    isNotAuthenticated
};