import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { AppDrawerProvider } from "./shared/contexts/DrawerContext";
import { MenuLateral } from "./shared/components/menu-lateral/MenuLateral";

export const App = () => {
  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </AppDrawerProvider >
    </AppThemeProvider >
  );
}