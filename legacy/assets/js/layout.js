/**
 * Royaltree Admin — Layout Renderer v2.0
 * Sidebar + Topbar responsive
 */
(function() {
    'use strict';

    const MENU = [
        {
            section: 'Main',
            items: [
                { href: 'index.html',       icon: 'speedometer2',      label: 'Dashboard' },
                { href: 'analytics.html',   icon: 'graph-up-arrow',    label: 'Analytics', badge: 'NEW' }
            ]
        },
        {
            section: 'Users & Finance',
            items: [
                { href: 'users.html',       icon: 'people',            label: 'Users' },
                { href: 'withdrawals.html', icon: 'cash-stack',        label: 'Withdrawals' }
            ]
        },
        {
            section: 'Games & Rewards',
            items: [
                { href: 'missions.html',    icon: 'flag',              label: 'Missions' },
                { href: 'campaigns.html',   icon: 'megaphone',         label: 'Campaigns' },
                { href: 'achievements.html',icon: 'trophy',            label: 'Achievements', badge: 'NEW' },
                { href: 'mining.html',      icon: 'pickaxe',           label: 'Mining' },
                { href: 'thermal.html',     icon: 'thermometer-half',  label: 'Thermal' },
                { href: 'miners.html',      icon: 'cpu',               label: 'Miners', badge: 'NEW' }
            ]
        },
        {
            section: 'Communication',
            items: [
                { href: 'chat.html',        icon: 'chat-dots',         label: 'Chat' },
                { href: 'broadcast.html',   icon: 'send',              label: 'Broadcast' },
                { href: 'schedule.html',    icon: 'clock-history',     label: 'Scheduled Notif' }
            ]
        },
        {
            section: 'System',
            items: [
                { href: 'anomalies.html',   icon: 'shield-exclamation',label: 'Anomalies' },
                { href: 'audit-logs.html',  icon: 'journal-text',      label: 'Audit Logs' },
                { href: 'config.html',      icon: 'gear',              label: 'Config' },
                { href: 'usage.html',       icon: 'database-check',    label: 'Firestore Usage', badge: 'NEW' }
            ]
        }
    ];

    function getCurrentPage() {
        return window.location.pathname.split('/').pop() || 'index.html';
    }

    function renderSidebar() {
        const el = document.getElementById('admin-sidebar');
        if (!el) return;

        const current = getCurrentPage();
        const adminName = (window.AdminAPI && AdminAPI.Auth && AdminAPI.Auth.getName()) || 'Admin';

        el.className = 'admin-sidebar';
        el.innerHTML = `
            <div class="sidebar-header">
                <span class="sidebar-logo">🌳</span>
                <div>
                    <div class="sidebar-brand">Royaltree</div>
                    <div class="sidebar-badge">Admin Panel</div>
                </div>
            </div>
            <nav class="sidebar-nav">
                ${MENU.map(section => `
                    <div class="sidebar-section">
                        <div class="sidebar-section-title">${section.section}</div>
                        ${section.items.map(item => `
                            <a href="${item.href}" class="sidebar-link ${item.href === current ? 'active' : ''}">
                                <i class="bi bi-${item.icon}"></i>
                                <span>${item.label}</span>
                                ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
                            </a>
                        `).join('')}
                    </div>
                `).join('')}
            </nav>
            <div class="sidebar-footer">
                <div class="sidebar-user" onclick="AdminAPI.Auth.clear(); location.href='login.html';">
                    <div class="sidebar-user-avatar">${adminName.charAt(0).toUpperCase()}</div>
                    <div class="sidebar-user-info">
                        <div class="sidebar-user-name">${escapeHtml(adminName)}</div>
                        <div class="sidebar-user-role">Administrator</div>
                    </div>
                    <i class="bi bi-box-arrow-right text-muted"></i>
                </div>
            </div>
        `;
    }

    function renderTopbar(pageTitle) {
        const el = document.getElementById('admin-topbar');
        if (!el) return;

        el.className = 'admin-topbar';
        el.innerHTML = `
            <button class="topbar-toggle" onclick="toggleSidebar()">
                <i class="bi bi-list"></i>
            </button>
            <div class="topbar-title">${escapeHtml(pageTitle || 'Dashboard')}</div>
            <div class="topbar-actions">
                <button class="topbar-btn" onclick="location.reload()" title="Refresh">
                    <i class="bi bi-arrow-clockwise"></i>
                </button>
                <button class="topbar-btn" title="Notifications">
                    <i class="bi bi-bell"></i>
                    <span class="dot"></span>
                </button>
            </div>
        `;
    }

    window.AdminLayout = {
        init(pageTitle) {
            renderSidebar();
            renderTopbar(pageTitle);
        }
    };

    console.log('✅ Layout v2.0 loaded');
})();
