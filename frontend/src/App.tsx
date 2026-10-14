import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import { ThemeProvider } from "./context/ThemeContext";
import { WallpaperProvider } from "./context/WallpapperContext";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import { useAuth } from "@clerk/react";

function App() {
    const { isSignedIn, isLoaded } = useAuth();
    //TODO: add loading spinner
    if (!isLoaded) {
        return <div>Loading...</div>
    }
    return (
        <ThemeProvider>
            <WallpaperProvider>
                <Routes>
                    <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
                    <Route path="/auth" element={!isSignedIn ? <AuthPage /> : <Navigate to={"/chat"} replace />} />
                </Routes>
            </WallpaperProvider>
        </ThemeProvider>
    );
}

export default App;
