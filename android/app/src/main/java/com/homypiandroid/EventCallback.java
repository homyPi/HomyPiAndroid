package com.homypiandroid;

import org.json.JSONObject;

interface EventCallback {
	public void call(JSONObject data, String topic);
}