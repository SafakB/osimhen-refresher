const { ipcRenderer } = require('electron');

// DOM elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const closeBrowserBtn = document.getElementById('closeBrowserBtn');
const intervalInput = document.getElementById('interval');
const statusElement = document.getElementById('status');
const browserStatusElement = document.getElementById('browserStatus');
const lastRefreshElement = document.getElementById('lastRefresh');
const logContainer = document.getElementById('logContainer');

// State
let isRefreshing = false;

// Initialize
updateStatus();
setInterval(updateStatus, 2000); // Update status every 2 seconds

// Event listeners
startBtn.addEventListener('click', async () => {
    const interval = parseInt(intervalInput.value);

    if (interval < 1 || interval > 3600) {
        addLog('Hata: Aralık 1-3600 saniye arasında olmalıdır', 'error');
        return;
    }

    try {
        startBtn.disabled = true;
        const result = await ipcRenderer.invoke('start-refresh', interval);

        if (result.success) {
            isRefreshing = true;
            updateButtonStates();
            addLog(result.message, 'success');
            addLog(`Yenileme başlatıldı - ${interval} saniye aralıkla`, 'info');
        } else {
            addLog(result.message, 'error');
        }
    } catch (error) {
        addLog(`Hata: ${error.message}`, 'error');
    } finally {
        startBtn.disabled = false;
    }
});

stopBtn.addEventListener('click', async () => {
    try {
        const result = await ipcRenderer.invoke('stop-refresh');

        if (result.success) {
            isRefreshing = false;
            updateButtonStates();
            addLog(result.message, 'success');
            addLog('Yenileme durduruldu', 'info');
        } else {
            addLog(result.message, 'error');
        }
    } catch (error) {
        addLog(`Hata: ${error.message}`, 'error');
    }
});

closeBrowserBtn.addEventListener('click', async () => {
    try {
        const result = await ipcRenderer.invoke('close-browser');

        if (result.success) {
            addLog(result.message, 'success');
            updateStatus();
        } else {
            addLog(result.message, 'error');
        }
    } catch (error) {
        addLog(`Hata: ${error.message}`, 'error');
    }
});

// Interval input validation
intervalInput.addEventListener('input', () => {
    const value = parseInt(intervalInput.value);
    if (value < 1) {
        intervalInput.value = 1;
    } else if (value > 3600) {
        intervalInput.value = 3600;
    }
});

// Functions
async function updateStatus() {
    try {
        const status = await ipcRenderer.invoke('get-status');

        // Update status display
        if (status.isRefreshing) {
            statusElement.textContent = 'Çalışıyor';
            statusElement.className = 'value running';
        } else {
            statusElement.textContent = 'Durdu';
            statusElement.className = 'value stopped';
        }

        // Update browser status
        if (status.hasBrowser) {
            browserStatusElement.textContent = 'Açık';
            browserStatusElement.className = 'value running';
        } else {
            browserStatusElement.textContent = 'Kapalı';
            browserStatusElement.className = 'value stopped';
        }

        // Update button states
        updateButtonStates();

    } catch (error) {
        console.error('Status update error:', error);
    }
}

function updateButtonStates() {
    if (isRefreshing) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
    } else {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

function addLog(message, type = 'info') {
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;

    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;

    // Keep only last 50 log entries
    while (logContainer.children.length > 50) {
        logContainer.removeChild(logContainer.firstChild);
    }
}

// Auto-update last refresh time when refresh happens
setInterval(() => {
    if (isRefreshing) {
        lastRefreshElement.textContent = new Date().toLocaleTimeString();
    }
}, 1000);

// Keyboard shortcuts
document.addEventListener('keydown', (event) => {
    // Ctrl/Cmd + Enter to start/stop
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        if (isRefreshing) {
            stopBtn.click();
        } else {
            startBtn.click();
        }
    }

    // Escape to stop
    if (event.key === 'Escape' && isRefreshing) {
        event.preventDefault();
        stopBtn.click();
    }
});

// Add initial log
addLog('💛❤️ Osimhen Refresher başlatıldı ve hazır 💛❤️', 'info'); 