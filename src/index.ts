// Advanced TypeScript Concepts - Main Entry Point
// This file demonstrates all the advanced TypeScript concepts

console.log("🚀 Advanced TypeScript Concepts Examples");
console.log("=====================================\n");

// Import only the functions we actually use
import { 
  processValue, 
  demonstrateIsUser 
} from './typeGuards';

import { 
  processValue as processValueCasting
} from './typeCasting';

import { 
  setTheme, 
  setFontSize
} from './literalTypes';

import {
  calculateArea,
  describeShape
} from './discriminatedUnions';

import {
  ConfigManager
} from './indexSignatures';

import {
  demonstrateUtilityCombinations
} from './utilityTypes';

import {
  Optional,
  Readonly,
  Stringify
} from './mappedTypes';

// Run all examples
function runAllExamples() {
  console.log("📚 Running all Advanced TypeScript examples...\n");
  
  // Type Guards Examples
  console.log("1️⃣ Type Guards Examples");
  console.log("========================");
  processValue("hello");
  processValue(5);
  processValue(true);
  demonstrateIsUser();
  console.log();
  
  // Type Casting Examples
  console.log("2️⃣ Type Casting Examples");
  console.log("=========================");
  processValueCasting("hello");
  processValueCasting(42);
  console.log();
  
  // Literal Types Examples
  console.log("3️⃣ Literal Types Examples");
  console.log("==========================");
  setTheme("dark");
  setFontSize(16);
  console.log();
  
  // Discriminated Unions Examples
  console.log("4️⃣ Discriminated Unions Examples");
  console.log("=================================");
  const circle = { kind: "circle" as const, radius: 5 };
  const rectangle = { kind: "rectangle" as const, width: 10, height: 8 };
  console.log(`${describeShape(circle)} - Area: ${calculateArea(circle).toFixed(2)}`);
  console.log(`${describeShape(rectangle)} - Area: ${calculateArea(rectangle)}`);
  console.log();
  
  // Index Signatures Examples
  console.log("5️⃣ Index Signatures Examples");
  console.log("=============================");
  const configManager = new ConfigManager();
  configManager.set("database", "postgresql");
  configManager.set("port", 5432);
  console.log(`Database: ${configManager.get("database")}`);
  console.log(`Port: ${configManager.get("port")}`);
  console.log();
  
  // Utility Types Examples
  console.log("6️⃣ Utility Types Examples");
  console.log("==========================");
  demonstrateUtilityCombinations();
  console.log();
  
  // Mapped Types Examples
  console.log("7️⃣ Mapped Types Examples");
  console.log("=========================");
  interface TestUser {
    name: string;
    age: number;
    email: string;
  }
  
  type OptionalTestUser = Optional<TestUser>;
  type ReadonlyTestUser = Readonly<TestUser>;
  type StringifiedTestUser = Stringify<TestUser>;
  
  const optionalUser: OptionalTestUser = { name: "John" };
  const readonlyUser: ReadonlyTestUser = { name: "Jane", age: 30, email: "jane@example.com" };
  const stringifiedUser: StringifiedTestUser = { name: "Bob", age: "25", email: "bob@example.com" };
  
  console.log("Optional user:", optionalUser);
  console.log("Readonly user:", readonlyUser);
  console.log("Stringified user:", stringifiedUser);
  console.log();
  
  console.log("✅ All examples completed successfully!");
  console.log("\n📖 For detailed explanations, see the individual files:");
  console.log("   - typeGuards.ts");
  console.log("   - typeCasting.ts");
  console.log("   - literalTypes.ts");
  console.log("   - discriminatedUnions.ts");
  console.log("   - indexSignatures.ts");
  console.log("   - utilityTypes.ts");
  console.log("   - mappedTypes.ts");
  console.log("\n📚 Also check out README_AdvancedTypeScript.md for comprehensive documentation!");
}

// Run the examples
runAllExamples();