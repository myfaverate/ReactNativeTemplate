@file:Suppress("UnstableApiUsage")

pluginManagement {
    // === react native before ===
    includeBuild("../node_modules/@react-native/gradle-plugin")
    // === react native after ===
    repositories {
        google {
            content {
                includeGroupByRegex("com\\.android.*")
                includeGroupByRegex("com\\.google.*")
                includeGroupByRegex("androidx.*")
            }
        }
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.PREFER_SETTINGS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "android"
include(":app")

// === react native before ===
plugins{
    id("com.facebook.react.settings")
}
extensions.configure<com.facebook.react.ReactSettingsExtension> { autolinkLibrariesFromCommand() }
includeBuild("../node_modules/@react-native/gradle-plugin")
// === react native after ===