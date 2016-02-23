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


import com.homypiandroid.HomyMqtt;

import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;


import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttException;


public class SocketConnection extends ReactContextBaseJavaModule {
	private static final String TAG = "SocketConnection";

	private ReactApplicationContext context;
	public static Activity activity = null;


    private HomyMqtt mqtt;
    
	public SocketConnection(ReactApplicationContext reactContext, Activity activity) {
		super(reactContext);
		this.mqtt = HomyMqtt.getInstance();
		this.context = reactContext;
	}

	@ReactMethod
	public void createSocket(final String serverUrl, final String token) {
		Log.i(TAG, "Creating mqtt client: " + serverUrl);
		if (this.mqtt.isConnected()) {
			context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      				.emit("MQTT_STATUS", "CONNECTED");
			return;
		}
		mqtt.createClient(context, serverUrl, "foudefafa")
			.onConnected(new IMqttActionListener() {
				@Override
				public void onSuccess(IMqttToken mqttToken) {
					context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
	      				.emit("MQTT_STATUS", "CONNECTED");
				}

				@Override
				public void onFailure(IMqttToken arg0, Throwable arg1) {
					context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
	      				.emit("MQTT_STATUS", "DISCONNECTED");
				}
			})
			.connect();
	}
	@ReactMethod
	public void connect() {
	}

	@ReactMethod
	public void off(String id) {
		/*
		if (socketService == null) return;
		SocketListener listener = SocketListener.findInList(jsEvents, id);
		if (listener != null)
			listener.unlink(socketService);
			*/
	}

	public void off(String event, Emitter.Listener callback) {
		/*if (socketService == null) return;
		socketService.off(event, callback);*/
	}

	@ReactMethod
	public void clearEvents() {
		this.mqtt.clearEvents();
	}

	public void on(String event, EventCallback callback) {
		Log.i(TAG, "New event from java for event " + event);
		this.mqtt.on(event, callback);
	}

	@ReactMethod
	public void on(final String event, Callback callback) {
		Log.i(TAG, "New event from js for event " + event);
		this.mqtt.on(event, new EventCallback() {
			@Override
			public void call(JSONObject data, String topic) {
				Log.i(TAG,"Emitting " + event + " to js");
				context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      				.emit(event, data.toString());
			}
		});
		//SocketListener listener = new SocketListener(event, context);
		//jsEvents.add(listener);
		callback.invoke("null");
	}

	@ReactMethod
	public void publish(final String topic, final String event, final String data) {
		try {
			Log.i(TAG, "Publishing " +event + " to " + topic);
			if (data != null)
				this.mqtt.publish(topic, event, new JSONObject(data));
			else 
				this.mqtt.publish(topic, event);
		} catch(JSONException e) {
			Log.i(TAG, "Failed to publish " + event + ": " + e.getMessage());
		}
	}

	@ReactMethod
	public void publishToPi(final String event, final String data) {
		try {
			Log.i(TAG, "Publishing " +event + " to pi");
			if (data != null)
				this.mqtt.publishToPi(event, new JSONObject(data));
			else 
				this.mqtt.publishToPi(event);
		} catch(JSONException e) {
			Log.i(TAG, "Failed to publish " + event + ": " + e.getMessage());
		}
	}
	@ReactMethod
	public void switchRaspberryTopic(final String raspberryName) {
		this.mqtt.switchRaspberryTopic(raspberryName);
	}

	@ReactMethod
	public void subscribe(final String topic) {
		this.mqtt.subscribe(topic);
	}
	@ReactMethod
	public void unsubscribe(final String topic) {
		this.mqtt.unsubscribe(topic);
	}

	@Override
	public String getName() {
    	return "SocketConnection";
	}


}
/*
class Event {
	private static final String TAG = "SocketConnection";
	private String id;
	private String event;
	private Emitter.Listener callback;

	public SocketListener(String event, ReactApplicationContext context) {
		this.id = UUID.randomUUID().toString();
		this.event = event;
		this.callback = createCallback(event, context);
	}
	public String link() {
		Log.i(TAG, "Listening to event " + this.event);
		//socketService.on(this.event, this.callback);
		return this.id;
	}

	public String unlink(SocketService socketService) {
		Log.i(TAG, "Removing listener for event " + this.event);
		//socketService.off(this.event, this.callback);
		return this.id;
	}
	private Emitter.Listener createCallback(final String event, final ReactApplicationContext context) {
		return new Emitter.Listener() {
	        @Override
	        public void call(final Object... args) {
            Log.i(TAG, "got socket's event for JS: " + event);
	        	String data = null;
	        	if(args.length > 0 && ((JSONObject) args[0]) != null) {
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
*/