package com.homypiandroid;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.InterruptedException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttToken;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;

import android.util.Log;
import android.content.Context;
import android.os.Handler;

public class Mqtt {
	private static final String TAG = "Mqtt";
	private static final long RECONNECT_INTERVAL = 2000; // 2000ms
	protected static Mqtt instance;

	private boolean reconnectionPlanned = false;

	private MqttAndroidClient client;

	
	private HashMap<String, ArrayList<EventCallback>> events = new HashMap<>();
	private ArrayList<IMqttActionListener> onConnectedCallbacks = new ArrayList<IMqttActionListener>();

	private Context context;
	private String url;
	private String userId;

	private Thread mReconnectThread;

	private ArrayList<String> topics = new ArrayList<String>();


	protected Mqtt(MqttAndroidClient client) {
		this.client = client;
	}
	protected Mqtt() {}

	public static Mqtt getInstance() {
		if (Mqtt.instance == null)
			Mqtt.instance = new Mqtt();
		return Mqtt.instance;
	}
	public Mqtt createClient(Context context, final String url, final String userId) {
		if (this.client != null) return this;
		this.context = context;
		this.url = url;
		this.userId = userId;
		try {
			Log.i(TAG, "Creating mqtt client: " + url);
			this.setClient(new MqttAndroidClient(context, url, userId));
		} catch(MqttException e) {

		}
		return this;
	}
	public Mqtt setClient(MqttAndroidClient client) throws MqttException{
		this.client = client;
		client.setCallback(new MqttCallback(){
			@Override
			public void connectionLost(Throwable cause)  {
				if (cause != null) {
					Log.i(TAG, "Connection lost " + cause.getMessage());
				} else {
					Log.i(TAG, "Connection lost for unknown reasons");
				}
				if (mReconnectThread == null) {
					mReconnectThread = new Thread(new ReconnectRunnable());
					mReconnectThread.start();
				}
			}
			@Override
			public void messageArrived(String topic, MqttMessage message) throws Exception {
				try {
					Log.i(TAG, "Got message on topic " + topic + ": " + message);
					JSONObject data = new JSONObject(message.toString());
					if (data.has("event")) {
						if (data.has("data"))
							handleEvent((String)data.get("event"), (JSONObject)data.get("data"), topic);
						else
							handleEvent((String)data.get("event"), null, topic);

					}
				} catch (JSONException e) {
					return;
				}
			}
			@Override
			public void deliveryComplete(IMqttDeliveryToken token) {

			}
		});
		return this;
	}
	public Mqtt connect() {
		if (this.client.isConnected()) return this;
		MqttConnectOptions options = new MqttConnectOptions();
		//options.setCleanSession(false);
		Log.i(TAG, "Connecting...");
		try {
			
			client.connect(options, null, new IMqttActionListener() {
		        @Override
		        public void onSuccess(IMqttToken mqttToken) {
		            Log.i(TAG, "Client connected");
		            Log.i(TAG, "Topics="+mqttToken.getTopics());
		            for (String topic : topics) {
		            	try {
		           			Log.i(TAG, "subscribe " + topic);
		            		client.subscribe(topic, 0);
		            	} catch (MqttException e) {}
		            }
		            mqttToken.setActionCallback(null);	//Avoid this callback to be called again
					if (mReconnectThread != null) {
						mReconnectThread.interrupt();
						mReconnectThread = null;
					}
		            for(IMqttActionListener callback: onConnectedCallbacks)
		            	callback.onSuccess(mqttToken);
		        }

		        @Override
		        public void onFailure(IMqttToken mqttToken, Throwable arg1) {
		            // TODO Auto-generated method stub
		            if (arg1 != null)
		            	Log.i(TAG, "Client connection failed: "+arg1.getMessage() + " ==> (" + this + ")");
		            mqttToken.setActionCallback(null);	//Avoid this callback to be called again
		            if (!(arg1 instanceof MqttException)) {
		            	Log.i(TAG, "exception", arg1);
		            } else if (((MqttException)arg1).getReasonCode() != MqttException.REASON_CODE_CLIENT_CLOSED) {
						if (mReconnectThread == null) {
							mReconnectThread = new Thread(new ReconnectRunnable());
							mReconnectThread.start();
						}
		            }
		            for(IMqttActionListener callback: onConnectedCallbacks)
		            	callback.onFailure(mqttToken ,arg1);
		        }
		    });
		} catch (MqttException e) {
            Log.i(TAG, "Client connection failed: "+e.getMessage());
        }
        return this;
	}

	public boolean isConnected() {
		return (this.client != null && this.client.isConnected());
	}

	public Mqtt subscribe(String topic) {
		int i = existInTopics(topic);
		if (i != -1) return this;
		topics.add(topic);
		if(this.client == null || !this.client.isConnected()) return this;
		try {
			Log.i(TAG, "Subscribing to " + topic + "");
			this.client.subscribe(topic, 0);
		} catch (MqttException e) {
			Log.i(TAG, "Unable to subscribe to " + topic + ": "+e.getMessage());
		}
		return this;
	}

	public Mqtt unsubscribe(String topic) {
		int i = existInTopics(topic);
		if (i != -1) topics.remove(i);
		if(this.client == null || !this.client.isConnected()) return this;
		try {
			Log.i(TAG, "Subscribing to " + topic + "");
			this.client.unsubscribe(topic);
		} catch (MqttException e) {
			Log.i(TAG, "Unable to unsubscribe from " + topic + ": "+e.getMessage());
		}
		return this;
	}

	public int existInTopics(String topic) {
		for (int i = 0; i < topics.size(); i++) {
			if (topics.get(i).equals(topic))
				return i;
		}
		return -1;
	}

	public Mqtt on(String event, EventCallback callback) {
		Log.i(TAG, "Registering new event: " + event);
		if (!events.containsKey(event)) {
			events.put(event, new ArrayList<EventCallback>());
		}
		this.events.get(event).add(callback);
		return this;
	}

	public Mqtt off(String event, EventCallback callback) {
		if (events.containsKey(event)) {
			this.events.get(event).remove(callback);
		}
		return this;
	}

	public Mqtt onConnected(IMqttActionListener callback) {
		this.onConnectedCallbacks.add(callback);
		if (this.isConnected()) {
			callback.onSuccess(null);
		}
		return this;
	}
	public Mqtt clearEvents() {
		this.events.clear();
		return this;
	}

	public Mqtt publish(String topic, String event, JSONObject data) {
		JSONObject messageJson  = new JSONObject();
		Log.i(TAG, "Sending event " + event + " to " + topic);
		try{
			messageJson.put("event", event);
			if (data != null)
				messageJson.put("data", data);
		} catch(JSONException e) {return this;}
		MqttMessage message = new MqttMessage(messageJson.toString().getBytes());
		message.setQos(0);
        message.setRetained(false);
        try {
			client.publish(topic, message, null, new IMqttActionListener() {
                @Override
                public void onSuccess(IMqttToken mqttToken) {
                    Log.i(TAG, "Message sended");
                    mqttToken.setActionCallback(null);
                }

                @Override
                public void onFailure(IMqttToken mqttToken, Throwable arg1) {
                	mqttToken.setActionCallback(null);
                    if(arg1 == null) return;
                    Log.i(TAG, "Publish failed: "+arg1.getMessage());

                }
            });
		} catch (MqttException e) {
			Log.i(TAG, "Unable to publish " + message.toString() + ": "+e.getMessage());
		}
		return this;
	}
	public Mqtt publish(String topic, String event) {
		return this.publish(topic, event, null);
	}

	public void handleEvent(String event, JSONObject data, String topic) {
		if (events.containsKey(event)) {
			Log.i(TAG, events.get(event).size() + " callback registered for " + event);
			for(EventCallback callback: events.get(event)) {
				Log.i(TAG, "Calling callback");
				callback.call(data, topic);
			}
		} else {
			Log.i(TAG, "No callback registered for " + event);
		}
	}

	private class ReconnectRunnable implements Runnable {
        @Override
        public void run() {
            while(client !=null && !client.isConnected()) {
                try {
                    Thread.sleep(RECONNECT_INTERVAL);
                } catch (InterruptedException e) {
                    return;
                }
                Log.i(TAG, "Reconnecting...");
                connect();
            }
        }
    }
}

