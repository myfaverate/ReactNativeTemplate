package com.helloandroid

import android.os.Looper
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import kotlinx.serialization.json.Json
import kotlinx.serialization.json.encodeToJsonElement

private const val TAG: String = "HelloModule"

internal class HelloModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext){
    override fun getName(): String {
        return "HelloModule"
    }

    @ReactMethod
    fun getName(name: String){
        Log.i(TAG, "getName -> name: $name -> thread: ${Thread.currentThread()} isMainThread: ${Looper.myLooper() == Looper.getMainLooper()}, freeMemory: ${Runtime.getRuntime().freeMemory() / 1024 / 1024}M")
    }

    @ReactMethod
    fun getNameWithPromise(result: Boolean, promise: Promise){
        if (result){
            promise.resolve("success")
        }else{
            promise.reject("failure", Exception("Exit"))
        }
    }

    /**
     * sendMap(data: Record<string, string>): Promise<boolean>
     */
    @ReactMethod
    fun sendMap(data: String, promise: Promise){
        runCatching {
            Log.i(TAG, "sendMap -> data: $data")
            // Json.encodeToJsonElement(data).apply {
            //     Log.i(TAG, "setMap -> json: $this")
            // }
            promise.resolve(true)
        }.onFailure {
            promise.reject(it)
        }
    }
    /**
     *  sendRealMap(data: Record<string, string>): Promise<boolean>
     */
    @ReactMethod
    private fun sendRealMap(data: ReadableMap, promise: Promise){
        runCatching {
            Log.i(TAG, "sendRealMap -> data: $data")
            promise.resolve(true)
        }.onFailure {
            promise.reject(it)
        }
    }
}