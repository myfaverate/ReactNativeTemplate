package com.helloandroid

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

private const val TAG: String = "HelloModule"

internal class HelloModule(reactApplicationContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactApplicationContext){
    override fun getName(): String {
        return "HelloModule"
    }

    @ReactMethod
    fun getName(name: String){
        Log.i(TAG, "getName -> name: $name -> thread: ${Thread.currentThread()}")
    }

    @ReactMethod
    fun getNameWithPromise(result: Boolean, promise: Promise){
        if (result){
            promise.resolve("success")
        }else{
            promise.reject("failure", Exception("Exit"))
        }
    }
}