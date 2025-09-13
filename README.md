# TypeScript Boilerplate Project

A clean, modern TypeScript boilerplate project with comprehensive configuration and development tools.

## 🚀 Features

- **TypeScript 5.3+** with strict configuration
- **Node.js** runtime support
- **Development tools** (ts-node, rimraf)
- **Type definitions** for Node.js
- **Source maps** for debugging
- **Declaration files** generation
- **Clean build** process

## 📁 Project Structure

```
├── src/
│   └── index.ts          # Main application entry point
├── dist/                 # Compiled JavaScript output (generated)
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run the compiled application:
   ```bash
   npm start
   ```

## 📜 Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Run the compiled application
- `npm run dev` - Run the application in development mode (using ts-node)
- `npm run watch` - Watch for changes and recompile automatically
- `npm run clean` - Remove the dist directory

## 🔧 Development

### Running in Development Mode

For development, you can run the TypeScript files directly without compilation:

```bash
npm run dev
```

This uses `ts-node` to execute TypeScript files directly.

### Watching for Changes

To automatically recompile when files change:

```bash
npm run watch
```

## 📝 TypeScript Configuration

The project uses a strict TypeScript configuration with the following key features:

- **Target**: ES2020
- **Module System**: CommonJS
- **Strict Mode**: Enabled with all strict checks
- **Source Maps**: Enabled for debugging
- **Declaration Files**: Generated for type definitions
- **Out Directory**: `./dist`
- **Root Directory**: `./src`

## 🎯 Example Code

The boilerplate includes a simple example demonstrating:

- TypeScript interfaces
- Classes and methods
- Type safety
- Module exports

## 📦 Dependencies

### Development Dependencies

- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions
- `ts-node` - TypeScript execution for Node.js
- `rimraf` - Cross-platform rm -rf utility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on the repository.
