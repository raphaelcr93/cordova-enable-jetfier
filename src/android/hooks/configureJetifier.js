const FS = require('fs');
const Path = require('path');

module.exports = function(context) {
    const propertiesPath = Path.resolve(process.cwd(), 'platforms/android/gradle.properties');
    
    let properties = FS.readFileSync(propertiesPath, {
        encoding: 'utf-8'
    });

    // Replace any lines that begin with android.enableJetifier
    properties = properties.replace(/^android\.enableJetifier.+/m, '');

    // Append a new enableJetifier directive on a new line:
    properties += '\r\nandroid.enableJetifier = true';

    // Replace any lines that begin with android.useAndroidX
    properties = properties.replace(/^android\.useAndroidX.+/m, '');

    // Append a new useAndroidX directive on a new line:
    properties += '\r\nandroid.useAndroidX = true';

    // Finally write the file back out
    FS.writeFileSync(propertiesPath, properties);
};