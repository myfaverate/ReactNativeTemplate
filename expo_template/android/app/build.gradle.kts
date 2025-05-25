import java.io.FileInputStream
import java.util.Properties

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.react.native)
    alias(libs.plugins.expo.root.project)
}

val kotlinVersion: String = libs.versions.kotlin.get()
val kspVersion: String = libs.versions.kspVersion.get()
val compileSdkVersion35: Int = 35
val targetSdkVersion: Int = 35
val minSdkVersion: Int = 24

rootProject.ext["kotlinVersion"] = kotlinVersion
rootProject.ext["kspVersion"] = kspVersion
rootProject.ext["compileSdkVersion"] = compileSdkVersion35
rootProject.ext["targetSdkVersion"] = targetSdkVersion
rootProject.ext["minSdkVersion"] = minSdkVersion

val keyStorePropertiesFile: File = rootProject.file("keystore.properties")
val keyStoreProperties = Properties().apply { FileInputStream(keyStorePropertiesFile).use { load(it) } }

android {
    namespace = "edu.tyut.template"
    compileSdk = compileSdkVersion35

    defaultConfig {
        applicationId = "edu.tyut.template"
        minSdk = minSdkVersion
        targetSdk = targetSdkVersion
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
            storeFile = file(keyStoreProperties["storeFile"] as String).apply { logger.warn("storeFile: $this") }
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
    kotlinOptions {
        jvmTarget = JavaVersion.VERSION_17.toString()
    }
    buildFeatures {
        compose = true
        buildConfig = true
    }
}
fun List<String>.runCommand(workingDir: File? = null): String {
    val process = ProcessBuilder(this)
        .directory(workingDir)
        .redirectErrorStream(true)
        .start()
    return process.inputStream.bufferedReader().use { it.readText() }
}
react {
    entryFile = project.file(
        listOf("node", "-e", "require('expo/scripts/resolveAppEntry')", rootDir.absoluteFile.parentFile.absolutePath, "android", "absolute")
            .runCommand(rootDir)
            .trim().apply {
                println("entryFile: $this")
            }
    )

    cliFile = File(
        listOf("node", "--print", "require.resolve('@expo/cli')")
            .runCommand(rootDir)
            .trim().apply {
                println("cliFile: $this")
            }
    )
    bundleCommand = "export:embed"



    autolinkLibrariesWithApp()
}

dependencies {
    // react native
    implementation(libs.react.android)
    implementation(libs.hermes.android)

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.ui)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.ui.tooling.preview)
    implementation(libs.androidx.material3)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.ui.test.junit4)
    debugImplementation(libs.androidx.ui.tooling)
    debugImplementation(libs.androidx.ui.test.manifest)
}