import { Routes, Route } from "react-router-dom";
import { ThemeProvider, THEMES } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import { Home } from "@/pages/Home";

function App() {
  return (
    <ThemeProvider defaultTheme={THEMES.SYSTEM} storageKey="23prime-theme">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
