/**
 * AmrSec JavaScript Analysis Lab
 * Features JavaScript
 * 
 * This file contains obfuscated code and other features
 * that can be analyzed for various vulnerabilities.
 */

// Obfuscated token verification function
// This is intentionally obfuscated to demonstrate analysis techniques
function verifyToken(input) {
    // Create obfuscated array of codes
    var _0xc4f8=["\x74\x6F\x6B\x65\x6E\x2D\x72\x65\x73\x75\x6C\x74","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x41\x6D\x72\x53\x65\x63\x5F\x53\x75\x70\x33\x72\x5F\x53\x33\x63\x72\x33\x74\x5F\x54\x30\x6B\x33\x6E","\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x27\x73\x75\x63\x63\x65\x73\x73\x27\x3E\xE2\x9C\x93\x20\x54\x6F\x6B\x65\x6E\x20\x76\x65\x72\x69\x66\x69\x65\x64\x20\x73\x75\x63\x63\x65\x73\x73\x66\x75\x6C\x6C\x79\x21\x3C\x2F\x73\x70\x61\x6E\x3E","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x3C\x73\x70\x61\x6E\x20\x63\x6C\x61\x73\x73\x3D\x27\x65\x72\x72\x6F\x72\x27\x3E\xE2\x9C\x97\x20\x49\x6E\x76\x61\x6C\x69\x64\x20\x74\x6F\x6B\x65\x6E\x21\x3C\x2F\x73\x70\x61\x6E\x3E","\x73\x75\x63\x63\x65\x73\x73","\x54\x6F\x6B\x65\x6E\x20\x76\x65\x72\x69\x66\x69\x65\x64\x20\x73\x75\x63\x63\x65\x73\x73\x66\x75\x6C\x6C\x79\x21","\x73\x68\x6F\x77\x4E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E","\x65\x72\x72\x6F\x72","\x49\x6E\x76\x61\x6C\x69\x64\x20\x74\x6F\x6B\x65\x6E\x21"];
    
    // Obfuscated verification logic
    var _0x49d0x2=document[_0xc4f8[1]](_0xc4f8[0]);
    var _0x49d0x3=_0xc4f8[2];
    
    // This is the actual check - can be discovered through debugging
    if(input=== _0x49d0x3){
        _0x49d0x2[_0xc4f8[4]]= _0xc4f8[3];
        window[_0xc4f8[8]](_0xc4f8[7],_0xc4f8[6])
        
        // Reveal a hidden function when token is correct
        revealSecretFeature();
    } else {
        _0x49d0x2[_0xc4f8[4]]= _0xc4f8[5];
        window[_0xc4f8[8]](_0xc4f8[10],_0xc4f8[9])
    }
}

/**
 * This function is revealed after correctly verifying the token
 * It shows a hidden feature in the developer console
 */
function revealSecretFeature() {
    console.log("%c🔑 Secret Feature Unlocked!", "color: #00cc66; font-size: 16px; font-weight: bold;");
    console.log("%cTry calling the secret function: accessAdminPanel()", "color: #ff5757; font-size: 12px;");
    
    // Add hidden admin panel access function
    window.accessAdminPanel = function() {
        return {
            message: "Admin panel access granted",
            endpoints: [
                "/api/v1/admin/users/delete",
                "/api/v1/admin/system/reset",
                "/api/v1/admin/logs/clear"
            ],
            secretKey: "c4a4f998-6b95-4173-bd51-27c32e5ee3b4"
        };
    };
}

/**
 * Obfuscated hidden feature - can be found through static code analysis
 * This is an intentionally vulnerable function that doesn't sanitize file paths
 */
function _readInternalFile(filePath) {
    // This is a simulated vulnerable function
    return `Reading file: ${filePath}`;
}

// Expose a vulnerable path traversal function
// This is intentionally left here as if by mistake
window._debug_readFile = function(path) {
    return _readInternalFile(path);
};

/**
 * Hidden endpoints discoverable through code analysis
 * These are additional to the ones in core.js
 */
const _secretEndpoints = {
    user_export: "/api/v1/users/export",
    system_config: "/api/v1/system/config.json",
    admin_backdoor: "/api/v1/admin/access?key=masterkey",
    debug_console: "/debug/console.php"
};

/**
 * This function can be called to trigger a DOM-based XSS if breakpoints are used
 * to modify the parameters in sendMessage()
 */
function displayRawMessage(content) {
    const container = document.createElement('div');
    // Intentionally vulnerable to XSS
    container.innerHTML = content;
    document.body.appendChild(container);
}

/**
 * This is a function that's meant to be overridden using Local Overrides
 * It's part of the premium content check but is in a separate file
 */
function validatePremiumSubscription() {
    // Always returns false by default - target for Local Overrides
    return false;
}