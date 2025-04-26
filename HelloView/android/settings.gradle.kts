pluginManagement {
    includeBuild("../node_modules/@react-native/gradle-plugin")
}

plugins {
    id("com.facebook.react.settings")
}

extensions.configure<com.facebook.react.ReactSettingsExtension> {
    autolinkLibrariesFromCommand()
}

rootProject.name = "HelloAndroid"

include(":app")

includeBuild("../node_modules/@react-native/gradle-plugin")