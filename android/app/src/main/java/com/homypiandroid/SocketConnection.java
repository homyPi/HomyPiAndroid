package com.homypiandroid;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Callback;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.app.Activity;
import android.util.Log;
import android.os.Binder;
import android.os.IBinder;
import android.content.ServiceConnection;
import android.widget.Toast;
import android.content.ComponentName;
import android.content.Intent;

import io.socket.emitter.Emitter;

import org.json.JSONException;
import org.json.JSONObject;

import com.homypiandroid.MainActivity;
import com.homypiandroid.SocketService;
import com.homypiandroid.SocketService.LocalBinder;


import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;

public class SocketConnection extends ReactContextBaseJavaModule {
	private static final String TAG = "SocketConnection";

 	boolean mBounded;
	private ReactApplicationContext context;
	public static Activity activity = null;
    private SocketService socketService;

    private static ArrayList<SocketListener> jsEvents = new ArrayList<SocketListener>();

	ServiceConnection mConnection = new ServiceConnection() {
	    public void onServiceDisconnected(ComponentName name) {
	        Toast.makeText(SocketConnection.activity, "Service is disconnected", 1000).show();
	        mBounded = false;
	        socketService = null;
	    }

	    public void onServiceConnected(ComponentName name, IBinder service) {
	        Toast.makeText(SocketConnection.activity, "Service is connected", 1000).show();
	        mBounded = true;
	        LocalBinder mLocalBinder = (LocalBinder)service;
	        socketService = mLocalBinder.getServerInstance();
	    }
	};
	public SocketConnection(ReactApplicationContext reactContext, Activity activity) {
		super(reactContext);
		this.context = reactContext;
		Intent mIntent = new Intent(activity, SocketService.class);
		activity.bindService(mIntent, mConnection, MainActivity.BIND_AUTO_CREATE);
		
	}

	@ReactMethod
	public void createSocket(String serverUrl, String token) {
		socketService.createSocket(serverUrl, token);
	}
	@ReactMethod
	public void connect() {
		socketService.connect();
	}

	@ReactMethod
	public void off(String id) {
		SocketListener listener = SocketListener.findInList(jsEvents, id);
		if (listener != null)
			listener.unlink(socketService);
	}

	@ReactMethod
	public void clearEvents() {
		for ( SocketListener listener : jsEvents) {
			listener.unlink(socketService);
		}
	}

	public void on(String event, Emitter.Listener callback) {
		socketService.on(event, callback);
	}

	@ReactMethod
	public void on(final String event, Callback callback) {
		SocketListener listener = new SocketListener(event, context);
		jsEvents.add(listener);
		callback.invoke(listener.link(socketService));
	}

	@ReactMethod
	public void emit(final String event, final String data) {
		socketService.emit(event, data);
	}
	public void emit(final String event, JSONObject obj) {
		socketService.emit(event, obj);
	}
	public void emit(final String event) {
		socketService.emit(event, new JSONObject());
	}



	@Override
	public String getName() {
    	return "SocketConnection";
	}


}

class SocketListener {
	private static final String TAG = "SocketConnection";
	private String id;
	private String event;
	private Emitter.Listener callback;

	public SocketListener(String event, ReactApplicationContext context) {
		this.id = UUID.randomUUID().toString();
		this.event = event;
		this.callback = createCallback(event, context);
	}
	public String link(SocketService socketService) {
		Log.i(TAG, "Listening to event " + this.event);
		socketService.on(this.event, this.callback);
		return this.id;
	}

	public String unlink(SocketService socketService) {
		Log.i(TAG, "Removing listener for event " + this.event);
		socketService.off(this.event, this.callback);
		return this.id;
	}

	private Emitter.Listener createCallback(final String event, final ReactApplicationContext context) {
		return new Emitter.Listener() {
	        @Override
	        public void call(final Object... args) {
            Log.i(TAG, "got socket's event for JS");
	        	String data = null;
	        	if(args.length > 0) {
		            data = ((JSONObject) args[0]).toString();
		        }
	            context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      				.emit(event, data);
	        }
	    };
	}

	public String getId() {
		return this.id;
	}

	public static SocketListener findInList(ArrayList<SocketListener> list, String id) {
		for(SocketListener inList: list) {
			if (inList.getId().equals(id))
				return inList;
		}
		return null;
	}


}