package edu.tyut.template.ui.activity

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import expo.modules.ReactActivityDelegateWrapper

internal class MainActivity : ReactActivity() {
    override fun getMainComponentName(): String = "App"
    override fun createReactActivityDelegate(): ReactActivityDelegate =
        ReactActivityDelegateWrapper(this, /* BuildConfig.IS_NEW_ARCHITECTURE_ENABLED */true, DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)).apply {
            // BuildConfig
        }
}