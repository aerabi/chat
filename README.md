# Chat
A chat backend based on Express

## Creation of the project

First of all, let's create the NPM project.

```bash
npm init -y
```

Then, we need to install the dependencies.
The project is TypeScript based, so we need to install the TypeScript compiler and the Express framework.

```bash
npm install express typescript @types/node @types/express
```

I used the latest version of Node.js (v22.5.1) and the dependencies had 0 vulnerabilities.

### TypeScript configuration

We need to create a `tsconfig.json` file to configure the TypeScript compiler. That's best done with the following command:

```bash
npx tsc --init
```

Then, we need to change the `tsconfig.json` file and edit the following properties:

```json
{
  "outDir": "./dist",
  "rootDir": "./src",
  "moduleResolution": "node"
}
```

Now, let's add the `dist` folder to the `.gitignore` file, as well as the `node_modules` folder:

```bash
echo "dist" >> .gitignore
echo "node_modules" >> .gitignore
```

The final step here is to create a script in the `package.json` file to compile the TypeScript code:

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

Let's try it out:

```bash
npm run build
```
