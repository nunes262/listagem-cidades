import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import './shared/forms/TraducoesYup';
import { AppThemeProvider } from "./shared/contexts/ThemeContext";
import { DrawerProvider } from "./shared/contexts/DrawerContext";
import { MenuLateral } from "./shared/components/menu-lateral/MenuLateral";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider >
    </AppThemeProvider >
  );
}