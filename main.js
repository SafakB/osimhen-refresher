const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const puppeteer = require('puppeteer');

let mainWindow;
let browser;
let refreshInterval;
let isRefreshing = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        icon: path.join(__dirname, 'icon.ico'),
        title: 'Osimhen Refresher'
    });

    mainWindow.loadFile('index.html');

    // Development mode
    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC handlers for communication with renderer process
ipcMain.handle('start-refresh', async (event, intervalSeconds) => {
    if (isRefreshing) {
        return { success: false, message: 'Refresh already running' };
    }

    try {
        // Launch browser if not already running
        if (!browser) {
            browser = await puppeteer.launch({
                headless: false,
                defaultViewport: null,
                args: ['--start-maximized']
            });
        }

        isRefreshing = true;

        // Get the first page or create new one
        const pages = await browser.pages();
        const page = pages.length > 0 ? pages[0] : await browser.newPage();

        // Navigate to a default page if none is open
        if (page.url() === 'about:blank') {
            await page.goto('https://www.google.com');
        }

        // Start refresh interval
        refreshInterval = setInterval(async () => {
            try {
                await page.reload({ waitUntil: 'networkidle0' });
                console.log(`Page refreshed at ${new Date().toLocaleTimeString()}`);
            } catch (error) {
                console.error('Refresh error:', error);
            }
        }, intervalSeconds * 1000);

        return { success: true, message: `Refresh started every ${intervalSeconds} seconds` };
    } catch (error) {
        isRefreshing = false;
        return { success: false, message: `Error: ${error.message}` };
    }
});

ipcMain.handle('stop-refresh', async () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }

    isRefreshing = false;
    return { success: true, message: 'Refresh stopped' };
});

ipcMain.handle('get-status', () => {
    return {
        isRefreshing,
        hasBrowser: !!browser
    };
});

ipcMain.handle('close-browser', async () => {
    if (browser) {
        await browser.close();
        browser = null;
    }
    return { success: true, message: 'Browser closed' };
}); 