import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Forum from './pages/Forum';
import Chat from './pages/Chat';
import Resources from './pages/Resources';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Identity from './pages/Identity';
import Philosophy from './pages/Philosophy';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/identity" element={<Identity />} />
            <Route path="/philosophy" element={<Philosophy />} />
        </Routes>
    );
}

export default App;
