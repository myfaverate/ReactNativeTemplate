package io.github.android

import android.app.Application
import android.os.StrictMode
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost

private const val TAG: String = "MainApplication"

internal class MainApplication internal constructor() : Application(), ReactApplication {

    override val reactHost: ReactHost by lazy {
        getDefaultReactHost(
            context = applicationContext,
            packageList =
                PackageList(this).packages.apply {
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // add(MyReactNativePackage())
                }
        )
    }

    override fun onCreate() {
        super.onCreate()
        loadReactNative(this)
        Log.i(TAG, "onCreate...")
    }
}