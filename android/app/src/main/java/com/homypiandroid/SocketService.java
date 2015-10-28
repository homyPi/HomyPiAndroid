package com.homypiandroid;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.os.Binder;
import android.widget.Toast;
import android.util.Log;


import io.socket.emitter.Emitter;
import io.socket.client.IO;
import io.socket.client.Socket;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

public class SocketService extends Service {
    private Socket mSocket;
	private static final String TAG = "SocketService";

    IBinder mBinder = new LocalBinder();
   
	@Override
	public IBinder onBind(Intent intent) {
	    return mBinder;
	}
	public class LocalBinder extends Binder {
        public SocketService getServerInstance() {
            return SocketService.this;
        }
    }

	@Override
	public int onStartCommand(Intent intent, int flags, int startId) {
		// Let it continue running until it is stopped.
	    Toast.makeText(this, "Service Started", Toast.LENGTH_LONG).show();
	    return START_STICKY;
	}
   
   	@Override
   	public void onDestroy() {
      super.onDestroy();
      Toast.makeText(this, "Service Destroyed", Toast.LENGTH_LONG).show();
   	}



	public void createSocket(String serverUrl, String token) {
		Log.i(TAG, "CreateSocket");
		IO.Options opts = new IO.Options();
		opts.forceNew = true;
		opts.query = "token=" + token;
 		try {
			Log.i(TAG, "connecting to " + serverUrl);
            mSocket = IO.socket(serverUrl, opts);
		Log.i(TAG, "socket created");
        } catch (URISyntaxException e) {
            throw new RuntimeException(e);
        }
	}
	public void on(String event, Emitter.Listener callback) {
		Log.i(TAG, "new event listener from java for " + event);
		mSocket.on(event, callback);
	}

	
	public void connect() {
		Log.i(TAG, "connecting to socket");
		try {
			mSocket.connect();
		} catch(Exception e) {
    		Log.e(TAG, "Caught Exception: " + e.getMessage());

		}
	}

	/*
	public void on(final String event) {
		Log.i(TAG, "new event listener fo " + event);
		mSocket.on(event
	}
*/
	
	public void emit(final String event, final String data) {
		Log.i(TAG, "emit with string");
		Log.i(TAG, "emit " + event);
		if(data != null) {
			Log.i(TAG, "with data " + data);
			try {
				JSONObject obj = new JSONObject(data);
				emit(event, obj);
			} catch (JSONException e) {
				return;
			}
		} else {
			mSocket.emit(event);
		}
	}
	public void emit(final String event, JSONObject obj) {
		Log.i(TAG, "emit with JSONObject");
		mSocket.emit(event, obj);
	}
}