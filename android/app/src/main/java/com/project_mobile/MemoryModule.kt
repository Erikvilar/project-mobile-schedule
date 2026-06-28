package com.project_mobile

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MemoryModule(
    reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "MemoryModule"

    @ReactMethod
    fun releaseMemory() {
        try {
            Runtime.getRuntime().gc()
            Runtime.getRuntime().runFinalization()
            System.gc()
        } catch (_: Exception) {
            // ignora falhas de limpeza
        }
    }
}