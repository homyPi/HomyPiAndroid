package com.homypiandroid;

import android.util.Log;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.json.JSONObject;

public class HomyMqtt extends Mqtt{
	private static final String TAG = "HomyMqtt";
	private static final long RECONNECT_INTERVAL = 2000; // 2000ms

	private String raspberryName;

	private HomyMqtt(MqttAndroidClient client) {
		super(client);
	}
	private HomyMqtt() {
		super();
	}

	public static HomyMqtt getInstance() {
		if (Mqtt.instance == null)
			Mqtt.instance = new HomyMqtt();
		return (HomyMqtt)Mqtt.instance;
	}

	public void switchRaspberryTopic(String raspberryName) {
		if (this.raspberryName != null) {
			this.unsubscribe(getTopicToSubscribeTo(this.raspberryName));
		}
		this.raspberryName = raspberryName;
		this.subscribe(getTopicToSubscribeTo(this.raspberryName));
	}

	public void publishToPi(String event, JSONObject data) {
		if (this.raspberryName != null) {
			this.publish(getTopicToPublishTo(this.raspberryName), event, data);
		} else {
			Log.i(TAG,"No pi selected");
		}
	}
	public void publishToPi(String event) {
		if (this.raspberryName != null) {
			this.publish(getTopicToPublishTo(this.raspberryName), event);
		} else {
			Log.i(TAG,"No pi selected");
		}
	}

	public String getRaspberryName() {
		return this.raspberryName;
	}
	private String getTopicToSubscribeTo(String raspberryName) {
		return "client:" + raspberryName;
	}
	private String getTopicToPublishTo(String raspberryName) {
		return "raspberry:" + raspberryName;
	}


}
