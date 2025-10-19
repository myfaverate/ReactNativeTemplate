package com.helloandroid

import android.content.pm.PackageManager
import android.util.Log
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.CoroutineExceptionHandler
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Job
import kotlinx.coroutines.Runnable
import kotlinx.coroutines.async
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlin.coroutines.CoroutineContext

private const val TAG: String = "HelloModule"

internal class HelloModule internal constructor(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext) {

    private val rnDispatcher: CoroutineDispatcher = object : CoroutineDispatcher() {
        override fun dispatch(context: CoroutineContext, block: Runnable) {
            reactApplicationContext.runOnNativeModulesQueueThread(block)
        }
    }
    private val coroutineExceptionHandler: CoroutineExceptionHandler = CoroutineExceptionHandler { context: CoroutineContext, throwable: Throwable ->
        Log.e(TAG, "error: ", throwable)
    }
    private val scope: CoroutineScope = CoroutineScope(rnDispatcher + Job() + coroutineExceptionHandler)

    override fun getName(): String = "HelloModule"

    @ReactMethod(isBlockingSynchronousMethod = true)
    private fun blockingMethod(): Unit = runBlocking {

    }

    @ReactMethod
    private fun requestPermission(promise: Promise) {
        scope.launch {
            val mainActivity: MainActivity =
                (reactApplicationContext.currentActivity as? MainActivity) ?: run {
                    promise.reject(Exception("MainActivity 为 null"))
                    return@launch
                }
            if (ContextCompat.checkSelfPermission(
                    reactApplicationContext,
                    android.Manifest.permission.RECORD_AUDIO
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                mainActivity.permissionsLauncher.launch(arrayOf(android.Manifest.permission.RECORD_AUDIO))
                promise.reject(Exception("没有权限"))
                return@launch
            }
            promise.resolve("获得权限")
            Log.i(TAG, "requestPermission -> 获得权限...")
        }
    }

}