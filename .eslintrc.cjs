module.exports = {
    "extends": [

      ],
      "plugins": ["react", "react-hooks"],
      "parserOptions": {
        "ecmaVersion": 2020,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "env": {
        "browser": true,
        "es2020": true
      },
      "rules": {
        "react/react-in-jsx-scope": "off",
        "react/no-unescaped-entities": "off"
      }
}
