module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "new-cap": [2, { "capIsNewExceptions": ["Router"] }],
        "arrow-body-style": [ "error", "always" ],
        "no-console": [1, { "allow": ["warn", "error"] }]
    }
};
