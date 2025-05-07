/**
 * AmrSec JavaScript Analysis Lab
 * Core JavaScript Functionality
 * 
 * This is the main JS file that contains core functionality
 * and can be analyzed for various security vulnerabilities.
 */

// Configuration and global variables
const CONFIG = {
    version: "1.0",
    environment: "production",
    apiBase: "/api/v1",
    debug: false,
    userRole: "user",
};

// Hidden development mode flag
let _devMode = false;

// Hidden endpoints that will be revealed when in dev mode
const _hiddenEndpoints = [
    "/api/v1/admin/users/all",
    "/api/v1/system/logs",
    "/api/v1/internal/config",
    "/api/v1/debug/functions"
];

// Initialize the application
document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
    setupEventListeners();
    checkUserStatus();
    
    // Log a hidden message that can be found in browser console
    console.log("%cAmrSec Lab Initialized", "color: red; font-size: 16px; font-weight: bold;");
    console.log("%cTry using toggleDevMode() in the console", "color: #ff5757; font-size: 12px;");
});

/**
 * Initialize the application
 */
function initializeApp() {
    document.getElementById("version").innerHTML = `Version: <b>${CONFIG.version}</b>`;
    
    // This function contains development hooks that are not removed in production
    initializeDevHooks();
}

/**
 * Initialize development hooks
 * This function contains hidden functionality that should have been removed in production
 */
function initializeDevHooks() {
    // Development functions that were accidentally left in production
    window.toggleDevMode = function() {
        _devMode = !_devMode;
        
        if (_devMode) {
            showNotification("Developer Mode Activated", "success");
            document.body.classList.add("dev-mode");
            revealDevFeatures();
        } else {
            showNotification("Developer Mode Deactivated");
            document.body.classList.remove("dev-mode");
            hideDevFeatures();
        }
        
        return `Dev mode is now ${_devMode ? "ON" : "OFF"}`;
    };
    
    // Hidden function to get configuration
    window.showConfig = function() {
        return JSON.stringify(CONFIG, null, 2);
    };
    
    // Help function
    window.help = function() {
        return `
Available Commands:
- toggleDevMode() - Toggle developer mode
- showConfig() - Show current configuration
- setUserRole(roleName) - Set user role (admin/user)
- accessPremiumContent() - Force premium access
- getHiddenEndpoints() - Show hidden API endpoints
        `;
    };
    
    // Function to elevate privileges
    window.setUserRole = function(role) {
        if (role === "admin" || role === "user") {
            CONFIG.userRole = role;
            document.getElementById("user-status").innerHTML = `Current Role: <b>${role}</b>`;
            showNotification(`Role changed to ${role}`, "success");
            return `User role changed to ${role}`;
        }
        return "Invalid role. Use 'admin' or 'user'";
    };
    
    // Function to bypass premium check
    window.accessPremiumContent = function() {
        showPremiumContent();
        return "Premium content unlocked";
    };
    
    // Function to get hidden endpoints
    window.getHiddenEndpoints = function() {
        return _hiddenEndpoints.join("\n");
    };
}

/**
 * Set up event listeners for buttons and inputs
 */
function setupEventListeners() {
    // Admin login verification button
    document.getElementById("admin-login-btn").addEventListener("click", function() {
        const password = document.getElementById("admin-password").value;
        validateAdminPassword(password);
    });
    
    // Check premium access button
    document.getElementById("check-premium-btn").addEventListener("click", function() {
        checkPremiumAccess();
    });
    
    // Send message button
    document.getElementById("send-message-btn").addEventListener("click", function() {
        const message = document.getElementById("message-input").value;
        if (message.trim() !== "") {
            sendMessage("user", "general", message);
            document.getElementById("message-input").value = "";
        }
    });
    
    // Call endpoint button
    document.getElementById("call-endpoint-btn").addEventListener("click", function() {
        const endpoint = document.getElementById("endpoint-input").value;
        callEndpoint(endpoint);
    });
    
    // Verify token button
    document.getElementById("verify-token-btn").addEventListener("click", function() {
        const token = document.getElementById("token-input").value;
        verifyToken(token);
    });
    
    // Console input
    document.getElementById("console-input").addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            const command = this.value.trim();
            executeConsoleCommand(command);
            this.value = "";
        }
    });
}

/**
 * Check user status and update UI accordingly
 */
function checkUserStatus() {
    document.getElementById("user-status").innerHTML = `Current Role: <b>${CONFIG.userRole}</b>`;
}

/**
 * Show a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, warning)
 */
function showNotification(message, type = "") {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = "notification";
    if (type) {
        notification.classList.add(type);
    }
    notification.classList.add("show");
    
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

/**
 * Execute console commands
 * @param {string} command - The command to execute
 */
function executeConsoleCommand(command) {
    const output = document.getElementById("console-output");
    
    // Add command to output
    const cmdLine = document.createElement("div");
    cmdLine.className = "console-line";
    cmdLine.innerHTML = `<span class="prompt">></span> <span class="console-cmd">${command}</span>`;
    output.appendChild(cmdLine);
    
    // Process command
    let result;
    try {
        // This is intentionally vulnerable to allow function execution
        result = eval(command);
        
        // Add result to output
        if (result !== undefined) {
            const resultLine = document.createElement("div");
            resultLine.className = "console-line";
            resultLine.innerHTML = `<span class="console-result">${result}</span>`;
            output.appendChild(resultLine);
        }
    } catch (error) {
        // Add error to output
        const errorLine = document.createElement("div");
        errorLine.className = "console-line";
        errorLine.innerHTML = `<span class="console-error">${error}</span>`;
        output.appendChild(errorLine);
    }
    
    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
}

/**
 * Validate admin password - vulnerable to breakpoint manipulation
 * @param {string} password - The password to validate
 */
function validateAdminPassword(password) {
    const result = document.getElementById("admin-result");
    
    // This check can be bypassed with breakpoints in DevTools
    if (password === "SecureAdminPass123!") {
        CONFIG.userRole = "admin";
        checkUserStatus();
        result.innerHTML = "<span class='success'>✓ Admin access granted!</span>";
        showNotification("Admin access granted!", "success");
    } else {
        result.innerHTML = "<span class='error'>✗ Invalid admin password!</span>";
        showNotification("Invalid admin password!", "error");
    }
}

/**
 * Check if user has premium access - vulnerability for Local Overrides
 * This function can be modified using Chrome's Local Overrides
 */
function checkPremiumAccess() {
    if (isPremiumUser()) {
        showPremiumContent();
        showNotification("Premium access confirmed!", "success");
    } else {
        document.getElementById("premium-content").style.display = "none";
        document.getElementById("premium-placeholder").style.display = "block";
        showNotification("Premium access required!", "error");
    }
}

/**
 * Check if current user has premium access
 * Target for Local Overrides exploit
 * @returns {boolean} True if user has premium access
 */
function isPremiumUser() {
    // This always returns false, but can be modified with Local Overrides
    return false;
}

/**
 * Show premium content section
 */
function showPremiumContent() {
    document.getElementById("premium-content").style.display = "block";
    document.getElementById("premium-placeholder").style.display = "none";
}

/**
 * Call an API endpoint
 * @param {string} endpoint - The endpoint to call
 */
function callEndpoint(endpoint) {
    const result = document.getElementById("endpoint-result");
    
    // Check if endpoint exists in visible endpoints
    const validEndpoints = [
        "/api/v1/user/profile",
        "/api/v1/user/settings",
        "/api/v1/public/status"
    ];
    
    // If in dev mode, also check hidden endpoints
    const availableEndpoints = _devMode ? 
        [...validEndpoints, ..._hiddenEndpoints] : 
        validEndpoints;
    
    if (availableEndpoints.includes(endpoint)) {
        result.innerHTML = `<span class='success'>Endpoint responded: { "status": "success", "data": "Response from ${endpoint}" }</span>`;
    } else {
        result.innerHTML = `<span class='error'>Error: Endpoint not found or access denied</span>`;
    }
}

/**
 * Reveal developer features when dev mode is activated
 */
function revealDevFeatures() {
    // Add a console message about hidden endpoints
    const output = document.getElementById("console-output");
    const devLine = document.createElement("div");
    devLine.className = "console-line";
    devLine.innerHTML = `<span class="console-result">Developer mode activated. Hidden endpoints and functions are now available.</span>`;
    output.appendChild(devLine);
    
    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
    
    // Show a secret endpoint in the console
    console.log("%cSecret Endpoint Available: /api/v1/debug/auth/bypass", "color: #ff5757;");
}

/**
 * Hide developer features when dev mode is deactivated
 */
function hideDevFeatures() {
    // Add a console message
    const output = document.getElementById("console-output");
    const devLine = document.createElement("div");
    devLine.className = "console-line";
    devLine.innerHTML = `<span class="console-result">Developer mode deactivated. Hidden endpoints and functions are no longer available.</span>`;
    output.appendChild(devLine);
    
    // Scroll to bottom
    output.scrollTop = output.scrollHeight;
}

/**
 * Send a message - vulnerable to breakpoint manipulation
 * This function can be exploited by setting breakpoints and modifying parameters
 * @param {string} role - The role of the sender (user, admin, system)
 * @param {string} channel - The channel to send the message to
 * @param {string} content - The message content
 */
function sendMessage(role, channel, content) {
    // Sanitize input to prevent XSS - This can be bypassed with breakpoints
    const sanitizedContent = sanitizeMessage(content);
    
    // Create message object
    const message = {
        role: role,
        channel: channel,
        content: sanitizedContent,
        timestamp: new Date().toLocaleTimeString()
    };
    
    // Display the message
    displayMessage(message);
}

/**
 * Sanitize a message to prevent XSS - can be bypassed with breakpoints
 * @param {string} content - The message content to sanitize
 * @returns {string} The sanitized content
 */
function sanitizeMessage(content) {
    // This sanitization can be bypassed with breakpoints
    return content
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/script/gi, "***");
}

/**
 * Display a message in the UI
 * @param {object} message - The message object to display
 */
function displayMessage(message) {
    const messagesContainer = document.getElementById("messages-list");
    const messageEl = document.createElement("div");
    messageEl.className = "message";
    
    // Different styling based on role
    let rolePrefix = "";
    if (message.role === "admin") {
        rolePrefix = '<span style="color: #ff3e3e;">Admin: </span>';
    } else if (message.role === "system") {
        rolePrefix = '<span style="color: #00cc66;">System: </span>';
    } else {
        rolePrefix = '<span>User: </span>';
    }
    
    // Add the message - this will execute any script if XSS protection is bypassed
    messageEl.innerHTML = `${rolePrefix}${message.content} <small>(${message.timestamp})</small>`;
    messagesContainer.appendChild(messageEl);
    
    // Scroll to latest message
    const messageDisplay = document.querySelector(".message-display");
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
}