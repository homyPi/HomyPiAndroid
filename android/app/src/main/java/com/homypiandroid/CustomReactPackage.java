package com.homypiandroid;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.uimanager.ViewManager;

import com.homypiandroid.PlayerNotification;
import com.homypiandroid.SocketConnection;

import android.app.Activity;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

public class CustomReactPackage implements ReactPackage {
    
    private Activity mActivity = null;

    public CustomReactPackage(Activity activity) {
        mActivity = activity;
        SocketConnection.activity = activity;
    }


    @Override
    public List<NativeModule> createNativeModules(
                              ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new SocketConnection(reactContext, mActivity));
        modules.add(new PlayerNotification(reactContext, mActivity));
        return modules;
    }


    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.asList();
    }
}