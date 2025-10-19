import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import java.io.FileInputStream
import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    // === react native before ===
    alias(libs.plugins.react.native)
    // === react native after ===
}

val keyStorePropertiesFile: File = rootProject.file("keystore.properties")
val keyStoreProperties = Properties().apply { FileInputStream(keyStorePropertiesFile).use { load(it) } }

// 强制设置 android 16
rootProject.extra["compileSdkVersion"] = 36
rootProject.extra["minSdkVersion"] = 24

android {
    namespace = "io.github.android"
    compileSdk = 36

    defaultConfig {
        applicationId = "io.github.android"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"

        ndk {
            abiFilters.addAll(arrayOf("arm64-v8a", "armeabi-v7a"))
        }
    }

    signingConfigs {
        create("release"){
            keyAlias = keyStoreProperties["keyAlias"] as String
            keyPassword = keyStoreProperties["keyPassword"] as String
            storeFile = file(keyStoreProperties["storeFile"] as String).apply { logger.lifecycle("storeFile: $this") }
            storePassword = keyStoreProperties["storePassword"] as String
            enableV4Signing = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            isShrinkResources = true
            isDebuggable = false
            signingConfig = signingConfigs.getByName("release")
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlin.compilerOptions {
        jvmTarget.set(JvmTarget.JVM_17)
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
}

dependencies {

    // === react native before ===
    implementation(libs.react.android)
    implementation(libs.hermes.android)
    // === react native after ===

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}

// 注意顺序，在依赖之下
react {
    autolinkLibrariesWithApp()
}