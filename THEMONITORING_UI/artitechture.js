const fs = require("fs");
const path = require("path");

// helpers
function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

// ===== FILE TEMPLATES =====

// Pages
const pageTemplate = (name) => `
import { View, Text } from "react-native";

export default function ${name}() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>${name} Page</Text>
    </View>
  );
}
`;

// Layout
const layoutTemplate = `
import { Stack } from "expo-router";

export default function Layout() {
  return <Stack />;
}
`;

// Service template
const serviceTemplate = (name) => `
import { api } from "./api.service";

export const ${name}Service = {
  async getAll() {
    return api.get("/${name.toLowerCase()}s");
  },
};
`;

// Model template
const modelTemplate = (name) => `
export interface ${name} {
  id: string;
}
`;

// Enum template
const enumTemplate = (name) => `
export enum ${name} {
  EXAMPLE = "EXAMPLE"
}
`;

// ===== STRUCTURE =====
const files = [
  // APP ROUTES
  ["src/app/(auth)/login.tsx", pageTemplate("Login")],
  ["src/app/(auth)/add-account.tsx", pageTemplate("AddAccount")],

  ["src/app/(main)/home/index.tsx", pageTemplate("Home")],

  ["src/app/(main)/administrations/index.tsx", pageTemplate("Administrations")],
  ["src/app/(main)/administrations/create.tsx", pageTemplate("CreateAdministration")],
  ["src/app/(main)/administrations/details.tsx", pageTemplate("AdministrationDetails")],

  ["src/app/(main)/servers/index.tsx", pageTemplate("Servers")],
  ["src/app/(main)/servers/create.tsx", pageTemplate("CreateServer")],
  ["src/app/(main)/servers/details.tsx", pageTemplate("ServerDetails")],

  ["src/app/_layout.tsx", layoutTemplate],

  // SERVICES
  ["src/services/api.service.ts", `
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
});
`],

  ["src/services/auth.service.ts", `
import { api } from "./api.service";

export const AuthService = {
  login: (email, password) => api.post("/auth/login", { email, password }),
};
`],

  ["src/services/server.service.ts", serviceTemplate("Server")],
  ["src/services/administration.service.ts", serviceTemplate("Administration")],
  ["src/services/account.service.ts", serviceTemplate("Account")],

  // MODELS
  ["src/models/user.model.ts", modelTemplate("User")],
  ["src/models/server.model.ts", modelTemplate("Server")],

  // ENUMS
  ["src/enums/roles.enum.ts", enumTemplate("Roles")],
  ["src/enums/server-status.enum.ts", enumTemplate("ServerStatus")],
];

// CREATE ALL FILES
files.forEach(([filePath, content]) => {
  writeFile(filePath, content.trim());
});

console.log("✅ Project architecture created with basic templates!");