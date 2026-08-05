import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Menu, Bell, Search, User, LogOut, Settings, 
  MessageSquare, Plus, Wrench, QrCode, Calendar, DollarSign, 
  Users, FileText, Globe, X, Send, ChevronRight, Sparkles 
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSidebarStore } from '../../store/sidebarStore';
import { useNotificationStore } from '../../store/notificationStore';
import { useSettingsStore } from '../../store/settingsStore';
import { useAiStore } from '../../store/aiStore';
import { usePermission } from '../../features/auth/hooks/usePermission';
import { aiService } from '../../services/ai';
import { translations } from '../../shared/utils/i18n';
import toast from 'react-hot-toast';

export const AppShell = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isOpen, toggleSidebar, isMobileOpen, toggleMobileSidebar, setMobileSidebar } = useSidebarStore();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotificationStore();
  const { language, setLanguage } = useSettingsStore();
  const { isOpen: isAiOpen, messages, addMessage, toggleOpen: toggleAiOpen } = useAiStore();
  const { hasPermission } = usePermission();

  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const [cmdSearch, setCmdSearch] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const aiEndRef = useRef(null);

  useEffect(() => {
    if (isAiOpen) {
      aiEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiOpen]);

  // Hotkey listener for Command Palette (Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setCmdPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const t = translations[language] || translations.en;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  const handleSendAiMessage = async (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userText = aiInput.trim();
    addMessage(userText, 'user');
    setAiInput('');
    setIsAiTyping(true);

    try {
      const response = await aiService.sendMessage(userText);
      if (response.success) {
        addMessage(response.data.text, 'bot');
      }
    } catch (err) {
      addMessage('I apologize, I am having trouble connecting to the AI microservice. Please try again.', 'bot');
    } finally {
      setIsAiTyping(false);
    }
  };

  // Nav links parsed based on Role/Permissions
  const navItems = [
    { label: t.dashboard, path: '/dashboard', icon: Home, show: true },
    { label: t.profile, path: '/profile', icon: User, show: true },
    { label: t.complaints, path: '/complaints', icon: Wrench, show: hasPermission('write:complaints') || hasPermission('update:complaints') },
    { label: t.visitors, path: '/visitors', icon: QrCode, show: hasPermission('request:visitors') || hasPermission('scan:visitors') },
    { label: t.facilities, path: '/facilities', icon: Calendar, show: hasPermission('book:facilities') },
    { label: t.bills, path: '/billing', icon: DollarSign, show: hasPermission('book:facilities') || user?.role === 'ACCOUNTANT' },
    { label: t.community, path: '/community', icon: Users, show: true },
    { label: 'System Logs', path: '/super-admin', icon: FileText, show: user?.role === 'SUPER_ADMIN' },
    { label: t.settings, path: '/settings', icon: Settings, show: true },
  ];

  // Command Palette links search matching
  const matchingLinks = navItems.filter(item => 
    item.show && item.label.toLowerCase().includes(cmdSearch.toLowerCase())
  );

  // Parsing Breadcrumbs paths
  const pathParts = location.pathname.split('/').filter(Boolean);

  return (
    <div className="min-h-screen bg-primary text-text-secondary flex overflow-hidden font-sans">
      
      {/* 1. Sidebar Container (Desktop) */}
      <aside className={`hidden md:flex flex-col bg-secondary border-r border-border transition-all duration-300 z-30 ${isOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-border">
          <Link to="/dashboard" className="flex items-center gap-2.5 font-bold font-poppins text-text-primary text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary shrink-0">
              <Home className="w-5 h-5" />
            </div>
            {isOpen && <span>Living<span className="text-accent">Hub</span></span>}
          </Link>
        </div>

        <nav className="flex-grow py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            if (!item.show) return null;
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition duration-200 ${isActive ? 'bg-accent text-primary font-bold' : 'text-text-secondary hover:bg-card hover:text-text-primary'}`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {isOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-danger hover:bg-danger/10 rounded-xl transition duration-200 text-left font-semibold text-sm"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm" onClick={toggleMobileSidebar} />
          
          <aside className="relative flex flex-col w-64 max-w-xs bg-secondary border-r border-border h-full p-6 animate-slide-in">
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold font-poppins text-text-primary text-lg flex items-center gap-2">
                <Home className="w-6 h-6 text-accent" /> LivingHub
              </span>
              <button onClick={toggleMobileSidebar} className="p-1 text-muted hover:text-text-primary">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex-grow space-y-2">
              {navItems.map((item) => {
                if (!item.show) return null;
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={toggleMobileSidebar}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition ${isActive ? 'bg-accent text-primary font-bold' : 'text-text-secondary hover:bg-card hover:text-text-primary'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <button 
              onClick={() => { toggleMobileSidebar(); handleLogout(); }}
              className="mt-auto w-full flex items-center gap-4 px-4 py-3 text-danger hover:bg-danger/10 rounded-xl transition font-semibold text-sm text-left"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </aside>
        </div>
      )}

      {/* 2. Main Content Wrapper */}
      <div className="flex-grow flex flex-col min-w-0 overflow-y-auto h-screen relative">
        
        {/* Sticky Header Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-secondary/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar} 
              className="hidden md:p-1.5 md:rounded-lg md:hover:bg-card md:text-muted md:hover:text-text-primary md:transition md:block"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleMobileSidebar} 
              className="p-1.5 rounded-lg hover:bg-card text-muted hover:text-text-primary transition md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Command Palette Trigger Input */}
            <div 
              onClick={() => setCmdPaletteOpen(true)}
              className="hidden lg:flex items-center gap-3 px-3 py-2 bg-card/60 hover:bg-card hover:border-border/80 border border-border/50 rounded-xl text-muted text-xs cursor-pointer select-none transition min-w-[240px]"
            >
              <Search className="w-4 h-4 text-muted/80" />
              <span>Search dashboard...</span>
              <kbd className="ml-auto bg-primary border border-border/80 px-1.5 py-0.5 rounded text-[10px] font-mono">Ctrl+K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selection */}
            <div className="relative">
              <button 
                onClick={() => toast.success('Selected language switcher.')} 
                className="p-2 hover:bg-card hover:text-text-primary rounded-xl text-muted transition flex items-center gap-1.5 text-xs font-semibold"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{language}</span>
              </button>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>

            {/* Notifications Bell */}
            <button 
              onClick={() => setNotifDrawerOpen(true)}
              className="p-2 hover:bg-card hover:text-text-primary rounded-xl text-muted transition relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-secondary">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Profile Action Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2.5 focus:outline-none"
              >
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-border bg-card">
                  <img src={user?.avatarUrl || 'https://api.dicebear.com/7.x/adventurer/svg?seed=david'} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-xs font-semibold text-text-primary leading-none">{user?.name || 'David Miller'}</p>
                  <p className="text-[10px] text-muted leading-none mt-1">{user?.role?.replace('_', ' ')}</p>
                </div>
              </button>
              
              {profileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileMenuOpen(false)} />
                  <div className="absolute right-0 mt-2.5 w-52 bg-card border border-border rounded-xl shadow-2xl p-2 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-border/55 mb-1.5">
                      <p className="text-xs text-text-primary font-bold">{user?.name}</p>
                      <p className="text-[10px] text-muted truncate">{user?.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-primary rounded-lg transition"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 text-xs hover:bg-primary rounded-lg transition"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <button 
                      onClick={() => { setProfileMenuOpen(false); handleLogout(); }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-xs text-danger hover:bg-danger/10 rounded-lg transition text-left font-semibold"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Breadcrumbs Area */}
        <section className="px-8 pt-6 pb-2 shrink-0">
          <div className="flex items-center gap-2 text-[10px] tracking-wider text-muted font-bold font-mono uppercase">
            <span>LivingHub</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted/60" />
            <span className="text-text-primary">{pathParts[0] || 'Dashboard'}</span>
            {pathParts[1] && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-muted/60" />
                <span className="text-text-primary">{pathParts[1]}</span>
              </>
            )}
          </div>
        </section>

        {/* Content Render Area */}
        <main className="flex-grow p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="py-6 px-8 border-t border-border/40 text-center text-[10px] text-muted shrink-0">
          <span>&copy; {new Date().getFullYear()} LivingHub Enterprise Suite. Connected to API Gateway.</span>
        </footer>
      </div>

      {/* 3. Notification Drawer Panel */}
      {notifDrawerOpen && (
        <>
          <div className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-40" onClick={() => setNotifDrawerOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-secondary border-l border-border shadow-2xl z-50 flex flex-col p-6 animate-slide-in">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <span className="font-bold text-text-primary font-poppins flex items-center gap-2">
                <Bell className="w-5 h-5 text-accent" /> Alerts Notifications
              </span>
              <button onClick={() => setNotifDrawerOpen(false)} className="p-1 text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-3 pr-1">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-muted text-xs">No notifications yet.</div>
              ) : (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    onClick={() => markAsRead(n.id)}
                    className={`p-4 rounded-xl border border-border cursor-pointer transition relative ${n.read ? 'bg-card/30 opacity-70' : 'bg-card border-l-2 border-l-accent'}`}
                  >
                    <p className="text-xs text-text-primary font-bold mb-1">{n.title}</p>
                    <p className="text-[11px] text-text-secondary leading-relaxed">{n.description}</p>
                    <p className="text-[9px] text-muted mt-2 font-mono">{new Date(n.timestamp).toLocaleTimeString()}</p>
                    {!n.read && <span className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full animate-ping" />}
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <button 
                onClick={markAllAsRead}
                className="mt-4 w-full py-2.5 bg-card hover:bg-border text-text-primary text-xs font-semibold rounded-xl border border-border transition text-center"
              >
                Mark all as read
              </button>
            )}
          </div>
        </>
      )}

      {/* 4. Command Palette (Ctrl+K Modal) */}
      {cmdPaletteOpen && (
        <>
          <div className="fixed inset-0 bg-secondary/80 backdrop-blur-sm z-50" onClick={() => setCmdPaletteOpen(false)} />
          <div className="fixed inset-x-4 top-20 mx-auto max-w-lg bg-card border border-border shadow-2xl rounded-2xl z-50 overflow-hidden animate-fade-in flex flex-col">
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <Search className="w-5 h-5 text-muted" />
              <input 
                type="text" 
                placeholder="Search menus, features, or quick shortcuts..."
                value={cmdSearch}
                onChange={(e) => setCmdSearch(e.target.value)}
                className="flex-grow bg-transparent border-0 outline-none text-text-primary text-sm focus:ring-0 placeholder:text-muted"
                autoFocus
              />
              <button onClick={() => setCmdPaletteOpen(false)} className="p-1 text-muted hover:text-text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-60 overflow-y-auto p-2">
              <p className="text-[10px] font-bold text-muted uppercase tracking-wider px-3 py-2">Quick Navigation</p>
              {matchingLinks.length === 0 ? (
                <div className="text-center py-6 text-xs text-muted">No shortcuts match your search.</div>
              ) : (
                matchingLinks.map(link => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setCmdPaletteOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 hover:bg-primary rounded-xl text-xs text-text-secondary hover:text-text-primary transition"
                  >
                    <link.icon className="w-4 h-4 text-muted shrink-0" />
                    <span>{link.label}</span>
                  </Link>
                ))
              )}
            </div>
            
            <div className="bg-primary/50 px-4 py-2 border-t border-border text-[9px] text-muted flex justify-between items-center">
              <span>Use arrow keys to navigate shortcuts.</span>
              <span>ESC to close</span>
            </div>
          </div>
        </>
      )}

      {/* 5. Floating AI Assistant Chat Window */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        
        {/* Floating Bubble Icon */}
        <button 
          onClick={toggleAiOpen}
          className="w-14 h-14 bg-accent hover:bg-accent-hover text-primary shadow-2xl rounded-full flex items-center justify-center cursor-pointer transition hover:scale-105 active:scale-95"
        >
          {isAiOpen ? <X className="w-6 h-6 animate-fade-in" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
        </button>

        {/* AI Chat Window Panel */}
        {isAiOpen && (
          <div className="absolute bottom-16 right-0 w-80 max-w-[90vw] h-[400px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="bg-secondary px-4 py-3 flex items-center justify-between border-b border-border shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-accent/15 border border-accent/30 rounded-lg flex items-center justify-center text-accent">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold text-text-primary text-xs font-poppins">LivingHub AI Guide</span>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 bg-success/15 text-success rounded-md font-mono">ONLINE</span>
            </div>

            {/* Chat message logs area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`p-3 max-w-[85%] rounded-2xl text-[11px] leading-relaxed ${m.sender === 'user' ? 'bg-accent text-primary font-semibold rounded-tr-none' : 'bg-primary border border-border text-text-secondary rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              
              {isAiTyping && (
                <div className="flex justify-start">
                  <div className="p-3 bg-primary border border-border rounded-2xl rounded-tl-none flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={aiEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendAiMessage} className="p-3 border-t border-border flex gap-2 shrink-0">
              <input 
                type="text" 
                placeholder="Ask me a question..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-grow px-3 py-2 bg-primary border border-border focus:border-border rounded-xl text-xs outline-none text-text-primary placeholder:text-muted"
              />
              <button 
                type="submit" 
                className="p-2 bg-accent hover:bg-accent-hover text-primary rounded-xl transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};

export default AppShell;
