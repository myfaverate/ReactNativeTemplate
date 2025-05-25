@file:Suppress("UnstableApiUsage")

pluginManagement {
    includeBuild("../node_modules/@react-native/gradle-plugin")
    // ====== expo =============
    val expoPluginsPath = File(
        providers.exec {
            workingDir(rootDir)
            commandLine(
                "node",
                "--print",
                "require.resolve('expo-modules-autolinking/package.json', { paths: [require.resolve('expo/package.json')] })"
            )
        }.standardOutput.asText.get().trim(),
        "../android/expo-gradle-plugin"
    ).absolutePath
    includeBuild(expoPluginsPath)
    // ====== expo =============

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
        // Expo 官方 Maven 仓库地址
        // maven {
        //     url = uri(path = "https://www.jitpack.io")
        // }
    }
}

// react native
plugins {
    id("com.facebook.react.settings")
    id("expo-autolinking-settings")
}
extensions.configure<com.facebook.react.ReactSettingsExtension> {
    autolinkLibrariesFromCommand(
        expoAutolinking.rnConfigCommand
    )
}

rootProject.name = "template"
include(":app")
includeBuild("../node_modules/@react-native/gradle-plugin")


// ==== expo ====

expoAutolinking.useExpoModules()
expoAutolinking.useExpoVersionCatalog()
includeBuild(expoAutolinking.reactNativeGradlePlugin)


/*


 */
