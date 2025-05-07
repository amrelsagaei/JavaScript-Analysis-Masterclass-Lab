/**
 * AmrSec JavaScript Analysis Lab
 * Security JavaScript
 * 
 * This file contains authentication, permissions, and other security features
 * that can be analyzed for vulnerabilities.
 */

// Security configuration
const securityConfig = {
    // CSRF token - this would normally be dynamically generated on the server
    csrfToken: "8fe04c91-52e7-4eaa-92fe-9b13d40f3185",
    
    // Authentication settings
    auth: {
        sessionTimeout: 30, // minutes
        maxFailedAttempts: 5,
        requiredPasswordStrength: "high"
    },
    
    // Permission levels
    permissions: {
        user: ["read", "comment", "profile"],
        premium: ["read", "comment", "profile", "download", "share"],
        admin: ["read", "comment", "profile", "download", "share", "manage", "delete"]
    }
};

/**
 * Check if current user has permission for an action
 * This function can be analyzed and bypassed using breakpoints
 * @param {string} action - The action to check permission for
 * @returns {boolean} True if user has permission
 */
function hasPermission(action) {
    const userRole = CONFIG.userRole;
    const userPermissions = securityConfig.permissions[userRole] || [];
    
    return userPermissions.includes(action);
}

/**
 * Generate a security token for API requests
 * This function is vulnerable to parameter manipulation via breakpoints
 * @param {string} userId - The user ID
 * @param {string} action - The action being performed
 * @returns {string} The generated token
 */
function generateSecurityToken(userId, action) {
    // In a real app, this would use secure cryptographic methods
    // This is intentionally simple for demonstration
    const timestamp = Date.now();
    const token = btoa(`${userId}:${action}:${timestamp}:${securityConfig.csrfToken}`);
    return token;
}

/**
 * Verify a security token
 * @param {string} token - The token to verify
 * @param {string} userId - The user ID
 * @param {string} action - The action being performed
 * @returns {boolean} True if token is valid
 */
function verifySecurityToken(token, userId, action) {
    try {
        // Decode the token
        const decoded = atob(token);
        const parts = decoded.split(':');
        
        // Check parts
        if (parts.length !== 4) return false;
        
        const [tokenUserId, tokenAction, timestamp, csrfToken] = parts;
        
        // Verify components
        if (
            tokenUserId !== userId ||
            tokenAction !== action ||
            csrfToken !== securityConfig.csrfToken
        ) {
            return false;
        }
        
        // Check if token has expired (30 minutes)
        const tokenTime = parseInt(timestamp);
        const currentTime = Date.now();
        const timeDiff = (currentTime - tokenTime) / (1000 * 60); // convert to minutes
        
        if (timeDiff > securityConfig.auth.sessionTimeout) {
            return false;
        }
        
        return true;
    } catch (e) {
        console.error("Token verification error:", e);
        return false;
    }
}

/**
 * Local storage utility with "secure" flag - vulnerable to analysis
 * The secure flag doesn't actually provide real security
 */
const secureStorage = {
    // Store data with "secure" flag
    setItem: function(key, value, secure = false) {
        const data = {
            value: value,
            secure: secure
        };
        localStorage.setItem(key, JSON.stringify(data));
    },
    
    // Get data and check "secure" flag
    getItem: function(key) {
        const data = JSON.parse(localStorage.getItem(key) || '{"value":null}');
        
        // This secure check can be bypassed with breakpoints
        if (data.secure && CONFIG.userRole !== "admin") {
            console.warn("Attempted to access secure storage item without admin privileges");
            return null;
        }
        
        return data.value;
    },
    
    // Remove an item
    removeItem: function(key) {
        localStorage.removeItem(key);
    }
};

/**
 * Initialize security features 
 */
function initializeSecurity() {
    // Store some "secure" data in local storage for discovery
    secureStorage.setItem("api_key", "ab12-cd34-ef56-gh78", true);
    secureStorage.setItem("user_data", { id: 123, username: "testuser" }, false);
    
    // Add admin password hash for demonstration - this would never be in client JS in a real app
    // This is intentionally placed here for discovery
    const _adminPasswordHash = "5f4dcc3b5aa765d61d8327deb882cf99"; // "password" in MD5
}

// Call security initialization
initializeSecurity();

/**
 * Example of insecure data validation that can be bypassed
 * @param {object} inputData - Data to validate
 * @returns {boolean} True if data is valid
 */
function validateUserInput(inputData) {
    // This validation can be bypassed with breakpoints
    if (inputData.role && inputData.role === "admin") {
        // Check if user is authenticated as admin
        if (CONFIG.userRole !== "admin") {
            console.warn("Attempted to submit admin data without privileges");
            return false;
        }
    }
    
    return true;
}

/**
 * Function to check premium status - can be modified with local overrides
 * This is separate from isPremiumUser() in core.js
 */
function checkPremiumStatus() {
    // This combines multiple checks that can be bypassed
    return validatePremiumSubscription() || CONFIG.userRole === "admin";
}

// Expose a global object with security utilities
// This is another attack surface
window.secUtils = {
    checkPermission: function(perm) {
        return hasPermission(perm);
    },
    
    createToken: function(action) {
        return generateSecurityToken("user-123", action);
    }
};

// Hidden backdoor function - intentionally placed for discovery
// This would never be in a real application
function _adminBackdoor(password) {
    if (password === "AmrSec2023!") {
        CONFIG.userRole = "admin";
        checkUserStatus();
        return true;
    }
    return false;
}